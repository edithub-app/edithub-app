'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useRouter, usePathname } from 'next/navigation';
import {
  LogOut,
  User,
  Settings,
  Download,
  ChevronDown,
  ClipboardList,
  Store,
  Bell,
  Menu,
  Image as ImageIcon,
  SlidersHorizontal,
  Film,
  Music2,
} from 'lucide-react';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { useTheme } from 'next-themes';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PROFILE } from '@/lib/profile';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
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

const mobileNavLinks = [
  { label: 'Assets', href: '/assets', icon: ImageIcon },
  { label: 'Presets', href: '/presets', icon: SlidersHorizontal },
  { label: 'Scenepacks', href: '/scenepacks', icon: Film },
  { label: 'Audios', href: '/audios', icon: Music2 },
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
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href={isAuthed ? '/home' : '/'} className="group flex shrink-0 items-center gap-2.5">
          <div className="relative w-8 h-8 transition-transform duration-300 group-hover:scale-105">
            <Image src="/logo.png" alt="EditHub" width={32} height={32} className="object-contain dark:invert" />
          </div>
        </Link>

        {/* Public library nav */}
        <div className="hidden items-center justify-center gap-1 md:flex">
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
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open navigation menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground md:hidden"
              >
                <Menu className="h-[18px] w-[18px]" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(88vw,22rem)] bg-background px-6 pt-16">
              <SheetHeader className="mb-7 space-y-1 text-left">
                <SheetTitle className="text-2xl">Browse EditHub</SheetTitle>
                <SheetDescription>Find the tools and inspiration for your next edit.</SheetDescription>
              </SheetHeader>
              <div className="space-y-2">
                {mobileNavLinks.map((link) => {
                  const Icon = link.icon;
                  const active = pathname === link.href;

                  return (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${
                          active
                            ? 'bg-secondary text-foreground'
                            : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {link.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>

          {isAuthed ? (
            <>
              <Link
                href="/notifications"
                aria-label="Notifications"
                className="relative order-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground md:order-none"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
              </Link>
              <div className="order-2 md:order-none">
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
              <DropdownMenuContent align="end" className="w-56 border-black/10 bg-white text-black shadow-xl dark:border-black/10 dark:bg-white dark:text-black">
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
                    <p className="truncate text-[11px] text-black/55">{PROFILE.handle}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-black/10" />
                <DropdownMenuItem asChild className="text-black focus:bg-black/5 focus:text-black">
                  <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-black focus:bg-black/5 focus:text-black">
                  <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="w-4 h-4" />
                    Edit account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-black focus:bg-black/5 focus:text-black">
                  <Link href="/downloads" className="flex items-center gap-2 cursor-pointer">
                    <Download className="w-4 h-4" />
                    Downloads
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-black/10" />
                <DropdownMenuItem
                  asChild
                  className="text-black hover:bg-black/5 focus:bg-black/5 focus:text-black"
                >
                  <Link href="/requests" className="flex items-center gap-2 cursor-pointer">
                    <ClipboardList className="w-4 h-4" />
                    Requests
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="mt-1 text-black hover:bg-black/5 focus:bg-black/5 focus:text-black"
                >
                  <Link href="/seller" className="flex items-center gap-2 cursor-pointer">
                    <Store className="w-4 h-4" />
                    Become a seller
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-black/10" />
                <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700">
                  <LogOut className="w-4 h-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
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
