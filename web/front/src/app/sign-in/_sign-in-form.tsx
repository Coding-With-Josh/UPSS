"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { SignInSchema } from "../../../types"
import { signIn } from "@/actions/auth.actions"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"


type SignInFormValues = z.infer<typeof SignInSchema>

export function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter()
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    const res = await signIn(values)
    if (res.error) {
      toast({
        variant: "destructive",
        description: res.error,
      })
    } else if (res.success) {
      toast({
        variant: "default",
        description: "Signed in successfully",
      })

      router.push("/")
    }
  }

  return (
    <form 
      onSubmit={form.handleSubmit(onSubmit)} 
      className={cn("flex flex-col gap-6", className)} 
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your username below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input 
            {...form.register("username")}
            id="username" 
            type="username" 
            placeholder="johndoe"
            className={cn(form.formState.errors.username && "border-red-500")}
          />
          {form.formState.errors.username && (
            <p className="text-xs text-red-500">
              {form.formState.errors.username.message}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
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
        <Button 
          type="submit" 
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </div>
    </form>
  )
}
