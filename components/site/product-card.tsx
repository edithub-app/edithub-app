'use client';

import Link from 'next/link';
import BookmarkButton from '@/components/site/bookmark-button';

type Props = {
  href: string;
  thumbnailUrl: string | null;
  title: string;
  aspect: '4/5' | '16/10';
  badge?: React.ReactNode;
  meta?: React.ReactNode;
  assetId?: string;
  scenepackId?: string;
  presetId?: string;
  audioId?: string;
};

export default function ProductCard({
  href,
  thumbnailUrl,
  title,
  aspect,
  badge,
  meta,
  assetId,
  scenepackId,
  presetId,
  audioId,
}: Props) {
  const aspectClass = aspect === '4/5' ? 'aspect-[4/5]' : 'aspect-[16/10]';
  return (
    <Link href={href} className="group block">
      <div
        className={`relative ${aspectClass} rounded-2xl overflow-hidden border border-border/60 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-0.5`}
      >
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-secondary" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Bookmark */}
        <div className="absolute top-2.5 right-2.5">
          <BookmarkButton assetId={assetId} scenepackId={scenepackId} presetId={presetId} audioId={audioId} />
        </div>

        {/* Optional badge (e.g. clip count) */}
        {badge && <div className="absolute top-2.5 left-2.5">{badge}</div>}

        {/* Title + meta */}
        <div className="absolute bottom-0 inset-x-0 p-3.5">
          <h3 className="text-[15px] font-semibold text-white leading-tight line-clamp-2">
            {title}
          </h3>
          {meta && <div className="mt-1">{meta}</div>}
        </div>
      </div>
    </Link>
  );
}
