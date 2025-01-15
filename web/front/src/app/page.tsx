"use client";

import { GradesTable } from "@/components/dashboard/grades-table";
import { ProgressCard } from "@/components/dashboard/progress-card";

import {
  ArrowUpRightFromSquare,
  Download,
  EllipsisVertical,
  FileQuestion,
  Filter,
  School,
  User2,
} from "lucide-react";

import { CreateTask } from "@/components/dashboard/create-task";
import { ClickableIcon } from "@/components/reusable/clickable-icon";
import { validateRequest } from "@/lib/lucia";
import { redirect } from "next/navigation";

const Page = async () => { 
  const user = validateRequest()
  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <ProgressCard
          bgColor="bg-chart-3"
          darkbgColor="dark:bg-chart-2"
          Title="13 Courses Completed"
          icon={
            <School className="scale-110 hover:scale-[1.20] transition-all text-gray-600 text-sm" />
          }
          dest="my/courses"
          text="courses"
        />
        <ProgressCard
          bgColor="bg-chart-1"
          darkbgColor="dark:bg-chart-1"
          Title="13 Quizes Submited"
          icon={
            <FileQuestion className="scale-110 hover:scale-[1.20] transition-all text-gray-600 text-sm" />
          }
          dest="my/quizzes"
          text="quizzes"
        />
        <ProgressCard
          bgColor="bg-chart-2"
          darkbgColor="dark:bg-chart-4"
          Title="3rd out of 24 students"
          icon={
            <User2 className="scale-110 hover:scale-[1.20] transition-all text-gray-600 text-sm" />
          }
          dest="my/grades"
          text="grades"
        />
      </div>
      <div className="p-5 min-h-fit flex-1 rounded-xl bg-muted dark:bg-muted/70 md:min-h-fit overflow-scroll">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-[2rem] inline-flex items-center justify-between gap-2 w-fit">
            Your Grades{" "}
            <ClickableIcon link="/my/grades">
              <ArrowUpRightFromSquare
                className="text-sm"
                strokeWidth={3}
                size={18}
              />
            </ClickableIcon>
          </h2>
          <div className="flex items-center justify-center gap-2">
            <Filter className="text-sm" strokeWidth={2} size={18} />
            <Download className="text-sm" strokeWidth={2} size={18} />
            <EllipsisVertical className="text-sm" strokeWidth={2} size={18} />
          </div>
        </div>
        <GradesTable />
      </div>
      <div className="p-5 min-w-fit px-5 flex-1 rounded-xl bg-muted/70 md:min-h-fit">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-[2rem] flex items-center justify-center gap-2 w-fit">
          Your Tasks{" "}
          <ClickableIcon link="/my/tasks">
            <ArrowUpRightFromSquare
              className="text-sm"
              strokeWidth={3}
              size={18}
            />
          </ClickableIcon>
        </h2>
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-start justify-center gap-3">
            <h2 className="text-muted-foreground text-sm">
              You have no current tasks. Create one.
            </h2>
            <CreateTask />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
