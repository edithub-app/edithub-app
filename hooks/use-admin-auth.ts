'use client';

import { useCallback, useEffect, useState } from 'react';
import { isAdminAuthed, adminSignIn, adminSignOut } from '@/lib/admin';

export function useAdminAuth() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsAuthed(isAdminAuthed());
    setLoading(false);
  }, []);

  const signIn = useCallback((password: string) => {
    const ok = adminSignIn(password);
    if (ok) setIsAuthed(true);
    return ok;
  }, []);

  const signOut = useCallback(() => {
    adminSignOut();
    setIsAuthed(false);
  }, []);

  return { isAuthed, loading, signIn, signOut };
}
