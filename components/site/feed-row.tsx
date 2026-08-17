'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type FeedItem = {
  id: string;
  title: string;
  thumbnail_url: string;
  href: string;
  badge?: string;
  meta?: string;
};

type Props = {
  title: string;
  subtitle?: string;
  items: FeedItem[];
  aspect?: '4/5' | '16/10';
  cardWidth?: number;
};

export default function FeedRow({
  title,
  subtitle,
  items,
  aspect = '16/10',
  cardWidth = 280,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -(cardWidth + 16) * 3 : (cardWidth + 16) * 3, behavior: 'smooth' });
  };

  const aspectClass = aspect === '4/5' ? 'aspect-[4/5]' : 'aspect-[16/10]';

  return (
    <section className="mb-12">
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="text-[20px] font-semibold tracking-tight">{title}</h2>
          {subtitle && (
            <p className="mt-0.5 text-[14px] text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
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
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 scroll-smooth snap-x"
        style={{ scrollbarWidth: 'none' }}
      >
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group flex-none snap-start"
            style={{ width: cardWidth }}
          >
            <div className={`relative ${aspectClass} rounded-xl overflow-hidden border border-border/60 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5`}>
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
    </section>
  );
}
