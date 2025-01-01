import { ArrowUpRightFromSquare, School } from "lucide-react";
import React from "react";
import { Card } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

export const ProgressCard = ({
  bgColor,
  darkbgColor,
  Title,
  subTitle,
  text,
  icon,
  dest,
}: any) => {
  return (
    <Card
      className={`p-[1.5rem] aspect-video rounded-xl ${bgColor} ${darkbgColor} flex flex-col items-start justify-between`}
    >
      <div className="bg-white size-[3.5rem] rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div className="flex flex-col items-start justify-center gap-3">
        <h2 className=" md:text-xl lg:text-xl xl:text-3xl font-semibold text-gray-100">{Title}</h2>
        <Link
          href={"/" + dest}
          className="inline-flex items-center justify-center lg:gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors 
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                   focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
                   [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-white underline-offset-4 hover:underline"
        >
          <span>Go to {text}</span>
          <ArrowUpRightFromSquare size={20} />
        </Link>
      </div>
    </Card>
  );
};
