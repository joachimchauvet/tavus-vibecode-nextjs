import { atom } from "jotai";

export interface AngelProfile {
  name: string;
  age: string;
  gender: "male" | "female" | "";
  location: string;
  hobbies: string;
  funFact: string;
  favoriteMovie: string;
  dreamDestination: string;
}

const getInitialProfile = (): AngelProfile => {
  const defaultProfile: AngelProfile = {
    name: "",
    age: "",
    gender: "",
    location: "",
    hobbies: "",
    funFact: "",
    favoriteMovie: "",
    dreamDestination: "",
  };

  if (typeof window !== "undefined") {
    const savedProfile = localStorage.getItem("angel-character-profile");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        console.log("Loaded angel profile from localStorage:", parsed);
        return parsed;
      } catch (error) {
        console.error("Error parsing angel profile from localStorage:", error);
      }
    }
  }
  return defaultProfile;
};

export const angelProfileAtom = atom<AngelProfile>(getInitialProfile());

// Write atom that also saves to localStorage
export const angelProfileWriteAtom = atom(
  (get) => get(angelProfileAtom),
  (get, set, newProfile: AngelProfile) => {
    set(angelProfileAtom, newProfile);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "angel-character-profile",
        JSON.stringify(newProfile),
      );
      console.log("Saved angel profile to localStorage:", newProfile);
    }
  },
);

// Keep the old export for backwards compatibility during transition
export const userProfileAtom = angelProfileWriteAtom;

const getInitialCharacterCard = (): string => {
  if (typeof window !== "undefined") {
    const savedCard = localStorage.getItem("angel-character-card");
    if (savedCard) {
      return savedCard;
    }
  }
  return "";
};

export const characterCardAtom = atom<string>(getInitialCharacterCard());
