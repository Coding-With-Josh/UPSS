import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { CourseBanner } from "./_components/course-banner";
import { Module } from "./_components/module";
import { Students } from "./_components/students";
import { Events } from "./_components/events";
import { ProgressIndicator } from "./_components/progress-indicator";
import { validateRequest } from "@/lib/lucia";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { name: string } }) => {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/sign-in");
  }

  const courseName = params.name.toUpperCase();

  return (
    <div className="min-h-screen w-full pb-8">
      <CourseBanner name={params.name} />
      <div className="mt-7 mx-4">
        <h2 className="text-2xl lg:text-4xl font-semibold">{courseName}</h2>
        <p className="mt-2 text-muted-foreground text-sm lg:text-md">
          Master the fundamentals of {params.name} through interactive lessons and practical exercises.
        </p>
      </div>

      <Tabs defaultValue="modules" className="mt-6 mx-4">
        <TabsList className="lg:space-x-1 w-full lg:w-fit">
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="mt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg lg:text-2xl font-semibold">Course Modules</h2>
            <ProgressIndicator value={30} />
          </div>
          
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
            <Module
              title="Number Systems"
              progress={30}
              quizzes={2}
              course={params.name}
              videos={1}
              slug="number-system"
              className="col-span-1 xl:row-span-2"
            />
            <Module
              title="Number Bases"
              progress={30}
              quizzes={2}
              course={params.name}
              videos={1}
              slug="number-bases"
              className="col-span-1 xl:row-span-1"
            />
            <Module
              title="Logarithms"
              progress={30}
              quizzes={2}
              course={params.name}
              videos={1}
              slug="logarithms"
              className="col-span-1 xl:row-span-1"
            />
            <Module
              title="Sets"
              progress={30}
              quizzes={2}
              course={params.name}
              videos={1}
              slug="sets"
              className="col-span-1 xl:row-span-2"
            />
          </div>
        </TabsContent>

        <TabsContent value="students" className="mt-6">
          <Students />
        </TabsContent>

        <TabsContent value="assessments" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg lg:text-2xl font-semibold mb-4">Course Assessments</h2>
              <div className="space-y-4">
                {Array.from({length: 3}).map((_, i) => (
                  <div key={i} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Assessment {i + 1}</h3>
                        <p className="text-sm text-muted-foreground">Due: {new Date().toLocaleDateString()}</p>
                      </div>
                      <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                        Start
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="mt-6">
          <Events />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
