"use client";

import NextNProgress from "nextjs-progressbar";
import React from "react";

export const Loader = () => {
  return (
    <NextNProgress
      color="#29D"
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
      showOnShallow={true}
    />
  );
};
