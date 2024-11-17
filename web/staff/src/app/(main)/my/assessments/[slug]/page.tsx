import { Button } from "@/components/ui/button";

import React from "react";

const Page = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      Time to take your {params.slug}{" "}
    </div>
  );
};

export default Page;
