import { Button } from "@/components/ui/button";
import { SignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { redirect } from "next/navigation";

import React from "react";

const Page = async () => {


  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-[2rem]">
      <h2 className="font-bold text-xl">
        University Preparatory Secondary School
      </h2>
      <LoginLink>
        <Button>
          Login to your account
        </Button>
      </LoginLink>
    </div>
  );
};

export default Page;
