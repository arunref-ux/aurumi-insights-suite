export type AiConfidence = "low" | "medium" | "high";

export interface AiSummaryWidgetData {
  summaryTitle: string;
  insight: string;
  confidence: AiConfidence;
  /** ISO 8601 timestamp. */
  generatedAt: string;
  model?: string;
}

export interface AiSummaryWidgetConfig {
  compact?: boolean;
}
