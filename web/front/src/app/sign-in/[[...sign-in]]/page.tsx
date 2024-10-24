import { SignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import React from "react";

const Page = async () => {
  // const user = await currentUser();

  // if (user)
  //   return (
  //     <div className="flex items-center justify-center w-screen h-screen">
  //       {redirect("/sign-in")}
  //     </div>
  //   );
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-[2rem]">
      <h2 className="font-bold text-xl">
        University Preparatory Secondary School
      </h2>
      {/* <SignIn fallbackRedirectUrl="/" /> */}
    </div>
  );
};

export default Page;
