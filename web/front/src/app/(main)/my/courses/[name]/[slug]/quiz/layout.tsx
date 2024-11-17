"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { create } from 'zustand';

interface QuizStore {
  isSubmitted: boolean;
  setSubmitted: (submitted: boolean) => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  isSubmitted: false,
  setSubmitted: (submitted) => set({ isSubmitted: submitted }),
}));

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isQuizPage = pathname.includes('/quiz');
  const { isSubmitted } = useQuizStore();

  return (
    <div className={`flex min-h-screen ${isQuizPage && !isSubmitted ? 'quiz-mode' : ''}`}>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
