"use client";

import { Separator } from "@/components/ui/separator";
import React from "react";
import { AppSidebar } from "../app-sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { ModeToggle } from "../ui/mode-toggle";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "../ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { Bell, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { signOut } from "@/actions/auth.actions";
import { toast } from "@/hooks/use-toast";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter()

  const logOut = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!res.ok) {
        toast({
          variant: "destructive",
          description: "error",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Logged out successfully",
      });

      router.push("/sign-in");
    } catch (error) {
      console.error("Signout error:", error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
        <div className="flex h-16 shrink-0 items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  {pathname === "/my" || "/"
                    ? "Home"
                    : pathname === "/my/messages"
                    ? "Messages"
                    : pathname === "/my/courses"
                    ? "Courses"
                    : "Home"}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {/* <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem> */}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-4">
          <Button size="icon" variant="ghost">
            <Bell size={18} />
          </Button>
          <ModeToggle />
          <Button size="icon" variant="ghost" onClick={logOut}>
            <LogOut size={18} />
          </Button>
        </div>
      </header>
    </>
  );
};
