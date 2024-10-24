import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/dashboard/navbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { School } from "lucide-react";
import { redirect } from "next/navigation";

const Page = async () => {
  // const user = await currentUser();

  // if (!user)
  //   return (
  //     <div className="flex items-center justify-center w-screen h-screen">
  //       {redirect("/sign-in")}
  //     </div>
    // );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar/>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Card className="p-[2rem] aspect-video rounded-xl bg-chart-3 dark:bg-chart-2">
              <div className="bg-primary min-w-fit min-h-fit p-1 rounded-full">
                <School/>
              </div>
            </Card>
            <Card className="aspect-video rounded-xl bg-chart-1 dark:bg-chart-1" />
            <Card className="aspect-video rounded-xl bg-chart-2 dark:bg-chart-4" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Page;
