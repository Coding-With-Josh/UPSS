import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  getKindeServerSession,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

const { getUser } = getKindeServerSession();
const user = await getUser();

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {!user && (
        <div className="h-screen w-screen flex items-center justify-center bg-black/30">
          <Card>
            <CardHeader>Login to access your account</CardHeader>
            <CardContent>
              <LoginLink>
                <Button variant="secondary" className="w-full">
                  Login
                </Button>
              </LoginLink>
            </CardContent>
          </Card>
        </div>
      )}
      <div>{children}</div>
    </>
  );
}
