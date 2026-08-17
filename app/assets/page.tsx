'use client';

import { useState } from 'react';
import Navbar from '@/components/site/navbar';
import BrowseHeader, { CategoryPill } from '@/components/site/browse-header';
import ProductCard from '@/components/site/product-card';
import { mockAssets, formatCount } from '@/lib/mock-data';

type Asset = (typeof mockAssets)[number];

const CATEGORIES: CategoryPill[] = [
  { label: 'All', value: 'all' },
  { label: 'Overlays', value: 'overlay' },
  { label: 'PNGs', value: 'png' },
  { label: 'Graphics', value: 'graphic' },
  { label: 'Templates', value: 'template' },
  { label: 'Other', value: 'other' },
];

const SORT_OPTIONS = [
  { label: 'Trending', value: 'trending' },
  { label: 'Newest', value: 'newest' },
];

export default function AssetsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('trending');

  const assets = mockAssets
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

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="px-6">
          <BrowseHeader
            title="Assets"
            subtitle="Free overlays, PNGs, graphics, and templates for your edits."
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
            {assets.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-[15px] text-muted-foreground">
                  No assets found. Try a different search or filter.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {assets.map((asset: Asset) => (
                  <ProductCard
                    key={asset.id}
                    href={`/assets/${asset.id}`}
                    thumbnailUrl={asset.thumbnail_url}
                    title={asset.title}
                    aspect="4/5"
                    assetId={asset.id}
                    meta={
                      <p className="text-[13px] text-white/60">
                        {formatCount(asset.download_count)} downloads
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
