import { Button } from "@/components/ui/button";

import React from "react";

const Page = async ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      Time to take your {await params.slug}
    </div>
  );
};

export default Page;
