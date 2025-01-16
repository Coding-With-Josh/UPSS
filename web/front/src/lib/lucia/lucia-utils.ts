import { Lucia } from "lucia";
import { adapter } from "./adapter";
import { prisma } from "@/lib/db";

// Add custom type for extended user response
export type DatabaseUserAttributes = {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  name: string | null;
  imageUrl: string | null;
  role: "ADMIN" | "TEACHER" | "STUDENT";
  gender: "MALE" | "FEMALE" | "OTHER" | null;
  class: "JSS1" | "JSS2" | "JSS3" | "SS1" | "SS2" | "SS3";
  arm: "Silver" | "Gold" | "Platinum" | "Copper" | "Mecury" | "Diamond" | "Titanium" | "Silicon";
  status: "ACTIVE" | "INACTIVE" | "EXPELLED";
};

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

// Declare module augmentation for lucia
declare module "lucia" {
  interface DatabaseUserAttributes {}
}
