'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAdminAuth } from '@/hooks/use-admin-auth';

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useAdminAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const ok = signIn(password);
    if (ok) {
      router.push('/home');
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-background">
      {/* Soft ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[600px] h-[400px] rounded-full opacity-[0.05] blur-[120px] bg-accent" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 animate-fade-up">
          <Link href="/" className="flex items-center gap-2.5 mb-8">
            <div className="relative w-9 h-9">
              <Image src="/logo.png" alt="EditHub" width={36} height={36} className="object-contain dark:invert" />
            </div>
            <span className="text-[18px] font-semibold tracking-tight">EditHub</span>
          </Link>

          <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-4">
            <Lock className="w-5 h-5 text-muted-foreground" />
          </div>
          <h1 className="text-[22px] font-semibold tracking-tight">Admin access</h1>
          <p className="mt-1.5 text-[14px] text-muted-foreground text-center max-w-[260px]">
            This is a private prototype. Enter the password to continue.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="animate-fade-up"
          style={{ animationDelay: '80ms' }}
        >
          <div className="space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Password"
              autoFocus
              className={`w-full h-12 px-4 text-[15px] rounded-xl bg-secondary/60 border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-foreground/10 ${
                error
                  ? 'border-destructive/50 focus:ring-destructive/20'
                  : 'border-border/60 focus:border-foreground/20'
              }`}
            />

            {error && (
              <p className="text-[13px] text-destructive px-1">
                Incorrect password. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full h-12 inline-flex items-center justify-center gap-2 text-[15px] font-medium bg-foreground text-background rounded-xl hover:bg-foreground/90 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in…' : 'Enter'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </form>

        {/* Footer note */}
        <div
          className="mt-8 flex items-center justify-center gap-2 text-[12px] text-muted-foreground/60 animate-fade-in"
          style={{ animationDelay: '200ms' }}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Admin-only · No public sign up</span>
        </div>
      </div>
    </main>
  );
}
