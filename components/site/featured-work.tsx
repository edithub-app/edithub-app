import Link from 'next/link';
import { ArrowUpRight, Layers } from 'lucide-react';
import {
  formatCount,
  mockAssets,
  mockPresets,
  mockScenepacks,
} from '@/lib/mock-data';

const featuredWork = [
  ...mockScenepacks.map((item) => ({ ...item, kind: 'Scenepack' as const, href: `/scenepacks/${item.id}`, aspect: 'aspect-[16/10]' })),
  ...mockAssets.map((item) => ({ ...item, kind: 'Asset' as const, href: `/assets/${item.id}`, aspect: 'aspect-[4/5]' })),
  ...mockPresets.map((item) => ({ ...item, kind: 'Preset' as const, href: `/presets/${item.id}`, aspect: 'aspect-[4/5]' })),
];

export default function FeaturedWork() {
  return (
    <section className="py-20 px-6 bg-secondary/30">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Layers className="w-4 h-4 text-accent" />
              <span className="text-[13px] font-medium text-accent">Featured work</span>
            </div>
            <h2 className="text-[28px] font-semibold tracking-tight">Featured scene packs, assets & presets</h2>
            <p className="mt-1.5 text-[15px] text-muted-foreground">
              Browse scenepacks, assets, and presets from the EditHub library.
            </p>
          </div>
          <Link
            href="/assets"
            className="hidden sm:inline-flex items-center gap-1.5 text-[14px] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Browse library
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredWork.map((item) => (
            <Link key={`${item.kind}-${item.id}`} href={item.href} className="group block">
              <div className={`relative ${item.aspect} rounded-2xl overflow-hidden border border-border/60 bg-secondary transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg`}>
                <img
                  src={item.thumbnail_url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-black/25 backdrop-blur-md text-white border border-white/20">
                    {item.kind}
                  </span>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-3.5">
                  <h3 className="text-[15px] font-semibold text-white leading-tight line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[13px] text-white/65">
                    {formatCount(item.download_count)} downloads
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/assets"
          className="mt-6 inline-flex sm:hidden items-center gap-1.5 text-[14px] font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Browse library
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
