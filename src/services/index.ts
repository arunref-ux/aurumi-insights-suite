/**
 * Mock service layer.
 *
 * Each service exposes async placeholder methods that resolve with `null`.
 * Replace with real API integrations when the backend contract is defined.
 */

const stub = <T = null>(value: T | null = null): Promise<T | null> => Promise.resolve(value);

export const DashboardService = {
  getOverview: () => stub(),
  listWidgets: () => stub([]),
};

export const WidgetService = {
  list: () => stub([]),
  get: (_id: string) => stub(),
  create: (_input: unknown) => stub(),
  update: (_id: string, _input: unknown) => stub(),
  remove: (_id: string) => stub(),
};

export const ReportService = {
  list: () => stub([]),
  get: (_id: string) => stub(),
  generate: (_input: unknown) => stub(),
};

export const AnalyticsService = {
  getMetrics: () => stub(),
  query: (_input: unknown) => stub(),
};

export const InsightService = {
  list: () => stub([]),
  generate: (_prompt: string) => stub(),
};
