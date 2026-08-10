'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Heart,
  Share2,
  Download,
  Play,
  Pause,
  Check,
  Music,
} from 'lucide-react';
import Navbar from '@/components/site/navbar';
import ProductCard from '@/components/site/product-card';
import BookmarkButton from '@/components/site/bookmark-button';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { useToast } from '@/hooks/use-toast';
import { mockAudios, formatCount } from '@/lib/mock-data';

type Audio = (typeof mockAudios)[number];

const PREVIEW_IMAGES = [
  'https://images.unsplash.com/photo-1470225620780-9bf2e77e26c3?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1454942901704-3c44c3b95a39?w=400&h=500&fit=crop',
];

export default function AudioDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthed, loading } = useAdminAuth();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [downloaded, setDownloaded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [playing, setPlaying] = useState(false);

  const id = params?.id as string;
  const audio = mockAudios.find((a) => a.id === id);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !isAuthed) {
      router.replace('/signin');
    }
  }, [mounted, loading, isAuthed, router]);

  if (!mounted || loading || !isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-foreground/20 border-t-foreground animate-spin" />
      </div>
    );
  }

  if (!audio) {
    return (
      <>
        <Navbar />
        <main className="pt-16">
          <div className="px-6 py-32 text-center">
            <h1 className="text-[22px] font-semibold">Audio not found</h1>
            <p className="mt-2 text-[15px] text-muted-foreground">
              This item may have been removed.
            </p>
            <Link href="/audios" className="mt-6 inline-block">
              <Button variant="outline">Back to Audios</Button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  const related = mockAudios.filter((a) => a.id !== audio.id).slice(0, 5);
  const previews = [audio.thumbnail_url, ...PREVIEW_IMAGES.filter((u) => u !== audio.thumbnail_url)].slice(0, 4);

  const handleDownload = () => {
    setDownloaded(true);
    toast({
      title: 'Download started',
      description: `${audio.title} (${audio.duration}) is downloading.`,
    });
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: 'Link copied', description: 'Share this audio with anyone.' });
    } catch {
      toast({ title: 'Could not copy link' });
    }
  };

  const togglePlay = () => {
    setPlaying((v) => !v);
  };

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <Link
            href="/audios"
            className="inline-flex items-center gap-1.5 text-[14px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Audios
          </Link>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Preview gallery */}
            <div>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border/60 bg-secondary">
                <img
                  src={previews[selectedImage]}
                  alt={audio.title}
                  className="w-full h-full object-cover"
                />
                {/* Play overlay */}
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                  aria-label={playing ? 'Pause preview' : 'Play preview'}
                >
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                    {playing ? (
                      <Pause className="w-7 h-7 text-white" fill="white" />
                    ) : (
                      <Play className="w-7 h-7 text-white ml-1" fill="white" />
                    )}
                  </div>
                </button>
                {/* Duration badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/15 backdrop-blur-md text-white border border-white/20">
                    <Music className="w-3 h-3" />
                    {audio.duration}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <BookmarkButton audioId={audio.id} />
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
                  {audio.category}
                </span>
                <span className="text-[13px] text-muted-foreground">
                  {audio.duration}
                </span>
              </div>

              <h1 className="mt-3 text-[28px] font-semibold tracking-tight">
                {audio.title}
              </h1>

              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                A free {audio.category} track perfect for your editing projects.
                Royalty-free and ready to use in your edits, AMVs, and short-form
                content. High-quality audio file included.
              </p>

              {/* Download + actions */}
              <div className="mt-6 p-5 rounded-2xl border border-border/60 bg-secondary/30">
                <div className="flex items-baseline gap-2">
                  <span className="text-[26px] font-semibold">Free</span>
                  <span className="text-[13px] text-muted-foreground">
                    {formatCount(audio.download_count)} downloads
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
                  <dd className="capitalize">{audio.category}</dd>
                  <dt className="text-muted-foreground">Duration</dt>
                  <dd>{audio.duration}</dd>
                  <dt className="text-muted-foreground">Released</dt>
                  <dd>{new Date(audio.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</dd>
                  <dt className="text-muted-foreground">Downloads</dt>
                  <dd>{formatCount(audio.download_count)}</dd>
                  <dt className="text-muted-foreground">Format</dt>
                  <dd>.mp3 / .wav · 320 kbps</dd>
                </dl>
              </div>
            </div>
          </div>

          {/* More like this */}
          <section className="mt-16">
            <h2 className="text-[22px] font-semibold tracking-tight mb-6">
              More like this
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {related.map((a: Audio) => (
                <ProductCard
                  key={a.id}
                  href={`/audios/${a.id}`}
                  thumbnailUrl={a.thumbnail_url}
                  title={a.title}
                  aspect="4/5"
                  audioId={a.id}
                  badge={
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/15 backdrop-blur-md text-white border border-white/20">
                      {a.duration}
                    </span>
                  }
                  meta={
                    <p className="text-[13px] text-white/60">
                      {formatCount(a.download_count)} downloads
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
