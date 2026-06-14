"use client";

import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
      <Spinner
        size="lg"
        color="primary"
        labelColor="foreground"
        label="Loading..."
        classNames={{
          label: "text-zinc-400 text-sm tracking-widest uppercase mt-2",
          circle1: "border-b-blue-500",
          circle2: "border-b-purple-500",
        }}
      />
    </div>
  );
}