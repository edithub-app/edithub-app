'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Film } from 'lucide-react';
import { mockScenepacks, formatCount } from '@/lib/mock-data';

export default function FeaturedScenepacks() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const packs = mockScenepacks;

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-6 bg-secondary/30">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Film className="w-4 h-4 text-accent" />
              <span className="text-[13px] font-medium text-accent">
                Free Scenepacks
              </span>
            </div>
            <h2 className="text-[28px] font-semibold tracking-tight">
              Featured Scenepacks
            </h2>
            <p className="mt-1.5 text-[15px] text-muted-foreground">
              Clip packs from your favourite movies and shows. Free to download.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-card transition-colors duration-200"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-card transition-colors duration-200"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scroll-smooth snap-x"
          style={{ scrollbarWidth: 'none' }}
        >
          {packs.map((pack) => (
            <Link
              key={pack.id}
              href={`/scenepacks/${pack.id}`}
              className="group flex-none w-[280px] snap-start"
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-border/60 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-0.5">
                {pack.thumbnail_url ? (
                  <img
                    src={pack.thumbnail_url}
                    alt={pack.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/15 backdrop-blur-md text-white border border-white/20">
                    {pack.clip_count} clips
                  </span>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <p className="text-[11px] uppercase tracking-wider font-medium text-white/70">
                    {pack.source_title}
                  </p>
                  <h3 className="text-[16px] font-semibold text-white mt-0.5 leading-tight">
                    {pack.title}
                  </h3>
                  <p className="text-[13px] text-white/60 mt-1">
                    {formatCount(pack.download_count)} downloads
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Browse all link */}
        <div className="mt-6">
          <Link
            href="/scenepacks"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Browse all scenepacks
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
