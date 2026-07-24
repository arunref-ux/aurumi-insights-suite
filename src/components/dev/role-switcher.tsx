import { useEffect, useState } from "react";
import { ChevronDown, UserCog } from "lucide-react";
import { useCurrentEmployee } from "@/domains/identity";

const STATICALLY_ENABLED =
  import.meta.env.DEV || import.meta.env.VITE_ENABLE_ROLE_SWITCHER === "true";

function isPreviewHost(): boolean {
  if (typeof window === "undefined") return false;

  const { hostname } = window.location;
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.startsWith("id-preview--") ||
    hostname.endsWith("-dev.lovable.app")
  );
}

/**
 * Development-only role switcher.
 *
 * Renders nothing outside development/demo builds. Toggle visibility with
 * `import.meta.env.DEV` or the `VITE_ENABLE_ROLE_SWITCHER` flag so it can
 * be removed cleanly in production.
 */
export function RoleSwitcher() {
  const { currentEmployee, availableEmployees, setCurrentEmployeeId } =
    useCurrentEmployee();
  const [enabled, setEnabled] = useState(STATICALLY_ENABLED);

  useEffect(() => {
    if (STATICALLY_ENABLED || isPreviewHost()) {
      setEnabled(true);
    }
  }, []);

  if (!enabled) return null;

  return (
    <div className="flex min-w-0 items-center gap-2">
      <label
        htmlFor="dev-role-switcher"
        className="hidden items-center gap-1.5 text-xs font-medium text-muted-foreground lg:flex"
      >
        <UserCog className="h-3.5 w-3.5" />
        Viewing as
      </label>
      <div className="relative min-w-0">
        <select
          id="dev-role-switcher"
          aria-label="Preview as employee role"
          className="h-8 w-[190px] max-w-[42vw] cursor-pointer appearance-none rounded-md border border-input bg-background px-3 pr-8 text-xs font-medium text-foreground shadow-sm outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring sm:w-[240px]"
          value={currentEmployee.id}
          onChange={(event) => setCurrentEmployeeId(event.currentTarget.value)}
        >
          {availableEmployees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.designation} · {emp.name}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
