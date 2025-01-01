"use client";
import {KindeProvider} from "@kinde-oss/kinde-auth-nextjs";
import React from "react";


export default async function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  return <KindeProvider>{children}</KindeProvider>;
};