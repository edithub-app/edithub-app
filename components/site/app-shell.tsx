'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/site/navbar';
import { useAdminAuth } from '@/hooks/use-admin-auth';

export default function AppShell({
  children,
  showNav = true,
}: {
  children: React.ReactNode;
  showNav?: boolean;
}) {
  const router = useRouter();
  const { isAuthed, loading } = useAdminAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !isAuthed) {
      router.replace('/signin');
    }
  }, [mounted, loading, isAuthed, router]);

  if (!mounted || loading || !isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-foreground/20 border-t-foreground animate-spin" />
      </div>
    );
  }

  return (
    <>
      {showNav && <Navbar />}
      <main className="pt-16">{children}</main>
    </>
  );
}
