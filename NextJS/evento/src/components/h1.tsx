import { cn } from "@/lib/utils";
import React from "react";

type TH1 = {
  children: React.ReactNode;
  className?: string;
};

export default function H1({ children, className }: TH1) {
  return (
    <h1
      className={cn("text-3xl lg:text-6xl font-bold tracking-tight", className)}
    >
      {children}
    </h1>
  );
}
