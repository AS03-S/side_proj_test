"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("demo@migradocs.app");
  const [password, setPassword] = useState("password");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 800));
    try {
      login(email, password);
      router.push("/dashboard");
    } catch {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex flex-col items-center gap-1">
            <span
              className="logo-wordmark"
              style={{ fontSize: "2rem", color: "#0d1b2e", lineHeight: 1 }}
            >
              migraDOCS
            </span>
          </Link>
          <p className="mt-2 text-xs text-neutral-500">Immigration document intelligence</p>
        </div>

        {/* Card */}
        <div className="rounded-lg border border-neutral-200 bg-white p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          {/* Tab toggle */}
          <div className="mb-6 flex rounded border border-neutral-200 p-0.5">
            <button
              onClick={() => setMode("signin")}
              className={`flex-1 rounded py-1.5 text-xs font-medium transition-colors ${
                mode === "signin"
                  ? "bg-navy text-white"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              Sign in
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 rounded py-1.5 text-xs font-medium transition-colors ${
                mode === "signup"
                  ? "bg-navy text-white"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              Create account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="mb-1.5 block text-xs font-medium text-neutral-700">Full name</label>
                <Input placeholder="A. Meier" />
              </div>
            )}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-neutral-700">Email address</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-neutral-700">Password</label>
              <div className="relative">
                <Input
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPw ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {error && <p className="text-xs text-danger">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  {mode === "signin" ? "Signing in…" : "Creating account…"}
                </span>
              ) : mode === "signin" ? (
                "Sign in"
              ) : (
                "Create account"
              )}
            </Button>
          </form>

          {mode === "signin" && (
            <div className="mt-4 text-center">
              <button className="text-xs text-neutral-500 transition-colors hover:text-neutral-900">
                Forgot your password?
              </button>
            </div>
          )}
        </div>

        {/* Demo notice */}
        <div className="mt-4 rounded border border-neutral-200 bg-neutral-50 px-4 py-3 text-center">
          <p className="text-xs text-neutral-500">
            <strong className="text-neutral-700">Demo mode:</strong> Use any email and password to sign in.
          </p>
        </div>

        <p className="mt-6 text-center text-[10px] leading-relaxed text-neutral-400">
          migraDOCS provides document organisation and information only. This is not legal advice.
          By signing in you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
