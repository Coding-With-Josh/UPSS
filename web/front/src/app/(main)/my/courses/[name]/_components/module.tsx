"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ClickableIcon } from "@/components/reusable/clickable-icon";
import { BookOpen, Check, ChevronUpCircle, Video } from "lucide-react";
import Link from "next/link";

import { Progress } from "@/components/ui/progress";
import { useFetch } from "@/hooks/useDatabase";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Module = {
  title: string;
  quizzes: number;
  videos: number;
  course: string;
  progress: number;
  slug: string;
  className?: string;
};

export const Module = ({
  title,
  progress,
  quizzes,
  course,
  videos,
  slug,
  className,
}: Module) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [operation, setOperation] = useState(false);

  const fetchModues = () => {
    setOperation(true);
    setLoading(true);
    setTimeout(() => {
      setOperation(false);
      setLoading(false);
    }, 3000);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <Link href={"/my/courses/" + course + "/" + slug} className={className}>
      <div className="relative bg-card w hover:bg-muted-foreground/10 hover:backdrop-blur-md transition-all duration-300 flex flex-col items-start justify-between min-w-fit max-w-[20rem] min-h-fit gap-4 border rounded-lg p-3">
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
          </div>
          <div className="flex items-start justify-start gap-2 w-full">
            <ClickableIcon
              className="min-w-fit min-h-fit p-1 bg-blue-300 rounded-md text-blue-700"
              link={"/my/courses/mathematics"}
            >
              <Video size={17} />
            </ClickableIcon>
            <h2 className="text-sm text-muted-foreground">
              {videos + " videos"}
            </h2>
          </div>
          <div className="flex items-start justify-start gap-2 w-full">
            <ClickableIcon
              className="min-w-fit min-h-fit p-1 bg-blue-300 rounded-md text-blue-700"
              link={"/my/courses/mathematics"}
            >
              <BookOpen size={17} />
            </ClickableIcon>
            <h2 className="text-sm text-muted-foreground">
              {quizzes + " quizzes"}
            </h2>
          </div>
          
          {/* <div className="flex items-start justify-start gap-2 w-full">
            <ClickableIcon
              className="min-w-fit min-h-fit p-1 bg-blue-300 rounded-md text-blue-700"
              link={"/my/courses/mathematics"}
            >
              <BookOpen size={17} />
            </ClickableIcon>
            <h2 className="text-sm text-muted-foreground">
              {quizzes + " quizzes"}
            </h2>
          </div> */}
          <div className="border border-green-900 absolute bottom-3 right-3 bg-green-500 text-white p-1 rounded-full">
            <Check size={18} strokeWidth={2} />
          </div>
        </div>
      </div>
    </Link>
  );
};
