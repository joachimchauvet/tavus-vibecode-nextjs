"use client";

import { DailyProvider } from "@daily-co/daily-react";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <DailyProvider>{children}</DailyProvider>;
}
