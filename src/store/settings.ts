import { atom } from "jotai";
import { angelProfileAtom, characterCardAtom } from "./userProfile";

interface Settings {
  name: string;
  language: string;
  interruptSensitivity: string;
  greeting: string;
  context: string;
  persona: string;
  replica: string;
}

const getInitialSettings = (): Settings => {
  if (typeof window !== "undefined") {
    const savedSettings = localStorage.getItem("tavus-settings");
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
  }
  return {
    name: "",
    language: "en",
    interruptSensitivity: "medium",
    greeting: "",
    context: "",
    persona: "",
    replica: "",
  };
};

// Dynamic settings based on user profile and character card
export const settingsAtom = atom((get) => {
  const angelProfile = get(angelProfileAtom);
  const characterCard = get(characterCardAtom);
  const baseSettings = getInitialSettings();

  // Add debugging
  console.log("Settings atom - angelProfile:", angelProfile);
  console.log("Settings atom - characterCard:", characterCard);

  // Select persona based on gender
  const persona =
    angelProfile.gender === "female" ? "r9c55f9312fb" : "r880666f8c89";

  const settings = {
    ...baseSettings,
    name: "", // Keep this empty to avoid confusion in createConversation
    greeting: characterCard
      ? `Hi there! I'm ${angelProfile.name}, your personalized AI companion. I'm excited to chat with you!`
      : `Hey there! I'm ${angelProfile.name || "Angel"}, your AI companion. Let's have a great conversation!`,
    context: characterCard
      ? characterCard
      : `You are an AI companion named ${angelProfile.name || "Angel"}. Be friendly, helpful, and engaging in conversation.`,
    persona: persona || baseSettings.persona,
  };

  console.log("Settings atom - final settings:", settings);
  return settings;
});

export const settingsSavedAtom = atom<boolean>(false);
