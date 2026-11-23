"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

// returns an error message, or "" when the password is fine
const validatePassword = (password: string) => {
  if (password.length < 6) return "Password must be at least 6 characters";
  if (!/[A-Z]/.test(password)) return "Password must have an uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must have a lowercase letter";
  return "";
};

export default function RegisterPage() {
  const router = useRouter();
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSignUp = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      image: string;
      email: string;
      password: string;
    };

    const invalid = validatePassword(user.password);
    setPasswordError(invalid);
    if (invalid) {
      toast.error(invalid);
      return;
    }

    setLoading(true);
    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.image || undefined,
    });

    if (error || !data) {
      setLoading(false);
      toast.error(error?.message || "Registration failed");
      return;
    }

    // the button stays busy until the login page opens
    toast.success("Account created. Please login.");
    router.push("/login");
  };

  return (
    <main className="mx-auto my-12 w-full max-w-md px-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>Create your StudioSpace account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSignUp}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                />
              </Field>
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
                <FieldLabel htmlFor="image">Photo URL</FieldLabel>
                <Input
                  id="image"
                  type="url"
                  name="image"
                  placeholder="https://example.com/photo.jpg"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  aria-invalid={passwordError ? true : undefined}
                  required
                />
                {passwordError ? (
                  <p role="alert" className="text-sm text-destructive">
                    {passwordError}
                  </p>
                ) : (
                  <FieldDescription>
                    At least 6 characters with an uppercase and a lowercase
                    letter.
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Button type="submit" size="lg" disabled={loading}>
                  {loading ? "Creating account..." : "Register"}
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <GoogleLoginButton />
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
