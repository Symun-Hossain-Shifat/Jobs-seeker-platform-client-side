"use client";

import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
      <Spinner size="lg" color="primary" />
      <p className="text-zinc-400 text-sm tracking-widest uppercase">
        Loading...
      </p>
    </div>
  );
}