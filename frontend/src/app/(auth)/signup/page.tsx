"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

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

//////////////////////////////////////////////////////
// AXIOS CLIENT
//////////////////////////////////////////////////////

// const api = axios.create({
//   baseURL: "https://api.cloudignite.in",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
//   timeout: 10000,
// });

//////////////////////////////////////////////////////
// VALIDATION
//////////////////////////////////////////////////////

const signupSchema = z
  .object({
    fullName: z.string().min(1, { message: "Full name is required." }),
    email: z.string().email({ message: "Enter a valid email." }),
    company: z.string().optional(),
    password: z
      .string()
      .min(8, { message: "Minimum 8 characters." })
      .regex(/[0-9]/, { message: "Must include a number." })
      .regex(/[^a-zA-Z0-9]/, { message: "Must include a symbol." }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept Terms & Privacy.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

//////////////////////////////////////////////////////
// COMPONENT
//////////////////////////////////////////////////////

export default function SignupPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onSubmit", // ensures submit fires properly
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

  //////////////////////////////////////////////////////
  // SUBMIT
  //////////////////////////////////////////////////////

  const onSubmit = async (values: SignupFormValues) => {
    console.log("Submitting form...");

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

      // 🔥 VERY IMPORTANT (shows real error)
      const data = await response.text();
      console.log("API RESPONSE:", data);

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      router.push("/verify-email");

    } catch (error) {
      console.error("NETWORK ERROR:", error);
      alert("Cannot connect to API. Check console.");
    } finally {
      setIsLoading(false);
    }
  };


  //////////////////////////////////////////////////////

  return (
    <AuthFormShell title="Start Building in Minutes">
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)(e);
          }}
          className="space-y-4"
        >


          {/* FULL NAME + COMPANY */}
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
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
                    Company (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Inc." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* EMAIL */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@company.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PASSWORD */}
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
                      className="pr-10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* PASSWORD CHECK */}
          {password && (
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { ok: password.length >= 8, label: "8+ chars" },
                { ok: /[0-9]/.test(password), label: "Number" },
                { ok: /[^a-zA-Z0-9]/.test(password), label: "Symbol" },
              ].map((rule, i) => (
                <div key={i} className="flex items-center gap-1">
                  {rule.ok ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                  {rule.label}
                </div>
              ))}
            </div>
          )}

          {/* CONFIRM PASSWORD */}
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
                      className="pr-10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* TERMS — FIXED */}
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2 pt-2">
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <Label className="text-sm font-normal">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary underline">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* SUBMIT */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>

        </form>
      </Form>
    </AuthFormShell>
  );
}
