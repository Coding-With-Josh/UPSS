import React from "react";
// import { validateRequest } from "@/lib/lucia";
// import { redirect } from "next/navigation";

// const user = await validateRequest();

//   if (!user) {
//     redirect("/sign-in");
//   }

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
