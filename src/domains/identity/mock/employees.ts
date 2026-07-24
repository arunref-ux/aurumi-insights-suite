import type { Employee } from "../types";

/**
 * Mock employee personas used by the development role switcher.
 * Not imported by feature code — only consumed by the dev-only
 * `RoleSwitcher` and the `CurrentEmployeeProvider` seed.
 */
export const MOCK_EMPLOYEES: readonly Employee[] = [
  {
    id: "emp-ceo",
    name: "Ariana Kapoor",
    designation: "Chief Executive Officer",
    department: "Executive",
    role: "ceo",
    defaultDashboardSlug: "executive-command-center",
  },
  {
    id: "emp-coo",
    name: "Marcus Rivera",
    designation: "Chief Operating Officer",
    department: "Executive",
    role: "coo",
    defaultDashboardSlug: "executive-command-center",
  },
  {
    id: "emp-hotel-gm",
    name: "Priya Nair",
    designation: "Hotel General Manager",
    department: "Operations",
    role: "hotel-gm",
    hotel: "Aurumi Hyderabad",
    defaultDashboardSlug: "executive",
  },
  {
    id: "emp-front-office",
    name: "Daniel Okafor",
    designation: "Front Office Manager",
    department: "Front Office",
    role: "front-office-manager",
    hotel: "Aurumi Hyderabad",
    defaultDashboardSlug: "executive",
  },
  {
    id: "emp-housekeeping",
    name: "Leila Haddad",
    designation: "Housekeeping Manager",
    department: "Housekeeping",
    role: "housekeeping-manager",
    hotel: "Aurumi Hyderabad",
    defaultDashboardSlug: "executive",
  },
  {
    id: "emp-restaurant",
    name: "Kenji Watanabe",
    designation: "Restaurant Manager",
    department: "Food & Beverage",
    role: "restaurant-manager",
    hotel: "Aurumi Hyderabad",
    defaultDashboardSlug: "executive",
  },
  {
    id: "emp-hr",
    name: "Sofia Meyer",
    designation: "HR Manager",
    department: "People",
    role: "hr-manager",
    defaultDashboardSlug: "executive",
  },
  {
    id: "emp-finance",
    name: "Rahul Iyer",
    designation: "Finance Manager",
    department: "Finance",
    role: "finance-manager",
    defaultDashboardSlug: "executive-command-center",
  },
  {
    id: "emp-sales",
    name: "Emily Zhang",
    designation: "Sales Manager",
    department: "Sales",
    role: "sales-manager",
    defaultDashboardSlug: "executive",
  },
];

export const DEFAULT_EMPLOYEE_ID = MOCK_EMPLOYEES[0].id;
