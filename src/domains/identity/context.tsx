import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_EMPLOYEE_ID, MOCK_EMPLOYEES } from "./mock/employees";
import type { Employee } from "./types";

const STORAGE_KEY = "aurumi.dev.currentEmployeeId";

interface CurrentEmployeeContextValue {
  currentEmployee: Employee;
  /** Available personas exposed for the dev-only role switcher. */
  availableEmployees: readonly Employee[];
  setCurrentEmployeeId: (id: string) => void;
}

const CurrentEmployeeContext = createContext<CurrentEmployeeContextValue | null>(
  null,
);

function resolveEmployee(id: string | null | undefined): Employee {
  return (
    MOCK_EMPLOYEES.find((e) => e.id === id) ??
    MOCK_EMPLOYEES.find((e) => e.id === DEFAULT_EMPLOYEE_ID) ??
    MOCK_EMPLOYEES[0]
  );
}

export interface CurrentEmployeeProviderProps {
  children: ReactNode;
  /** Override the initial employee — used by tests. */
  initialEmployeeId?: string;
}

/**
 * Provides the simulated current employee. In production this will be
 * replaced by the authenticated employee from the platform without
 * changes to consumers.
 */
export function CurrentEmployeeProvider({
  children,
  initialEmployeeId,
}: CurrentEmployeeProviderProps) {
  const [employeeId, setEmployeeId] = useState<string>(
    initialEmployeeId ?? DEFAULT_EMPLOYEE_ID,
  );

  // Hydrate from localStorage after mount to avoid SSR/hydration mismatch.
  useEffect(() => {
    if (initialEmployeeId) return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setEmployeeId(stored);
    } catch {
      /* ignore */
    }
  }, [initialEmployeeId]);

  const setCurrentEmployeeId = useCallback((id: string) => {
    setEmployeeId(id);
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<CurrentEmployeeContextValue>(
    () => ({
      currentEmployee: resolveEmployee(employeeId),
      availableEmployees: MOCK_EMPLOYEES,
      setCurrentEmployeeId,
    }),
    [employeeId, setCurrentEmployeeId],
  );

  return (
    <CurrentEmployeeContext.Provider value={value}>
      {children}
    </CurrentEmployeeContext.Provider>
  );
}

export function useCurrentEmployee(): CurrentEmployeeContextValue {
  const ctx = useContext(CurrentEmployeeContext);
  if (!ctx) {
    throw new Error(
      "useCurrentEmployee must be used inside <CurrentEmployeeProvider>.",
    );
  }
  return ctx;
}
