"use client";

import React, { use, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useQuizStore } from "./layout";
import {moduleStructure} from "@/lib/module-structure";

interface Question {
  id: string;
  text: string;
  options: string[];
  answer: string;
}

interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  timeLimit: number; // time limit in minutes
}

// Mock data - replace with actual data fetching
const quiz: Quiz = {
  id: "1",
  title: "Number Systems Basics",
  timeLimit: 30, // 30 minutes
  questions: [
    {
      id: "q1",
      text: "What is the base of the decimal number system?",
      options: ["2", "8", "10", "16"],
      answer: "10",
    },
    {
      id: "q2",
      text: "How many digits are used in the binary number system?",
      options: ["1", "2", "8", "10"],
      answer: "2",
    },
  ],
};

// Mock module structure - replace with actual data fetching
// const moduleStructure = {
//   activities: [
//     { type: 'content', slug: 'introduction' },
//     { type: 'quiz', slug: 'basic-quiz' },
//     { type: 'assignment', slug: 'basic-assignment' }
//   ]
// };

export default function QuizPage({ params }: { params: Promise<{ name: string; slug: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { setSubmitted } = useQuizStore();
  const currentActivityIndex = moduleStructure.activities.findIndex(
    activity => activity.slug === resolvedParams.slug
  );

  const nextActivity = currentActivityIndex < moduleStructure.activities.length - 1
    ? moduleStructure.activities[currentActivityIndex + 1]
    : null;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [started, setStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit * 60); // Convert minutes to seconds
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showStartDialog, setShowStartDialog] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [score, setScore] = useState(0);
  const [grade, setGrade] = useState("");

  // Calculate the number of answered questions
  const answeredQuestions = Object.keys(answers).length;
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "/") {
        setShowDialog(!showDialog);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [showDialog]);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (started && !isSubmitted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [started, isSubmitted, timeRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    quiz.questions.forEach((question) => {
      if (answers[question.id] === question.answer) {
        correctAnswers++;
      }
    });
    const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(finalScore);
    
    // Calculate grade
    if (finalScore >= 90) setGrade("A");
    else if (finalScore >= 80) setGrade("B");
    else if (finalScore >= 70) setGrade("C");
    else if (finalScore >= 60) setGrade("D");
    else setGrade("F");
    return finalScore;
  };

  const handleStart = () => {
    setStarted(true);
    setShowStartDialog(false);
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    setIsSubmitted(true);
    setSubmitted(true); // Update global state
    setShowSubmitDialog(false);
  };

  const handleAnswer = (value: string) => {
    if (!started) return;
    setAnswers((prev) => ({
      ...prev,
      [quiz.questions[currentQuestion].id]: value,
    }));
  };

  const question = quiz.questions[currentQuestion];

  return (
    <div className="min-h-screen w-full p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
          <Link href={`/my/courses/${resolvedParams.name}/${resolvedParams.slug}`} className={`${isSubmitted ? "" : "pointer-events-none cursor-not-allowed opacity-50 disabled"}`}>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <ChevronLeft className="size-4 mr-1" />
              Back to Course
            </Button>
          </Link>
          <div className="w-full sm:w-auto text-center sm:text-right">
            <p className="text-sm text-muted-foreground mb-1">Time Remaining</p>
            <p className="text-lg font-semibold">{formatTime(timeRemaining)}</p>
          </div>
        </div>

        {/* Start Attempt Dialog */}
        <AlertDialog open={showStartDialog} onOpenChange={setShowStartDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Start Quiz Attempt</AlertDialogTitle>
              <AlertDialogDescription className="space-y-4">
                <p>You are about to start an attempt for:</p>
                <p className="font-medium">{quiz.title}</p>
                <div className="space-y-2 mt-4">
                  <p>Quiz Details:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Number of questions: {quiz.questions.length}</li>
                    <li>Time limit: {quiz.timeLimit} minutes</li>
                    <li>You can only submit once</li>
                    <li>You must complete all questions</li>
                    <li>Quiz will auto-submit when time expires</li>
                  </ul>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                <Link href={`/my/courses/${resolvedParams.name}/${resolvedParams.slug}`} className="text-muted-foreground">Cancel</Link>
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleStart}>Start Attempt</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Submit Confirmation Dialog */}
        <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Submit Quiz</AlertDialogTitle>
              <AlertDialogDescription className="space-y-4">
                <p>Are you sure you want to submit this quiz?</p>
                <div className="space-y-2 mt-4">
                  <p>Submission Summary:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Questions answered: {answeredQuestions} of {quiz.questions.length}</li>
                    <li>This action cannot be undone</li>
                    <li>You cannot modify answers after submission</li>
                  </ul>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleSubmit}
                disabled={answeredQuestions < quiz.questions.length}
              >
                Submit Quiz
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Card className="mb-6">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h1 className="text-xl md:text-2xl font-bold mb-2 sm:mb-0">{quiz.title}</h1>
              <div className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </div>
            </div>

            {isSubmitted && (
              <div className="mb-6 p-4 bg-muted rounded-lg">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Quiz Results</h3>
                    <p className="text-muted-foreground">
                      You scored {score.toFixed(1)}% ({Math.round(score * quiz.questions.length / 100)} out of {quiz.questions.length} correct)
                    </p>
                  </div>
                  <div className="text-center">
                    <div className={`
                      text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center
                      ${grade === 'A' ? 'bg-green-100 text-green-700' :
                        grade === 'B' ? 'bg-blue-100 text-blue-700' :
                        grade === 'C' ? 'bg-yellow-100 text-yellow-700' :
                        grade === 'D' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'}
                    `}>
                      {grade}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Grade</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-base md:text-lg mb-4">{question.text}</p>
                <RadioGroup
                  value={answers[question.id] || ""}
                  onValueChange={(value) => handleAnswer(value)}
                  className="space-y-3"
                >
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 hover:bg-accent rounded-md transition-colors">
                      <RadioGroupItem
                        value={option}
                        id={`${question.id}-${index}`}
                        disabled={isSubmitted || !started}
                        className="text-base"
                      />
                      <Label
                        htmlFor={`${question.id}-${index}`}
                        className={`${
                          showDialog && option === question.answer
                            ? "text-green-600 font-bold"
                            : ""
                        } cursor-pointer text-sm md:text-base`}
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(prev => prev - 1)}
                  disabled={currentQuestion === 0 || isSubmitted || !started}
                  className="w-full sm:w-auto order-2 sm:order-1"
                >
                  Previous
                </Button>
                {isLastQuestion ? (
                  <Button
                    onClick={() => setShowSubmitDialog(true)}
                    disabled={answeredQuestions < quiz.questions.length || isSubmitted || !started}
                    className="w-full sm:w-auto order-1 sm:order-2"
                  >
                    Submit Quiz
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCurrentQuestion(prev => prev + 1)}
                    disabled={!answers[question.id] || isSubmitted || !started}
                    className="w-full sm:w-auto order-1 sm:order-2"
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {isSubmitted && (
          <div className="flex justify-end mt-4 md:mt-6">
            {nextActivity && (
              <Link href={`/my/courses/${resolvedParams.name}/${resolvedParams.slug}/assignment`}>
                <Button className="w-full sm:w-auto">
                  Next Activity
                  <ChevronRight className="size-4 ml-1" />
                </Button>
              </Link>
            )}
          </div>
        )}
        {isSubmitted && (
          <div className="mt-4 p-4 rounded-lg bg-muted">
            <p className="font-medium mb-2">
              {answers[question.id] === question.answer ? (
                <span className="text-green-600">✓ Correct!</span>
              ) : (
                <span className="text-red-600">✗ Incorrect</span>
              )}
            </p>
            <p className="text-sm text-muted-foreground">
              {answers[question.id] !== question.answer && (
                <>The correct answer was: <span className="font-medium">{question.answer}</span></>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}