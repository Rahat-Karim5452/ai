"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { GoogleLoginButton } from "@/components/google-login-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  // the page the user wanted before we sent them here (must be inside our site)
  const redirectParam = searchParams.get("redirect") ?? "/";
  const redirectTo =
    redirectParam.startsWith("/") && !redirectParam.startsWith("//")
      ? redirectParam
      : "/";

  const handleEmailLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    setLoading(true);
    const { data, error } = await authClient.signIn.email({
      ...user,
    });

    if (error || !data) {
      setLoading(false);
      toast.error(error?.message || "Invalid email or password");
      return;
    }

    // the button stays busy until the next page opens
    toast.success("Logged in successfully");
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Welcome back to StudioSpace</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleEmailLogin}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </Field>
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <button
                  type="button"
                  onClick={() =>
                    toast.info("Password reset is not available right now.")
                  }
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <Input id="password" name="password" type="password" required />
            </Field>
            <Field>
              <Button type="submit" size="lg" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Field>
            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
              Or continue with
            </FieldSeparator>
            <Field>
              <GoogleLoginButton callbackURL={redirectTo} />
              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <Link href="/register">Register</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <main className="mx-auto my-12 w-full max-w-md px-6">
      {/* useSearchParams needs a Suspense boundary */}
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
