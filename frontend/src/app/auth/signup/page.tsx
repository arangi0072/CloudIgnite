"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AuthFormShell } from "@/components/auth/auth-form-shell";
import GithubIcon from "@/components/icons/github";
import GoogleIcon from "@/components/icons/google";

const signupSchema = z
  .object({
    fullName: z.string().min(1, { message: "Full name is required." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    company: z.string().optional(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one symbol." }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and privacy policy.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const password = form.watch("password");

  const passwordChecks = [
    {
      check: password.length >= 8,
      label: "8+ characters",
    },
    {
      check: /[0-9]/.test(password),
      label: "Number",
    },
    {
      check: /[^a-zA-Z0-9]/.test(password),
      label: "Symbol",
    },
  ];

  const onSubmit = async (values: SignupFormValues) => {
    console.log("Submitting...", values);

    try {
      setIsLoading(true);

      const response = await fetch(
        "https://api.cloudignite.in/v1/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: values.fullName,
            email: values.email,
            company: values.company || "",
            password: values.password,
          }),
        }
      );

      // VERY IMPORTANT → shows real error if API fails
      const data = await response.text();
      console.log("API RESPONSE:", data);

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      alert("Signup successful 🚀");

      // Optional redirect
      window.location.href = "/verify-email";

    } catch (error) {
      console.error("NETWORK ERROR:", error);
      alert("Cannot connect to API. Check console.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <AuthFormShell title="Start Building in Minutes">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} className="bg-input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Company Name <span className="text-muted-foreground">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Inc." {...field} className="bg-input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    {...field}
                    className="bg-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
                      className="bg-input pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
                      className="bg-input pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {password && (
            <div className="grid grid-cols-3 gap-x-4 gap-y-2 text-xs">
              {passwordChecks.map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  {item.check ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <X className="h-4 w-4 text-red-400" />
                  )}
                  <span
                    className={
                      item.check ? "text-muted-foreground" : "text-foreground"
                    }
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <Label className="text-sm font-normal">
                    I agree to the{" "}
                    <Link href="/terms" target="_blank" className="text-primary hover:underline">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" target="_blank" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </Label>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">No credit card required.</p>


          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full bg-input">
              <GithubIcon className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline" className="w-full bg-input">
              <GoogleIcon className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </form>
      </Form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-medium text-primary hover:underline">
          Log in
        </Link>
      </p>
    </AuthFormShell>
  );
}
