import { UserCog } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrentEmployee } from "@/domains/identity";

/**
 * Development-only role switcher.
 *
 * Renders nothing outside development/demo builds. Toggle visibility with
 * `import.meta.env.DEV` or the `VITE_ENABLE_ROLE_SWITCHER` flag so it can
 * be removed cleanly in production.
 */
export function RoleSwitcher() {
  const enabled =
    import.meta.env.DEV ||
    import.meta.env.VITE_ENABLE_ROLE_SWITCHER === "true";
  if (!enabled) return null;

  const { currentEmployee, availableEmployees, setCurrentEmployeeId } =
    useCurrentEmployee();

  return (
    <div className="hidden items-center gap-2 md:flex">
      <span
        className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
        aria-hidden="true"
      >
        <UserCog className="h-3.5 w-3.5" />
        Viewing as
      </span>
      <Select
        value={currentEmployee.id}
        onValueChange={setCurrentEmployeeId}
      >
        <SelectTrigger
          className="h-8 w-[220px] text-xs"
          aria-label="Preview as employee"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectGroup>
            <SelectLabel className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Development personas
            </SelectLabel>
            {availableEmployees.map((emp) => (
              <SelectItem key={emp.id} value={emp.id} className="text-xs">
                <span className="font-medium">{emp.designation}</span>
                <span className="ml-1.5 text-muted-foreground">
                  · {emp.name}
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
