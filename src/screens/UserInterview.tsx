import React, { useState } from "react";
import { useAtom } from "jotai";
import {
  DialogWrapper,
  AnimatedTextBlockWrapper,
} from "@/components/DialogWrapper";
import { Button } from "@/components/ui/button";
import {
  angelProfileWriteAtom,
  AngelProfile,
  characterCardAtom,
} from "@/store/userProfile";
import { screenAtom } from "@/store/screens";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Loader } from "@/components/Loader";

const questions = [
  {
    key: "name" as keyof AngelProfile,
    question: "What would you like to name your Angel?",
    placeholder: "Choose a name for your Angel...",
  },
  {
    key: "age" as keyof AngelProfile,
    question: "What age should your Angel appear to be?",
    placeholder: "Enter Angel's age...",
  },
  {
    key: "gender" as keyof AngelProfile,
    question: "What gender should Angel be?",
    type: "select",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
    ],
  },
  {
    key: "location" as keyof AngelProfile,
    question: "Where should your Angel be from?",
    placeholder: "Choose Angel's origin or background...",
  },
  {
    key: "hobbies" as keyof AngelProfile,
    question: "What hobbies should your Angel have?",
    placeholder: "What should Angel be passionate about?...",
  },
  {
    key: "funFact" as keyof AngelProfile,
    question: "What's a fun trait your Angel should have?",
    placeholder: "What makes Angel unique and interesting?...",
  },
  {
    key: "favoriteMovie" as keyof AngelProfile,
    question: "What should your Angel's favorite movie or show be?",
    placeholder: "Choose something Angel would love...",
  },
  {
    key: "dreamDestination" as keyof AngelProfile,
    question: "Where would your Angel dream of traveling?",
    placeholder: "Angel's dream destination...",
  },
];

export const UserInterview: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userProfile, setUserProfile] = useAtom(angelProfileWriteAtom);
  const [, setCharacterCard] = useAtom(characterCardAtom);
  const [, setScreenState] = useAtom(screenAtom);
  const [isGenerating, setIsGenerating] = useState(false);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const canProceed =
    userProfile[question.key] &&
    userProfile[question.key].toString().trim() !== "";

  const handleInputChange = (value: string) => {
    const updatedProfile = { ...userProfile, [question.key]: value };
    setUserProfile(updatedProfile);
  };

  const generateCharacterCard = async () => {
    setIsGenerating(true);
    try {
      // Clear old character card since we're generating a new one
      setCharacterCard("");
      if (typeof window !== "undefined") {
        localStorage.removeItem("angel-character-card");
      }
      const response = await fetch("/api/generate-character", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ angelProfile: userProfile }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate character card");
      }

      const { characterCard } = await response.json();
      setCharacterCard(characterCard);

      // Save character card to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("angel-character-card", characterCard);
      }

      setScreenState({ currentScreen: "instructions" });
    } catch (error) {
      console.error("Error generating character card:", error);
      // Proceed anyway with default
      setScreenState({ currentScreen: "instructions" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      generateCharacterCard();
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const renderInput = () => {
    if (question.type === "select") {
      return (
        <div className="space-y-3">
          {question.options?.map((option) => (
            <button
              key={option.value}
              onClick={() => handleInputChange(option.value)}
              className={`w-full rounded-lg border-2 p-4 transition-colors ${
                userProfile[question.key] === option.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-gray-600 bg-gray-800 text-white hover:border-gray-500"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      );
    }

    return (
      <textarea
        value={userProfile[question.key] || ""}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder={question.placeholder}
        className="w-full resize-none rounded-lg border-2 border-gray-600 bg-gray-800 p-4 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
        rows={3}
        autoFocus
      />
    );
  };

  if (isGenerating) {
    return (
      <DialogWrapper>
        <AnimatedTextBlockWrapper>
          <div className="flex h-full flex-col items-center justify-center space-y-6 p-6">
            <Loader size="60" speed="1.5" color="white" />
            <div className="text-center">
              <h2 className="mb-2 text-xl font-semibold text-white">
                Creating your personalized Angel...
              </h2>
              <p className="text-gray-400">
                We're crafting the perfect personality based on your responses
              </p>
            </div>
          </div>
        </AnimatedTextBlockWrapper>
      </DialogWrapper>
    );
  }

  return (
    <DialogWrapper>
      <AnimatedTextBlockWrapper>
        <div className="flex h-full flex-col justify-between p-6">
          <div className="flex flex-1 flex-col justify-center space-y-6">
            <div className="text-center">
              <div className="mb-2 text-sm text-gray-400">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <div className="mb-6 h-2 w-full rounded-full bg-gray-700">
                <div
                  className="h-2 rounded-full bg-primary transition-all duration-300"
                  style={{
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
              <h2 className="mb-6 text-xl font-semibold text-white">
                {question.question}
              </h2>
            </div>

            {renderInput()}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceed || isGenerating}
              className="flex items-center gap-2"
            >
              {isLastQuestion ? "Meet Angel" : "Next"}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
};
