'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/site/navbar';
import BrowseHeader, { CategoryPill } from '@/components/site/browse-header';
import ProductCard from '@/components/site/product-card';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { mockAudios, formatCount } from '@/lib/mock-data';

type Audio = (typeof mockAudios)[number];

const CATEGORIES: CategoryPill[] = [
  { label: 'All', value: 'all' },
  { label: 'Songs', value: 'song' },
  { label: 'SFX', value: 'sfx' },
  { label: 'Loops', value: 'loop' },
  { label: 'Beats', value: 'beat' },
  { label: 'Other', value: 'other' },
];

const SORT_OPTIONS = [
  { label: 'Trending', value: 'trending' },
  { label: 'Newest', value: 'newest' },
];

export default function AudiosPage() {
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

  const audios = mockAudios
    .filter((a) => category === 'all' || a.category === category)
    .filter((a) =>
      search.trim() ? a.title.toLowerCase().includes(search.trim().toLowerCase()) : true
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
            title="Audios"
            subtitle="Free songs, SFX, loops, and beats for your edits."
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
            {audios.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-[15px] text-muted-foreground">
                  No audios found. Try a different search or filter.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {audios.map((audio: Audio) => (
                  <ProductCard
                    key={audio.id}
                    href={`/audios/${audio.id}`}
                    thumbnailUrl={audio.thumbnail_url}
                    title={audio.title}
                    aspect="4/5"
                    audioId={audio.id}
                    badge={
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/15 backdrop-blur-md text-white border border-white/20">
                        {audio.duration}
                      </span>
                    }
                    meta={
                      <p className="text-[13px] text-white/60">
                        {formatCount(audio.download_count)} downloads
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
