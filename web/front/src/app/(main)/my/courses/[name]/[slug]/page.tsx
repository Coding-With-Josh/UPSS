"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, GraduationCap, PlayCircle } from "lucide-react";
import Link from "next/link";
import { CourseBanner } from "../_components/course-banner";

interface ModuleContent {
  id: string;
  title: string;
  description: string;
  videos: {
    id: string;
    title: string;
    duration: string;
    completed: boolean;
  }[];
  quizzes: {
    id: string;
    title: string;
    questions: number;
    completed: boolean;
  }[];
  assignments: {
    id: string;
    title: string;
    dueDate: string;
    submitted: boolean;
  }[];
  progress: number;
}

// Mock data - replace with actual data fetching
const moduleContent: ModuleContent = {
  id: "1",
  title: "Introduction to Number Systems",
  description: "Learn about different number systems and their applications in computer science.",
  videos: [
    {
      id: "v1",
      title: "Understanding Decimal System",
      duration: "10:30",
      completed: true,
    },
    {
      id: "v2",
      title: "Binary Number System",
      duration: "15:45",
      completed: false,
    },
    {
      id: "v3",
      title: "Hexadecimal Numbers",
      duration: "12:20",
      completed: false,
    },
  ],
  quizzes: [
    {
      id: "q1",
      title: "Decimal System Quiz",
      questions: 5,
      completed: true,
    },
    {
      id: "q2",
      title: "Binary Numbers Practice",
      questions: 8,
      completed: false,
    },
  ],
  assignments: [
    {
      id: "a1",
      title: "Number System Conversion",
      dueDate: "2024-03-01",
      submitted: false,
    },
  ],
  progress: 30,
};

const Page = ({ params }: { params: { name: string; slug: string } }) => {
  const router = useRouter();
  const resolvedParams = React.use(Promise.resolve(params));

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('/api/auth/check');
      if (!response.ok) {
        router.push('/sign-in');
      }
    };
    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen pb-8">
      <CourseBanner name="params.name" />

      <div className="container mx-auto px-4 mt-8">
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">{moduleContent.title}</h1>
          <p className="text-muted-foreground">{moduleContent.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <PlayCircle className="size-5 text-primary" />
                <h3 className="font-semibold">Videos</h3>
              </div>
              <p className="text-2xl font-bold">{moduleContent.videos.length}</p>
              <p className="text-sm text-muted-foreground">
                {moduleContent.videos.filter(v => v.completed).length} completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="size-5 text-primary" />
                <h3 className="font-semibold">Quizzes</h3>
              </div>
              <p className="text-2xl font-bold">{moduleContent.quizzes.length}</p>
              <p className="text-sm text-muted-foreground">
                {moduleContent.quizzes.filter(q => q.completed).length} completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="size-5 text-primary" />
                <h3 className="font-semibold">Assignments</h3>
              </div>
              <p className="text-2xl font-bold">{moduleContent.assignments.length}</p>
              <p className="text-sm text-muted-foreground">
                {moduleContent.assignments.filter(a => a.submitted).length} submitted
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="size-5 text-primary" />
                <h3 className="font-semibold">Progress</h3>
              </div>
              <p className="text-2xl font-bold">{moduleContent.progress}%</p>
              <p className="text-sm text-muted-foreground">Overall completion</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="mt-6">
            <div className="gap-4">
              {moduleContent.videos.map((video) => (
                <Link
                  key={video.id}
                  href={`/my/courses/${resolvedParams.name}/${resolvedParams.slug}/content`}
                >
                  <Card className="hover:bg-muted/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <PlayCircle className={`size-5 ${video.completed ? "text-primary" : "text-muted-foreground"}`} />
                          <div>
                            <p className="font-medium">{video.title}</p>
                            <p className="text-sm text-muted-foreground">{video.duration}</p>
                          </div>
                        </div>
                        {video.completed && (
                          <span className="text-sm text-primary">Completed</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quizzes" className="mt-6">
            <div className="gap-4">
              {moduleContent.quizzes.map((quiz) => (
                <Link
                  key={quiz.id}
                  href={`/my/courses/${resolvedParams.name}/${resolvedParams.slug}/quiz`}
                  className="my-3"
                >
                  <Card className="hover:bg-muted/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className={`size-5 ${quiz.completed ? "text-primary" : "text-muted-foreground"}`} />
                          <div>
                            <p className="font-medium">{quiz.title}</p>
                            <p className="text-sm text-muted-foreground">{quiz.questions} questions</p>
                          </div>
                        </div>
                        {quiz.completed && (
                          <span className="text-sm text-primary">Completed</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="mt-6">
            <div className="space-y-4">
              {moduleContent.assignments.map((assignment) => (
                <Link
                  key={assignment.id}
                  href={`/my/courses/${resolvedParams.name}/${resolvedParams.slug}/assignment`}
                >
                  <Card className="hover:bg-muted/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <GraduationCap className={`size-5 ${assignment.submitted ? "text-primary" : "text-muted-foreground"}`} />
                          <div>
                            <p className="font-medium">{assignment.title}</p>
                            <p className="text-sm text-muted-foreground">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        {assignment.submitted ? (
                          <span className="text-sm text-primary">Submitted</span>
                        ) : (
                          <span className="text-sm text-muted-foreground">Not submitted</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
