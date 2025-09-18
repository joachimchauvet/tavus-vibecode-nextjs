import { AnimatedWrapper } from "@/components/DialogWrapper";
import React from "react";
import { useAtom } from "jotai";
import { screenAtom } from "@/store/screens";
import AudioButton from "@/components/AudioButton";
import gloriaVideo from "@/assets/video/gloria.mp4";
import Image from "next/image";

export const Intro: React.FC = () => {
  const [, setScreenState] = useAtom(screenAtom);

  const handleClick = () => {
    setScreenState({ currentScreen: "userInterview" });
  };

  return (
    <AnimatedWrapper>
      <div className="flex size-full flex-col items-center justify-center">
        <video
          src={gloriaVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-primary-overlay backdrop-blur-sm" />
        <div
          className="relative z-10 flex flex-col items-center gap-2 rounded-xl border border-[rgba(255,255,255,0.2)] px-4 py-4"
          style={{
            fontFamily: "Inter, sans-serif",
            background: "rgba(0,0,0,0.3)",
          }}
        >
          <Image
            src="/images/vector.svg"
            alt="Logo"
            width={40}
            height={40}
            className="mb-1 mt-2"
            style={{ width: "auto", height: "40px" }}
          />
          <h1
            className="mb-2 text-2xl font-bold text-white"
            style={{ fontFamily: "Source Code Pro, monospace" }}
          >
            Meet Your Angel
          </h1>
          <p
            className="mb-6 max-w-md text-center text-white"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Your personalized AI companion. Let's get to know each other first!
          </p>

          <AudioButton
            onClick={handleClick}
            className="relative z-20 mt-4 flex items-center justify-center gap-2 rounded-3xl border border-[rgba(255,255,255,0.3)] px-6 py-3 text-sm text-white transition-all duration-200 hover:text-primary"
            style={{
              height: "44px",
              transition: "all 0.2s ease-in-out",
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 15px rgba(34, 197, 254, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Let's Begin
          </AudioButton>
        </div>
      </div>
    </AnimatedWrapper>
  );
};
