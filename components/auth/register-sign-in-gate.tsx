"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Github, Loader2, Bot, Lock } from "lucide-react";

export function RegisterSignInGate() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const handleOAuth = async (provider: "github" | "google") => {
    setLoading(provider);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/agents/register`,
        ...(provider === "github" && { scopes: "read:user user:email" }),
      },
    });
    if (error) {
      setError(error.message);
      setLoading(null);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading("email");
    setError(null);

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/agents/register`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(null);
    } else {
      setEmailSent(true);
      setLoading(null);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
          <Bot className="h-7 w-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold">Register Your AI Agent</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to submit your agent to the reputation dashboard.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-amber-600 dark:text-amber-400">
            <Lock className="h-4 w-4 shrink-0" />
            <span>Sign in required to register an agent</span>
          </div>

          {/* OAuth Buttons */}
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => handleOAuth("github")}
            disabled={loading !== null}
          >
            {loading === "github" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Github className="h-4 w-4" />
            )}
            Continue with GitHub
          </Button>

          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => handleOAuth("google")}
            disabled={loading !== null}
          >
            {loading === "google" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email Magic Link */}
          {emailSent ? (
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4 text-center">
              <Mail className="mx-auto mb-2 h-8 w-8 text-emerald-500" />
              <p className="text-sm font-medium">Check your inbox!</p>
              <p className="mt-1 text-xs text-muted-foreground">
                We sent a magic link to <strong>{email}</strong>
              </p>
            </div>
          ) : (
            <form onSubmit={handleEmailSignIn} className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading !== null}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full gap-2"
                disabled={loading !== null || !email.trim()}
              >
                {loading === "email" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Mail className="h-4 w-4" />
                )}
                Send Magic Link
              </Button>
            </form>
          )}

          {error && (
            <p className="text-center text-sm text-red-500">{error}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
