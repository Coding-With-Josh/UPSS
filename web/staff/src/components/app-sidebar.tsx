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
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

// This is sample data.
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

          isActive: true,
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
          url: "#",

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
          url: "#",

        },
        {
          title: "Course schedules",
          url: "#",

        },
        {
          title: "View Tasks",
          url: "#",

        },
      ],
    },
  ],
};

const settings = [
  {
    title: "Settings",
    url: "/settings",
  },
];

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  // const user = await currentUser();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/my">
                <div className="flex size-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
                  <Image
                    src={require("@/assets/images/avatars/avatar1.png")}
                    alt="User"
                    className="rounded-full"
                  />          
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Joshua Idele</span>
                  <span className="text-muted-foreground text-xs">
                    SS 1 Gold
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
              <SidebarMenuButton>
                <Link href="/">Home</Link>
              </SidebarMenuButton>
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
                              isActive={item.isActive}
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
              <SidebarMenuButton>Settings</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
