'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useRouter, usePathname } from 'next/navigation';
import { LogOut, User, Settings, Download, ChevronDown } from 'lucide-react';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { useTheme } from 'next-themes';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PROFILE } from '@/lib/profile';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { label: 'Home', href: '/home' },
  { label: 'Assets', href: '/assets' },
  { label: 'Presets', href: '/presets' },
  { label: 'Scenepacks', href: '/scenepacks' },
  { label: 'Audios', href: '/audios' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthed, signOut } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSignOut = () => {
    signOut();
    router.push('/');
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? `${theme === 'dark' ? 'glass-dark' : 'glass'} border-b border-border/60`
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 h-16 grid grid-cols-[1fr_auto_1fr] items-center">
        {/* Logo */}
        <Link href={isAuthed ? '/home' : '/'} className="flex items-center gap-2.5 group justify-self-start">
          <div className="relative w-8 h-8 transition-transform duration-300 group-hover:scale-105">
            <Image src="/logo.png" alt="EditHub" width={32} height={32} className="object-contain dark:invert" />
          </div>
        </Link>

        {/* Public library nav */}
        <div className="hidden md:flex items-center justify-center gap-1 justify-self-center">
            {navLinks.filter((link) => isAuthed || link.href !== '/home').map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 text-[14px] font-medium rounded-lg transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-foreground bg-secondary/50'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 justify-self-end">
          {isAuthed ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-secondary/60 transition-colors duration-200">
                  <Avatar className="w-8 h-8 border border-border/60">
                    <AvatarImage
                      src={PROFILE.avatarUrl}
                      alt={PROFILE.name}
                    />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={PROFILE.avatarUrl}
                      alt={PROFILE.name}
                    />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold truncate">{PROFILE.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{PROFILE.handle}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account" className="flex items-center gap-2 cursor-pointer">
                    <Download className="w-4 h-4" />
                    Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 cursor-pointer text-destructive">
                  <LogOut className="w-4 h-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href="/signin"
                className="hidden sm:inline-flex px-4 py-2 text-[14px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Sign in
              </Link>
              <Link
                href="/signin?mode=signup"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-[14px] font-medium bg-foreground text-background rounded-xl hover:bg-foreground/90 transition-all duration-200 active:scale-[0.97]"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
