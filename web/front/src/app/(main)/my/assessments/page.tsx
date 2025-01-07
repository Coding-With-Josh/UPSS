"use client"

import { Button } from "@/components/ui/button";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
    const router = useRouter();
  
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
    <>
      <div>Assessments</div>
      <Link href="/my/assessments/first-test">
        <Button>Go to First Test</Button>
      </Link>
      <Link href="/my/assessments/second-test">
        <Button>Go to Second Test</Button>
      </Link>
      <Link href="/my/assessments/examination">
        <Button>Go to Examination</Button>
      </Link>
    </>
  );
};

export default Page;
