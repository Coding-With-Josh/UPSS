"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { SignUpSchema } from "../../../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { signUp } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SignUpFormValues = z.infer<typeof SignUpSchema>;

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      role: "STUDENT",
      gender: "MALE",
      class: "JSS1",
      arm: "Silver",
    },
  });

  async function onSubmit(values: SignUpFormValues) {
    try {
      setIsLoading(true);

      if (values.password !== values.confirmPassword) {
        toast({
          variant: "destructive",
          description: "Passwords do not match",
        });
        return;
      }

      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      
      if (!res.ok) {
        toast({
          variant: "destructive",
          description: "error",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Account created successfully",
      });

      router.push("/sign-in");
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter the details below to create to an account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              {...form.register("firstName")}
              id="firstName"
              placeholder="John"
              className={cn(
                form.formState.errors.firstName && "border-red-500"
              )}
            />
            {form.formState.errors.firstName && (
              <p className="text-xs text-red-500">
                {form.formState.errors.firstName.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              {...form.register("lastName")}
              id="lastName"
              placeholder="Doe"
              className={cn(form.formState.errors.lastName && "border-red-500")}
            />
            {form.formState.errors.lastName && (
              <p className="text-xs text-red-500">
                {form.formState.errors.lastName.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...form.register("email")}
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              className={cn(form.formState.errors.email && "border-red-500")}
            />
            {form.formState.errors.email && (
              <p className="text-xs text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              {...form.register("username")}
              id="username"
              autoComplete="username"
              placeholder="johndoe"
              className={cn(form.formState.errors.username && "border-red-500")}
            />
            {form.formState.errors.username && (
              <p className="text-xs text-red-500">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label>Class</Label>
            <Select
              onValueChange={(value) => form.setValue("class", value as any)}
              defaultValue={form.getValues("class")}
            >
              <SelectTrigger
                className={cn(form.formState.errors.class && "border-red-500")}
              >
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"].map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.class && (
              <p className="text-xs text-red-500">
                {form.formState.errors.class.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label>Arm</Label>
            <Select
              onValueChange={(value) => form.setValue("arm", value as any)}
              defaultValue={form.getValues("arm")}
            >
              <SelectTrigger
                className={cn(form.formState.errors.arm && "border-red-500")}
              >
                <SelectValue placeholder="Select arm" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Silver",
                  "Gold",
                  "Platinum",
                  "Copper",
                  "Mecury",
                  "Diamond",
                  "Titanium",
                  "Silicon",
                ].map((arm) => (
                  <SelectItem key={arm} value={arm}>
                    {arm}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.arm && (
              <p className="text-xs text-red-500">
                {form.formState.errors.arm.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label>Role</Label>
            <Select
              onValueChange={(value) => form.setValue("role", value as any)}
              defaultValue={form.getValues("role")}
            >
              <SelectTrigger
                className={cn(form.formState.errors.role && "border-red-500")}
              >
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {["STUDENT", "TEACHER", "ADMIN"].map((role) => (
                  <SelectItem key={role} value={role}>
                    {role.toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.role && (
              <p className="text-xs text-red-500">
                {form.formState.errors.role.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label>Gender</Label>
            <Select
              onValueChange={(value) => form.setValue("gender", value as any)}
              defaultValue={form.getValues("gender")}
            >
              <SelectTrigger
                className={cn(form.formState.errors.gender && "border-red-500")}
              >
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                {["MALE", "FEMALE", "OTHER"].map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {gender.toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.gender && (
              <p className="text-xs text-red-500">
                {form.formState.errors.gender.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            {...form.register("password")}
            id="password"
            type="password"
            className={cn(form.formState.errors.password && "border-red-500")}
          />
          {form.formState.errors.password && (
            <p className="text-xs text-red-500">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            {...form.register("confirmPassword")}
            id="confirmPassword"
            type="password"
            className={cn(
              form.formState.errors.confirmPassword && "border-red-500"
            )}
          />
          {form.formState.errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || form.formState.isSubmitting}
        >
          {isLoading ? (
            <>
              <span className="mr-2">Creating account...</span>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent" />
            </>
          ) : (
            "Create account"
          )}
        </Button>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </form>
  );
}
