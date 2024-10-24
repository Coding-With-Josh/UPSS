import * as React from "react";
import { GalleryVerticalEnd, Minus, Plus } from "lucide-react";

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

// This is sample data.
const data = {
  navMain: [
    {
      title: "Personal",
      url: "#",
      items: [
        {
          title: "Messages",
          url: "/messages",
        },
        {
          title: "Blogs",
          url: "/blogs",
        },
      ],
    },
    {
      title: "Courses",
      url: "#",
      items: [
        {
          title: "Mathematics",
          url: "#",
        },
        {
          title: "NEIE",
          url: "#",
          isActive: true,
        },
        {
          title: "Vocabulary Building",
          url: "#",
        },
        {
          title: "Essentials In Writing",
          url: "#",
        },
        {
          title: "Critical Thinking",
          url: "#",
        },
        {
          title: "Economics",
          url: "#",
        },
        {
          title: "Chemistry",
          url: "#",
        },
        {
          title: "Biology",
          url: "#",
        },
        {
          title: "Physics",
          url: "#",
        },
        {
          title: "Civic",
          url: "#",
        },
        {
          title: "Government",
          url: "#",
        },
        {
          title: "Auto Mech",
          url: "#",
        },
        {
          title: "Fisheries",
          url: "#",
        },
        {
          title: "Accounting",
          url: "#",
        },
        {
          title: "Clothing and Textile",
          url: "#",
        },
        {
          title: "Photography",
          url: "#",
        },
        {
          title: "Cosmetology",
          url: "#",
        },
      ],
    },
    {
      title: "Assessment",
      url: "#",
      items: [
        {
          title: "Holiday Assignment",
          url: "#",
        },
        {
          title: "First Test",
          url: "#",
        },
        {
          title: "Second Test",
          url: "#",
        },
        {
          title: "Examination",
          url: "#",
        },
        {
          title: "Mock",
          url: "#",
        },
      ],
    },
    {
      title: "Architecture",
      url: "#",
      items: [
        {
          title: "Accessibility",
          url: "#",
        },
        {
          title: "Fast Refresh",
          url: "#",
        },
        {
          title: "Next.js Compiler",
          url: "#",
        },
        {
          title: "Supported Browsers",
          url: "#",
        },
        {
          title: "Turbopack",
          url: "#",
        },
      ],
    },
    {
      title: "Community",
      url: "#",
      items: [
        {
          title: "Contribution Guide",
          url: "#",
        },
      ],
    },
  ],
};

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const user = await currentUser();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="flex items-center justify-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
                <img src={require("@/assets/images/avatars/avatar1.png")} alt="User" className="rounded-full" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Joshua Idele</span>
                  <span className="text-muted-foreground text-xs">SS 1 Gold</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
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
                              <a href={item.url}>{item.title}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
