import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/dashboard/navbar";
import { Loader } from "@/components/reusable/loader";

const font = localFont({
  src: "./fonts/Karla-Regular.ttf",
  variable: "--font-geist-sans",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Teacher App",
  description: "The UPSS teacher app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        {/* <ClerkProvider> */}{" "}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Loader/>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <Navbar />
              {children}
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
        {/* </ClerkProvider> */}
      </body>
    </html>
  );
}
