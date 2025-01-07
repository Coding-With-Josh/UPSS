"use client";

import React, { use } from "react";
import YouTube from "react-youtube";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import Link from "next/link";

interface ContentPageData {
  id: string;
  title: string;
  content: string;
  videoUrl?: string | undefined;
  order: number;
}

// Mock data - replace with actual data fetching
const contentPage: ContentPageData = {
  id: "1",
  title: "Introduction to Number Systems",
  content: `
    A number system is a way to represent numbers. Different number systems use different symbols and rules to represent numbers.

    The most common number systems are:
    1. Decimal (Base-10)
    2. Binary (Base-2)
    3. Octal (Base-8)
    4. Hexadecimal (Base-16)

    Each system has its own advantages and uses in different contexts, particularly in computer science and digital electronics.
  `,
  videoUrl: "https://www.youtube.com/watch?v=KUqx_qTlEDc",
  order: 1,
};

// Mock module structure - replace with actual data fetching
const moduleStructure = {
  activities: [
    { type: 'content', slug: 'introduction' },
    { type: 'quiz', slug: 'basic-quiz' },
    { type: 'assignment', slug: 'basic-assignment' }
  ]
};

// Helper function to extract YouTube video ID
const getYouTubeVideoId = (url: string) => {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : "";
};

// Helper function to generate PDF
const generatePDF = (content: string) => {
  const doc = new jsPDF();
  doc.setFont("helvetica");
  doc.setFontSize(12);
  
  // Split content into lines that fit the page width
  const lines = doc.splitTextToSize(content, 180);
  doc.text(lines, 15, 20);
  
  // Save the PDF
  doc.save("lecture-notes.pdf");
};

export default function ContentPage({ 
  params 
}: { 
  params: { name: string; slug: string } 
}) {
  const currentActivityIndex = moduleStructure.activities.findIndex(
    activity => activity.slug === params.slug
  );
  
  const nextActivity = currentActivityIndex < moduleStructure.activities.length - 1 
    ? moduleStructure.activities[currentActivityIndex + 1]
    : null;

  const videoId = getYouTubeVideoId(contentPage.videoUrl || "");

  return (
    <div className="min-h-screen w-full p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-6 w-full">
          <Link href={`/my/courses/${params.name}/${params.slug}`}>
            <Button variant="outline" size="sm" className="w-full sm:w-auto mb-2 sm:mb-0">
              <ChevronLeft className="size-4 mr-1" />
              Back to Course
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => generatePDF(contentPage.content)}
            className="w-full sm:w-auto"
          >
            <Download className="size-4 mr-1" />
            Download Notes
          </Button>
        </div>

        <Card>
          <CardContent className="p-4 md:p-6">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">{contentPage.title}</h1>

            {contentPage.videoUrl && (
              <div className="aspect-video bg-muted rounded-lg mb-6 overflow-hidden">
                <YouTube
                  videoId={videoId}
                  opts={{
                    width: '100%',
                    height: '100%',
                    playerVars: {
                      autoplay: 0,
                      modestbranding: 1,
                      rel: 0
                    },
                  }}
                  className="w-full h-full"
                  iframeClassName="w-full h-full"
                />
              </div>
            )}

            <div className="prose prose-sm md:prose lg:prose-lg prose-slate dark:prose-invert max-w-none">
              {contentPage.content.split("\\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-sm md:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end mt-4 md:mt-6">
          {nextActivity && (
            <Link href={`/my/courses/${params.name}/${params.slug}/quiz`}>
              <Button className="w-full sm:w-auto">
                Next: Take Quiz
                <ChevronRight className="size-4 ml-1" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
