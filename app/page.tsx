"use client";

import { useAtom } from "jotai";
import { screenAtom } from "../src/store/screens";
import { Header } from "../src/components/Header";
import { Footer } from "../src/components/Footer";
import {
  IntroLoading,
  Outage,
  OutOfMinutes,
  Intro,
  UserInterview,
  Instructions,
  Conversation,
  FinalScreen,
  Settings,
} from "../src/screens";

export default function Home() {
  const [{ currentScreen }] = useAtom(screenAtom);

  const renderScreen = () => {
    switch (currentScreen) {
      case "introLoading":
        return <IntroLoading />;
      case "outage":
        return <Outage />;
      case "outOfMinutes":
        return <OutOfMinutes />;
      case "intro":
        return <Intro />;
      case "userInterview":
        return <UserInterview />;
      case "settings":
        return <Settings />;
      case "instructions":
        return <Instructions />;
      case "conversation":
        return <Conversation />;
      case "finalScreen":
        return <FinalScreen />;
      default:
        return <IntroLoading />;
    }
  };

  return (
    <main className="flex h-svh flex-col items-center justify-between gap-3 bg-black p-5 sm:gap-4 lg:p-8">
      {currentScreen !== "introLoading" && <Header />}
      {renderScreen()}
      {currentScreen !== "introLoading" && <Footer />}
    </main>
  );
}
