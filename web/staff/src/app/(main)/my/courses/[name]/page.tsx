import React from "react";

const Page = ({ params }: { params: { name: string } }) => {
  return <div>Welcome. This subject is named {params.name}</div>;
};

export default Page;
