'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockAssets, formatCount } from '@/lib/mock-data';

export default function FeaturedAssets() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const assets = mockAssets.slice(0, 8);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-[28px] font-semibold tracking-tight">
              Featured Assets
            </h2>
            <p className="mt-1.5 text-[15px] text-muted-foreground">
              Free overlays, PNGs, and graphics for your edits.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors duration-200"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors duration-200"
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
          {assets.map((asset) => (
            <Link
              key={asset.id}
              href={`/assets/${asset.id}`}
              className="group flex-none w-[240px] snap-start"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border/60 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-0.5">
                {asset.thumbnail_url ? (
                  <img
                    src={asset.thumbnail_url}
                    alt={asset.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-3.5">
                  <span className="text-[11px] uppercase tracking-wider font-medium text-white/80">
                    {asset.category}
                  </span>
                  <h3 className="text-[15px] font-semibold text-white mt-0.5 leading-tight">
                    {asset.title}
                  </h3>
                  <p className="text-[13px] text-white/60 mt-1">
                    {formatCount(asset.download_count)} downloads
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Browse all link */}
        <div className="mt-6">
          <Link
            href="/assets"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Browse all assets
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
