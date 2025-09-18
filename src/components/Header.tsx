import { memo } from "react";

export const Header = memo(() => {
  return (
    <header
      className="flex h-10 w-full items-start justify-end sm:h-14"
      style={{ fontFamily: "Inter, sans-serif" }}
    ></header>
  );
});
