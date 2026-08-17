'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Heart,
  Share2,
  Download,
  Check,
} from 'lucide-react';
import Navbar from '@/components/site/navbar';
import ProductCard from '@/components/site/product-card';
import BookmarkButton from '@/components/site/bookmark-button';
import CreatorBanner from '@/components/site/creator-banner';
import TagList from '@/components/site/tag-list';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { mockPresets, formatCount } from '@/lib/mock-data';

type Preset = (typeof mockPresets)[number];

const PREVIEW_IMAGES = [
  'https://payhip.com/cdn-cgi/image/format=auto,width=1500/https://pe56d.s3.amazonaws.com/o_1ihvtnca61qigp1b12kf1ce71d3sr.png',
  'https://payhip.com/cdn-cgi/image/format=auto,width=1500/https://pe56d.s3.amazonaws.com/o_1i57bq02f1cdegqj1sbpjj7nv3r.jpg',
  'https://payhip.com/cdn-cgi/image/format=auto/https://pe56d.s3.amazonaws.com/o_1ij3klq4vp0h1a9g1r3s12r616f525.png',
  'https://payhip.com/cdn-cgi/image/format=auto/https://pe56d.s3.amazonaws.com/o_1jt4iuj7418ei6metfp1v351q1l15.png',
];

export default function PresetDetailPage() {
  const params = useParams();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [downloaded, setDownloaded] = useState(false);
  const [liked, setLiked] = useState(false);

  const id = params?.id as string;
  const preset = mockPresets.find((p) => p.id === id);

  if (!preset) {
    return (
      <>
        <Navbar />
        <main className="pt-16">
          <div className="px-6 py-32 text-center">
            <h1 className="text-[22px] font-semibold">Preset not found</h1>
            <p className="mt-2 text-[15px] text-muted-foreground">
              This item may have been removed.
            </p>
            <Link href="/presets" className="mt-6 inline-block">
              <Button variant="outline">Back to Presets</Button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  const otherPresets = mockPresets.filter((p) => p.id !== preset.id);
  const creatorItems = otherPresets.slice(0, 3);
  const related = otherPresets.slice(3, 8);
  const previews = [preset.thumbnail_url, ...PREVIEW_IMAGES.filter((u) => u !== preset.thumbnail_url)].slice(0, 4);

  const handleDownload = () => {
    setDownloaded(true);
    toast({
      title: 'Download started',
      description: `${preset.title} is downloading.`,
    });
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: 'Link copied', description: 'Share this preset with anyone.' });
    } catch {
      toast({ title: 'Could not copy link' });
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <Link
            href="/presets"
            className="inline-flex items-center gap-1.5 text-[14px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Presets
          </Link>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Preview gallery */}
            <div>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border/60 bg-secondary">
                <img
                  src={previews[selectedImage]}
                  alt={preset.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <BookmarkButton presetId={preset.id} />
                </div>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-3">
                {previews.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i
                        ? 'border-foreground'
                        : 'border-border/60 hover:border-border'
                    }`}
                  >
                    <img src={url} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info panel */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-[11px] uppercase tracking-wider font-medium bg-secondary text-muted-foreground">
                  {preset.category}
                </span>
                <span className="text-[13px] text-muted-foreground">
                  {formatCount(preset.download_count)} downloads
                </span>
              </div>

              <h1 className="mt-3 text-[28px] font-semibold tracking-tight">
                {preset.title}
              </h1>

              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                A free {preset.category} preset designed to give your edits a
                polished, professional look. Compatible with After Effects,
                Premiere Pro, and DaVinci Resolve. Includes installation guide
                and lifetime updates.
              </p>

              {/* Download + actions */}
              <div className="mt-6 p-5 rounded-2xl border border-border/60 bg-secondary/30">
                <div className="flex items-baseline gap-2">
                  <span className="text-[26px] font-semibold">Free</span>
                  <span className="text-[13px] text-muted-foreground">
                    {formatCount(preset.download_count)} downloads
                  </span>
                </div>

                <div className="mt-4 flex flex-col gap-2.5">
                  <Button size="lg" className="w-full" onClick={handleDownload} disabled={downloaded}>
                    {downloaded ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Downloading
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download Free
                      </>
                    )}
                  </Button>

                  <div className="flex gap-2.5">
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1"
                      onClick={() => setLiked((v) => !v)}
                    >
                      <Heart
                        className={`w-4 h-4 mr-2 ${liked ? 'fill-foreground' : ''}`}
                      />
                      {liked ? 'Liked' : 'Like'}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1"
                      onClick={handleShare}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>

              {/* Details list */}
              <div className="mt-6 space-y-3">
                <h3 className="text-[15px] font-semibold">Details</h3>
                <dl className="grid grid-cols-2 gap-y-2.5 text-[14px]">
                  <dt className="text-muted-foreground">Category</dt>
                  <dd className="capitalize">{preset.category}</dd>
                  <dt className="text-muted-foreground">Released</dt>
                  <dd>{new Date(preset.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</dd>
                  <dt className="text-muted-foreground">Downloads</dt>
                  <dd>{formatCount(preset.download_count)}</dd>
                  <dt className="text-muted-foreground">Format</dt>
                  <dd>.aep · 45 MB</dd>
                </dl>
              </div>

              <TagList
                tags={[preset.category, 'editing preset', 'colour grade', 'creative library']}
              />
            </div>
          </div>

          <section className="mt-16">
            <CreatorBanner label="presets" count={mockPresets.length} />
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {creatorItems.map((item: Preset) => (
                <ProductCard
                  key={item.id}
                  href={`/presets/${item.id}`}
                  thumbnailUrl={item.thumbnail_url}
                  title={item.title}
                  aspect="4/5"
                  presetId={item.id}
                  meta={
                    <p className="text-[13px] text-white/60">
                      {formatCount(item.download_count)} downloads
                    </p>
                  }
                />
              ))}
            </div>
          </section>

          {/* More like this */}
          <section className="mt-16">
            <h2 className="text-[22px] font-semibold tracking-tight mb-6">
              More like this
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {related.map((p: Preset) => (
                <ProductCard
                  key={p.id}
                  href={`/presets/${p.id}`}
                  thumbnailUrl={p.thumbnail_url}
                  title={p.title}
                  aspect="4/5"
                  presetId={p.id}
                  meta={
                    <p className="text-[13px] text-white/60">
                      {formatCount(p.download_count)} downloads
                    </p>
                  }
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
