import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";

const font = localFont({
  src: "./fonts/Karla-Regular.ttf",
  variable: "--font-geist-sans",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Student App",
  description: "The UPSS student app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        {/* <ClerkProvider> */}
          {" "}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        {/* </ClerkProvider> */}
      </body>
    </html>
  );
}
