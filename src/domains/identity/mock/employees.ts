import type { Employee } from "../types";

export const MOCK_EMPLOYEES: readonly Employee[] = [
  {
    id: "emp-owner",
    name: "Sarah Jenkins",
    designation: "Founder & CEO",
    department: "Executive",
    role: "ceo",
    defaultDashboardSlug: "executive-command-center",
  },
  {
    id: "emp-sales",
    name: "Marcus Rivera",
    designation: "VP of Sales",
    department: "Sales & Marketing",
    role: "sales-manager",
    defaultDashboardSlug: "sales-manager-dashboard",
  },
  {
    id: "emp-hr",
    name: "Priya Nair",
    designation: "Head of People",
    department: "HR",
    role: "hr-manager",
    defaultDashboardSlug: "hr-manager-dashboard",
  }
];

export const DEFAULT_EMPLOYEE_ID = MOCK_EMPLOYEES[0].id;
