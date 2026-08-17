'use client';

import { useState } from 'react';
import Navbar from '@/components/site/navbar';
import BrowseHeader, { CategoryPill } from '@/components/site/browse-header';
import ProductCard from '@/components/site/product-card';
import { mockScenepacks, formatCount } from '@/lib/mock-data';

type Scenepack = (typeof mockScenepacks)[number];

const CATEGORIES: CategoryPill[] = [
  { label: 'All', value: 'all' },
  { label: 'High Quality', value: 'high_quality' },
  { label: 'Normal', value: 'normal' },
  { label: 'Twixtor', value: 'twixtor' },
  { label: 'Topaz', value: 'topaz' },
];

const SORT_OPTIONS = [
  { label: 'Trending', value: 'trending' },
  { label: 'Newest', value: 'newest' },
  { label: 'Most Clips', value: 'most_clips' },
];

export default function ScenepacksPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('trending');

  const packs = mockScenepacks
    .filter((p) => category === 'all' || p.quality === category)
    .filter((p) => {
      if (!search.trim()) return true;
      const t = search.trim().toLowerCase();
      return (
        p.title.toLowerCase().includes(t) ||
        p.subject.toLowerCase().includes(t) ||
        p.source_title.toLowerCase().includes(t)
      );
    })
    .sort((a, b) => {
      switch (sort) {
        case 'newest':
          return +new Date(b.created_at) - +new Date(a.created_at);
        case 'most_clips':
          return b.clip_count - a.clip_count;
        default:
          return b.download_count - a.download_count;
      }
    });

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="px-px">
          <BrowseHeader
            title="Scenepacks"
            subtitle="Clip packs from your favourite movies and shows. Free to download."
            search={search}
            onSearchChange={setSearch}
            categories={CATEGORIES}
            activeCategory={category}
            onCategoryChange={setCategory}
            sort={sort}
            onSortChange={setSort}
            sortOptions={SORT_OPTIONS}
          />
        </div>

        <section className="px-6 py-8">
          <div className="mx-auto max-w-6xl">
            {packs.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-[15px] text-muted-foreground">
                  No scenepacks found. Try a different search or filter.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {packs.map((pack: Scenepack) => (
                  <ProductCard
                    key={pack.id}
                    href={`/scenepacks/${pack.id}`}
                    thumbnailUrl={pack.thumbnail_url}
                    title={pack.title}
                    aspect="16/10"
                    scenepackId={pack.id}
                    badge={
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/15 backdrop-blur-md text-white border border-white/20">
                        {pack.clip_count} clips
                      </span>
                    }
                    meta={
                      <p className="text-[13px] text-white/60">
                        {formatCount(pack.download_count)} downloads
                      </p>
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
