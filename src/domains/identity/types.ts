/**
 * Identity domain — represents the currently signed-in employee.
 *
 * Today this is fed by a development-only role switcher backed by mock
 * personas. When platform auth comes online, the real authenticated
 * employee will be provided through the same `CurrentEmployeeProvider`
 * without any changes required in feature code.
 */

export interface Employee {
  id: string;
  name: string;
  designation: string;
  department: string;
  /** Business role key, e.g. "ceo", "hotel-gm". */
  role: string;
  /** Optional hotel / property assignment. */
  hotel?: string;
  /** Initials or avatar URL fallback handled by the UI. */
  avatarUrl?: string;
  permissions?: readonly string[];
  /**
   * Preferred home dashboard slug for this employee. The workspace uses
   * it to select the Home dashboard through the existing DashboardProvider;
   * when omitted, the provider's `getDefault()` is used.
   */
  defaultDashboardSlug?: string;
}
