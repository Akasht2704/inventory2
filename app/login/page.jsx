"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function EyeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res.error) {
      setError("Invalid username or password");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(56,189,248,0.22),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[min(100%,48rem)] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl"
        aria-hidden
      />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400/90">Inventory</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Hardware Shop</h1>
          <p className="mt-2 text-sm text-slate-400">Sign in to manage stock and products</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {error && (
            <div
              role="alert"
              className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-200"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="login-username" className="mb-2 block text-sm font-medium text-slate-200">
                Username
              </label>
              <input
                id="login-username"
                type="text"
                autoComplete="username"
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none ring-cyan-500/40 transition placeholder:text-slate-500 focus:border-cyan-500/50 focus:ring-2"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="login-password" className="mb-2 block text-sm font-medium text-slate-200">
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 py-3 pl-4 pr-12 text-white outline-none ring-cyan-500/40 transition placeholder:text-slate-500 focus:border-cyan-500/50 focus:ring-2"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-slate-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:from-cyan-400 hover:to-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Sign in
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">Secure access to your dashboard</p>
      </div>
    </div>
  );
}
