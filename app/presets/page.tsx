'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/site/navbar';
import BrowseHeader, { CategoryPill } from '@/components/site/browse-header';
import ProductCard from '@/components/site/product-card';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { mockPresets, formatCount } from '@/lib/mock-data';

type Preset = (typeof mockPresets)[number];

const CATEGORIES: CategoryPill[] = [
  { label: 'All', value: 'all' },
  { label: 'Colourings', value: 'colouring' },
  { label: 'Shakes', value: 'shake' },
  { label: 'Transitions', value: 'transition' },
  { label: 'Presets', value: 'preset' },
  { label: 'Other', value: 'other' },
];

const SORT_OPTIONS = [
  { label: 'Trending', value: 'trending' },
  { label: 'Newest', value: 'newest' },
];

export default function PresetsPage() {
  const router = useRouter();
  const { isAuthed, loading } = useAdminAuth();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('trending');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !isAuthed) {
      router.replace('/signin');
    }
  }, [mounted, loading, isAuthed, router]);

  const presets = mockPresets
    .filter((p) => category === 'all' || p.category === category)
    .filter((p) =>
      search.trim() ? p.title.toLowerCase().includes(search.trim().toLowerCase()) : true
    )
    .sort((a, b) => {
      if (sort === 'newest') {
        return +new Date(b.created_at) - +new Date(a.created_at);
      }
      return b.download_count - a.download_count;
    });

  if (!mounted || loading || !isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-foreground/20 border-t-foreground animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="px-6">
          <BrowseHeader
            title="Presets"
            subtitle="Free colourings, shakes, and transitions for your edits."
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
            {presets.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-[15px] text-muted-foreground">
                  No presets found. Try a different search or filter.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {presets.map((preset: Preset) => (
                  <ProductCard
                    key={preset.id}
                    href={`/presets/${preset.id}`}
                    thumbnailUrl={preset.thumbnail_url}
                    title={preset.title}
                    aspect="4/5"
                    presetId={preset.id}
                    meta={
                      <p className="text-[13px] text-white/60">
                        {formatCount(preset.download_count)} downloads
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
