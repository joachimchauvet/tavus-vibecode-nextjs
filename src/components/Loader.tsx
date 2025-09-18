"use client";

import { useEffect, useState } from "react";

export const Loader = ({
  size = "45",
  speed = "1.75",
  color = "white",
  type = "quantum",
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      import("ldrs").then((ldrs) => {
        if (
          type === "quantum" &&
          ldrs.quantum &&
          !customElements.get("l-quantum")
        ) {
          ldrs.quantum.register();
        } else if (
          type === "grid" &&
          ldrs.grid &&
          !customElements.get("l-grid")
        ) {
          ldrs.grid.register();
        }
      });
    }
  }, [type]);

  if (!isClient) {
    return <div className="h-[45px] w-[45px]" />;
  }

  if (type === "grid") {
    return <l-grid size={size} speed={speed} color={color} />;
  }

  return <l-quantum size={size} speed={speed} color={color} />;
};
