'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Heart,
  Share2,
  Download,
  Film,
  Check,
} from 'lucide-react';
import Navbar from '@/components/site/navbar';
import ProductCard from '@/components/site/product-card';
import BookmarkButton from '@/components/site/bookmark-button';
import CreatorBanner from '@/components/site/creator-banner';
import TagList from '@/components/site/tag-list';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { mockScenepacks, formatCount } from '@/lib/mock-data';

type Scenepack = (typeof mockScenepacks)[number];

const PREVIEW_IMAGES = [
  'https://i3.ytimg.com/vi/i5r7lTnCOAc/hqdefault.jpg',
  'https://i3.ytimg.com/vi/XeIKo-KzpJw/hqdefault.jpg',
  'https://i3.ytimg.com/vi/qHhY4xB8UgE/hqdefault.jpg',
  'https://i3.ytimg.com/vi/aM4DAd4bjzA/hqdefault.jpg',
];

export default function ScenepackDetailPage() {
  const params = useParams();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [downloaded, setDownloaded] = useState(false);
  const [liked, setLiked] = useState(false);

  const id = params?.id as string;
  const pack = mockScenepacks.find((p) => p.id === id);

  if (!pack) {
    return (
      <>
        <Navbar />
        <main className="pt-16">
          <div className="px-6 py-32 text-center">
            <h1 className="text-[22px] font-semibold">Scenepack not found</h1>
            <p className="mt-2 text-[15px] text-muted-foreground">
              This pack may have been removed.
            </p>
            <Link href="/scenepacks" className="mt-6 inline-block">
              <Button variant="outline">Back to Scenepacks</Button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  const otherPacks = mockScenepacks.filter((p) => p.id !== pack.id);
  const creatorItems = otherPacks.slice(0, 2);
  const related = otherPacks.slice(2, 6);
  const previews = [pack.thumbnail_url, ...PREVIEW_IMAGES.filter((u) => u !== pack.thumbnail_url)].slice(0, 4);

  const handleDownload = () => {
    setDownloaded(true);
    toast({
      title: 'Download started',
      description: `${pack.title} (${pack.clip_count} clips) is downloading.`,
    });
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: 'Link copied', description: 'Share this scenepack with anyone.' });
    } catch {
      toast({ title: 'Could not copy link' });
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="mx-auto max-w-6xl px-6 py-6">
          {/* Back link */}
          <Link
            href="/scenepacks"
            className="inline-flex items-center gap-1.5 text-[14px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Scenepacks
          </Link>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Preview gallery */}
            <div>
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-border/60 bg-secondary">
                <img
                  src={previews[selectedImage]}
                  alt={pack.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/15 backdrop-blur-md text-white border border-white/20">
                    {pack.clip_count} clips
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <BookmarkButton scenepackId={pack.id} />
                </div>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-3">
                {previews.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${
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
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary">
                  <Film className="w-3.5 h-3.5 text-accent" />
                  <span className="text-[11px] uppercase tracking-wider font-medium text-accent">
                    Free Scenepack
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-lg text-[11px] uppercase tracking-wider font-medium bg-secondary text-muted-foreground">
                  {pack.quality.replace('_', ' ')}
                </span>
              </div>

              <h1 className="mt-3 text-[28px] font-semibold tracking-tight">
                {pack.title}
              </h1>

              <p className="mt-1 text-[14px] text-muted-foreground">
                From <span className="text-foreground font-medium">{pack.source_title}</span>
                {pack.subject && pack.subject !== 'Multi' && (
                  <> · Subject: {pack.subject}</>
                )}
              </p>

              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                A high-quality scenepack featuring {pack.clip_count} clips from {pack.source_title}.
                Organized, cleaned, and ready to use in your edits. {pack.quality === 'twixtor' ? 'Twixtor-friendly clips included for smooth slow-motion.' : pack.quality === 'topaz' ? 'Upscaled with Topaz for crisp 4K resolution.' : 'Standard HD quality, perfect for any project.'}
              </p>

              {/* Download + actions */}
              <div className="mt-6 p-5 rounded-2xl border border-border/60 bg-secondary/30">
                <div className="flex items-baseline gap-2">
                  <span className="text-[26px] font-semibold">Free</span>
                  <span className="text-[13px] text-muted-foreground">
                    {formatCount(pack.download_count)} downloads
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
                        Download Pack
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
                  <dt className="text-muted-foreground">Source</dt>
                  <dd>{pack.source_title}</dd>
                  <dt className="text-muted-foreground">Subject</dt>
                  <dd>{pack.subject}</dd>
                  <dt className="text-muted-foreground">Quality</dt>
                  <dd className="capitalize">{pack.quality.replace('_', ' ')}</dd>
                  <dt className="text-muted-foreground">Clips</dt>
                  <dd>{pack.clip_count}</dd>
                  <dt className="text-muted-foreground">Released</dt>
                  <dd>{new Date(pack.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</dd>
                  <dt className="text-muted-foreground">Format</dt>
                  <dd>.mp4 · 1.2 GB</dd>
                </dl>
              </div>

              <TagList
                tags={[pack.source_title, pack.quality.replace('_', ' '), 'scenepack', 'editing clips']}
              />
            </div>
          </div>

          <section className="mt-16">
            <CreatorBanner label="scenepacks" count={mockScenepacks.length} />
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {creatorItems.map((item: Scenepack) => (
                <ProductCard
                  key={item.id}
                  href={`/scenepacks/${item.id}`}
                  thumbnailUrl={item.thumbnail_url}
                  title={item.title}
                  aspect="16/10"
                  scenepackId={item.id}
                  badge={
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/15 backdrop-blur-md text-white border border-white/20">
                      {item.clip_count} clips
                    </span>
                  }
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p: Scenepack) => (
                <ProductCard
                  key={p.id}
                  href={`/scenepacks/${p.id}`}
                  thumbnailUrl={p.thumbnail_url}
                  title={p.title}
                  aspect="16/10"
                  scenepackId={p.id}
                  badge={
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/15 backdrop-blur-md text-white border border-white/20">
                      {p.clip_count} clips
                    </span>
                  }
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
