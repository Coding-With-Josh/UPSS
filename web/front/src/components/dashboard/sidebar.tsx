"use client";

import * as React from "react";
import { GalleryVerticalEnd, Minus, Plus, SidebarIcon } from "lucide-react";

import { SearchForm } from "@/components/search-form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
  import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const data = {
  navMain: [
    {
      title: "Personal",
      url: "/my",
      items: [
        {
          title: "Messages",
          url: "/my/messages",
        },
        {
          title: "Blogs",
          url: "/my/blogs",
        },
      ],
    },
    {
      title: "Courses",
      url: "/my/courses",
      items: [
        {
          title: "All Courses",
          url: "/my/courses",
        },
        {
          title: "Mathematics",
          url: "/my/courses/mathematics-ss-one",
        },
        {
          title: "NEIE",
          url: "/my/courses/neie-ss-one",
        },
        {
          title: "Vocabulary Building",
          url: "/my/courses/vocabulary-building-ss-one",
        },
        {
          title: "Essentials In Writing",
          url: "/my/courses/essentials-in-writing-ss-one",
        },
        {
          title: "Critical Thinking",
          url: "/my/courses/critical-thinking-ss-one",
        },
        {
          title: "Economics",
          url: "/my/courses/economics-ss-one",
        },
        {
          title: "Chemistry",
          url: "/my/courses/chemistry-ss-one",
        },
        {
          title: "Biology",
          url: "/my/courses/biology-ss-one",
        },
        {
          title: "Physics",
          url: "/my/courses/physics-ss-one",
        },
        {
          title: "Civic",
          url: "/my/courses/civic-ss-one",
        },
        {
          title: "Government",
          url: "/my/courses/government-ss-one",
        },
        {
          title: "Auto Mechanics",
          url: "/my/courses/auto-mechanics-ss-one",
        },
        {
          title: "Fisheries",
          url: "/my/courses/fisheries-ss-one",
        },
        {
          title: "Accounting",
          url: "/my/courses/accounting-ss-one",
        },
        {
          title: "Clothing and Textile",
          url: "/my/courses/clothing-textile-ss-one",
        },
        {
          title: "Photography",
          url: "/my/courses/photography-ss-one",
        },
        {
          title: "Cosmetology",
          url: "/my/courses/cosmetology-ss-one",
        },
      ],
    },
    {
      title: "Assessment",
      url: "/my/assessments",
      items: [
        {
          title: "Holiday Assignment",
          url: "/my/assessments/holiday-assignment-ss-one",
        },
        {
          title: "First Test",
          url: "/my/assessments/first-test-ss-one",
        },
        {
          title: "Second Test",
          url: "/my/assessments/second-test-ss-one",
        },
        {
          title: "Examination",
          url: "/my/assessments/examination",
        },
        {
          title: "Mock",
          url: "/my/assessments/mock-ss-three",
        },
      ],
    },
    {
      title: "Calendar",
      url: "/my/calendar",
      items: [
        {
          title: "Add task",
          url: "/my/tasks",
        },
        {
          title: "Upcoming",
          url: "#",
        },
        {
          title: "Due dates",
          url: "#",
        },
      ],
    },
    {
      title: "Tasks",
      url: "/my/tasks",
      items: [
        {
          title: "Add task",
          url: "/my/tasks",
        },
        {
          title: "Course schedules",
          url: "/my/tasks",
        },
        {
          title: "View Tasks",
          url: "/my/tasks",
        },
      ],
    },
  ],
};

interface ClientSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    id: any,
    username: any,
    email: any,
    firstName: any,
    lastName: any,
    name: any,
    imageUrl: any,
    role: any,
    gender: any,
    class: any,
    arm: any,
    status: any,
  };
}

export async function ClientSidebar({ user }: ClientSidebarProps) {
  const pathname = usePathname();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={user ? "/my" : "http://upss.vercel.app/sign-in"}>
                <div className="flex size-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
                  <Image
                    src={require("@/assets/images/avatars/avatar1.png")}
                    alt="User"
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">
                    {user?.name ? user.name : !user?.name ? "Student" : "Guest"}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {user?.email
                      ? user.email
                      : !user?.email
                      ? "guest@upsshub.com"
                      : "Sign in"}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/">
                <SidebarMenuButton
                  isActive={pathname === "" || "/" ? true : false}
                >
                  Home
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            {data.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 1}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{" "}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={
                                pathname.startsWith(item.url) ? true : false
                              }
                            >
                              <Link href={item.url}>{item.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
            <SidebarMenuItem>
              <Link href="/settings">
                <SidebarMenuButton
                  isActive={
                    pathname === "/settings" || pathname.startsWith("/settings")
                      ? true
                      : false
                  }
                >
                  Settings
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
