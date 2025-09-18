import { IConversation } from "@/types";
import { settingsAtom } from "@/store/settings";
import { getDefaultStore } from "jotai";

export const createConversation = async (): Promise<IConversation> => {
  // Get settings from Jotai store
  const settings = getDefaultStore().get(settingsAtom);

  // Add debug logs
  console.log("Creating conversation with settings:", settings);
  console.log("Greeting value:", settings.greeting);
  console.log("Context value:", settings.context);

  // Use the context directly - it already contains the character card or default personality
  const contextString = settings.context || "";

  const payload = {
    replica_id: settings.persona || "pd43ffef",
    custom_greeting:
      settings.greeting !== undefined && settings.greeting !== null
        ? settings.greeting
        : "Hey there! I'm Angel, your AI companion. Let's have a great conversation!",
    conversational_context: contextString,
  };

  console.log("Sending payload to API:", payload);

  // Now using Next.js API route instead of directly calling Tavus API
  const response = await fetch("/api/conversations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response?.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error || `HTTP error! status: ${response.status}`,
    );
  }

  const data = await response.json();
  return data;
};
