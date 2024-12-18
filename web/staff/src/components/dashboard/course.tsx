import React from "react";
import Image from "next/image";
import { ClickableIcon } from "../reusable/clickable-icon";
import { BookOpen } from "lucide-react";
import Link from "next/link";

import { Progress } from "../ui/progress";
import { useFetch } from "@/hooks/useDatabase";

type Course = {
  title: string;
  link?: string;
  category: string;
  modules: number;
  progress: number;
};


export const Course = ({ title, category, modules, progress, link }: Course) => {
  const { data: courses, loading, error, refetch } = useFetch<'course'>('course')
  
  if (loading) return <div>Loading courses...</div>
  if (error) return <div>Error: {error.message}</div>
  return (
    <Link href={"/my/course" + link}>
      <div className="bg-card flex flex-col items-start justify-between min-w-fit min-h-fit gap-4 border rounded-lg p-3">
        <Image
          src={require("@/assets/images/courses/Untitled design (1).png")}
          alt=""
          className="w-[20rem] [h-16rem] rounded-md"
        />
        {/* <Image
                src={require("@/assets/images/courses/course-one-dark.svg")}
                alt=""
                className="w-[22rem] [h-17rem] rounded-lg hidden dark:block"
              /> */}
        <div className="flex flex-col items-centrer justify-center space-y-2 w-full">
          <div className="flex flex-col items-start justify-center w-full">
            <h2>{title}</h2>
            <span className="text-sm text-muted-foreground">{category}</span>
          </div>

          <div className="flex items-start justify-start gap-2 w-full">
            <ClickableIcon
              className="min-w-fit min-h-fit p-1 bg-blue-300 rounded-md text-blue-700"
              link={"/my/courses/mathematics"}
            >
              <BookOpen size={17} />
            </ClickableIcon>
            <h2 className="text-sm text-muted-foreground">
              {modules + "modules"}
            </h2>
          </div>
          <div className="w-full">
            <Progress value={progress} color="green" className="h-2.5" />
          </div>
        </div>
      </div>
    </Link>
  );
};
