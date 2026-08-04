export type ReportFormat = "dashboard" | "table" | "document" | "export";

export type ReportStatus = "live" | "scheduled" | "draft";

export interface ReportItem {
  id: string;
  name: string;
  description: string;
  appId: string;
  categoryId: string;
  format: ReportFormat;
  status: ReportStatus;
  owner: string;
  updatedAt: string;
  favorite?: boolean;
  tags?: readonly string[];
}

export interface ReportCategory {
  id: string;
  name: string;
}

export interface ReportApp {
  id: string;
  name: string;
  /** Lucide icon name resolved by the UI. */
  icon: string;
  description: string;
  categories: readonly ReportCategory[];
}

export interface ReportCatalog {
  apps: readonly ReportApp[];
  reports: readonly ReportItem[];
}
