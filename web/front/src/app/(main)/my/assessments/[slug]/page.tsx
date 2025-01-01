import { validateRequest } from "@/lib/lucia";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

import React from "react";

export default async function AssessmentPage({ params }: { params: { slug: string } }) {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Assessment: {params.slug}</h1>
      <div className="mt-4">
        <Button>Start Assessment</Button>
      </div>
    </div>
  );
}
