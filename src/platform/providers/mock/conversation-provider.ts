import { ConversationService, DEFAULT_SUGGESTIONS } from "@/domains/conversation/service";
import type { ConversationProvider } from "../../contracts";

export const mockConversationProvider: ConversationProvider = {
  suggestions: async () => DEFAULT_SUGGESTIONS,
  ask: (prompt) => ConversationService.ask(prompt),
};
