"use client";

import React, { useState, use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  points: number;
}

// Mock data - replace with actual data fetching
const assignment: Assignment = {
  id: "1",
  title: "Number System Conversion Practice",
  description: `
    1. Convert the following decimal numbers to binary:
       a) 25
       b) 42
       c) 156

    2. Convert the following binary numbers to decimal:
       a) 1010
       b) 11001
       c) 101010

    3. Explain the process you used for each conversion.

    Please show all your work and explain your reasoning for each step.
  `,
  dueDate: "2024-03-01",
  points: 100,
};

// Mock module structure - replace with actual data fetching
const moduleStructure = {
  activities: [
    { type: 'content', slug: 'introduction' },
    { type: 'quiz', slug: 'basic-quiz' },
    { type: 'assignment', slug: 'basic-assignment' }
  ]
};

export default function AssignmentPage({ 
  params 
}: { 
  params: Promise<{ name: string; slug: string }> 
}) {
  const resolvedParams = use(params);
  const [submission, setSubmission] = useState("");
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  const handleSubmit = () => {
    // Handle assignment submission
  };

  const handleSaveDraft = () => {
    // Handle save draft
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const currentActivityIndex = moduleStructure.activities.findIndex(
    activity => activity.slug === resolvedParams.slug
  );
  
  const nextActivity = currentActivityIndex < moduleStructure.activities.length - 1 
    ? moduleStructure.activities[currentActivityIndex + 1]
    : null;

  return (
    <div className="min-h-screen w-full p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
          <Link href={`/my/courses/${resolvedParams.name}/${resolvedParams.slug}`}>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <ChevronLeft className="size-4 mr-1" />
              Back to Course
            </Button>
          </Link>
          <div className="w-full sm:w-auto text-right">
            <p className="text-sm text-muted-foreground">Due Date</p>
            <p className="text-base font-medium">{formatDate(assignment.dueDate)}</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h1 className="text-xl md:text-2xl font-bold mb-2 sm:mb-0">{assignment.title}</h1>
              <div className="text-sm text-muted-foreground">
                Points: {assignment.points}
              </div>
            </div>

            <div className="space-y-6">
              <div className="prose prose-sm md:prose lg:prose-lg prose-slate dark:prose-invert max-w-none">
                {assignment.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 whitespace-pre-wrap">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="space-y-4">
                <Label htmlFor="submission" className="text-base">Your Submission</Label>
                <Textarea
                  id="submission"
                  placeholder="Type your answer here..."
                  className="min-h-[200px] text-sm md:text-base"
                  value={submission}
                  onChange={(e) => setSubmission(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={handleSaveDraft}
                  className="w-full sm:w-auto order-2 sm:order-1"
                >
                  Save Draft
                </Button>
                <Button
                  onClick={() => setShowSubmitDialog(true)}
                  disabled={!submission.trim()}
                  className="w-full sm:w-auto order-1 sm:order-2"
                >
                  Submit Assignment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Submit Assignment</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to submit this assignment? You won't be able to edit it after submission.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
