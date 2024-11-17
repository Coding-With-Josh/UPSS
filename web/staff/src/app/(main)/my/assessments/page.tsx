import { Button } from "@/components/ui/button";

import Link from "next/link";
import React from "react";

const Page = () => {
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
