import React from "react";

import { SignIn } from "./_sign-in";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-[2rem]">
      <h2 className="font-bold text-xl">
        University Preparatory Secondary School
      </h2>
      <SignIn/>
    </div>
  );
};

export default Page;
