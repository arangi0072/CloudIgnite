"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MailCheck, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AuthFormShell } from "@/components/auth/auth-form-shell";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ForgotPasswordFormValues) => {
    setIsLoading(true);
    console.log(values);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <AuthFormShell title="Check your inbox">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <MailCheck className="h-12 w-12 text-green-400" />
          </div>
          <p className="text-muted-foreground">
            A password reset link has been sent to your email address.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            If an account exists with that email, you'll receive instructions.
          </p>
          <Button variant="ghost" asChild className="mt-6">
            <Link href="/auth/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to log in
            </Link>
          </Button>
        </div>
      </AuthFormShell>
    );
  }

  return (
    <AuthFormShell title="Reset Your Password">
      <p className="text-center text-sm text-muted-foreground mb-6">
        Enter your email and we&apos;ll send you a reset link.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                    className="bg-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </Form>
      <Button variant="ghost" asChild className="mt-6 w-full">
        <Link href="/auth/login">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to log in
        </Link>
      </Button>
    </AuthFormShell>
  );
}
