'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useRef } from 'react';
import { ArrowRight, Sparkles, Clock, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import Navbar from '@/components/site/navbar';
import CreatorCard from '@/components/site/creator-card';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { mockScenepacks, mockAssets, mockPresets, mockAudios } from '@/lib/mock-data';
import { CREATOR_PROFILES } from '@/lib/profile';

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

function timeAgo(iso: string): string {
  const days = Math.floor(
    (Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24)
  );
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export default function HomePage() {
  const router = useRouter();
  const { isAuthed, loading } = useAdminAuth();
  const [mounted, setMounted] = useState(false);
  const [creatorQuery, setCreatorQuery] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const recentlyViewed = [
    ...mockScenepacks.map((s) => ({
      id: s.id,
      title: s.title,
      thumbnail_url: s.thumbnail_url,
      href: `/scenepacks/${s.id}`,
      badge: 'Scenepack',
      meta: timeAgo(s.created_at),
      created_at: s.created_at,
    })),
    ...mockAssets.map((a) => ({
      id: `a-${a.id}`,
      title: a.title,
      thumbnail_url: a.thumbnail_url,
      href: `/assets/${a.id}`,
      badge: 'Asset',
      meta: timeAgo(a.created_at),
      created_at: a.created_at,
    })),
    ...mockPresets.map((p) => ({
      id: `p-${p.id}`,
      title: p.title,
      thumbnail_url: p.thumbnail_url,
      href: `/presets/${p.id}`,
      badge: 'Preset',
      meta: timeAgo(p.created_at),
      created_at: p.created_at,
    })),
    ...mockAudios.map((au) => ({
      id: `au-${au.id}`,
      title: au.title,
      thumbnail_url: au.thumbnail_url,
      href: `/audios/${au.id}`,
      badge: 'Audio',
      meta: timeAgo(au.created_at),
      created_at: au.created_at,
    })),
  ]
    .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
    .slice(0, 10)
    .map((p) => ({
      id: p.id,
      title: p.title,
      thumbnail_url: p.thumbnail_url,
      href: p.href,
      badge: p.badge,
      meta: p.meta,
    }));

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 px-6">
        <div className="mx-auto max-w-6xl">
          {/* Greeting */}
          <div className="mb-10 animate-fade-up">
            <h1 className="text-[26px] font-semibold tracking-tight">
              {greeting()}, Maya
            </h1>
            <p className="mt-1 text-[15px] text-muted-foreground">
              Pick up where you left off.
            </p>
          </div>

          {/* Recently viewed */}
          <div style={{ animationDelay: '60ms' }} className="animate-fade-up">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  <h2 className="text-[20px] font-semibold tracking-tight">
                    Continue browsing
                  </h2>
                </div>
                <p className="mt-1 text-[13px] text-muted-foreground">Recently viewed</p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/assets"
                  className="hidden sm:inline-flex group items-center gap-1.5 text-[13px] font-medium text-accent hover:underline"
                >
                  Explore library
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                {recentlyViewed.length > 0 && (
                  <>
                    <button
                      onClick={() => scroll('left')}
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors duration-200"
                      aria-label="Scroll left"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => scroll('right')}
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors duration-200"
                      aria-label="Scroll right"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
            {recentlyViewed.length > 0 ? (
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-2 scroll-smooth snap-x scrollbar-none"
              >
                {recentlyViewed.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="group flex-none snap-start"
                    style={{ width: 260 }}
                  >
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-border/60 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5">
                      <img
                        src={item.thumbnail_url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      {item.badge && (
                        <div className="absolute top-2.5 left-2.5">
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/15 backdrop-blur-md text-white border border-white/20">
                            {item.badge}
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-0 inset-x-0 p-3">
                        <h3 className="text-[14px] font-semibold text-white leading-tight line-clamp-1">
                          {item.title}
                        </h3>
                        {item.meta && (
                          <p className="text-[12px] text-white/60 mt-0.5">{item.meta}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center rounded-2xl border border-dashed border-border/60">
                <Sparkles className="w-7 h-7 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-[15px] text-muted-foreground">
                  Nothing yet. Browse some scenepacks or assets and they&apos;ll show up here.
                </p>
                <Link
                  href="/scenepacks"
                  className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent hover:underline"
                >
                  Start exploring
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Creator directory */}
          <section className="mt-14 animate-fade-up" style={{ animationDelay: '140ms' }}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-[20px] font-semibold tracking-tight">Suggested creators</h2>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  Find fresh inspiration from the EditHub community.
                </p>
              </div>
              <label className="relative block w-full sm:w-64">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <span className="sr-only">Search profiles</span>
                <input
                  value={creatorQuery}
                  onChange={(event) => setCreatorQuery(event.target.value)}
                  placeholder="Search profiles"
                  className="h-10 w-full rounded-xl border border-border/70 bg-background pl-9 pr-3 text-[13px] outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground/40"
                />
              </label>
            </div>

            {(() => {
              const query = creatorQuery.trim().toLowerCase();
              const creators = CREATOR_PROFILES.filter((creator) => creator.id !== 'maya').filter(
                (creator) =>
                  !query || [creator.name, creator.handle, creator.bio].some((value) =>
                    value.toLowerCase().includes(query)
                  )
              );

              if (creators.length === 0) {
                return (
                  <div className="mt-6 rounded-2xl border border-dashed border-border/70 px-6 py-12 text-center">
                    <p className="text-[14px] font-medium">No profiles found</p>
                    <p className="mt-1 text-[13px] text-muted-foreground">
                      Try a different name or username.
                    </p>
                  </div>
                );
              }

              return (
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {creators.map((creator) => (
                    <CreatorCard key={creator.id} creator={creator} />
                  ))}
                </div>
              );
            })()}
          </section>
        </div>
      </main>
    </>
  );
}
