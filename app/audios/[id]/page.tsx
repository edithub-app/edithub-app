'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Bookmark,
  Check,
  Download,
  Heart,
  Pause,
  Play,
  Share2,
} from 'lucide-react';
import Navbar from '@/components/site/navbar';
import ProductCard from '@/components/site/product-card';
import CreatorBanner from '@/components/site/creator-banner';
import TagList from '@/components/site/tag-list';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { mockAudios, formatCount } from '@/lib/mock-data';

type Audio = (typeof mockAudios)[number];

const WAVEFORM = [
  22, 42, 30, 58, 76, 46, 34, 64, 86, 52, 38, 70, 92, 62, 44, 30, 56, 78,
  96, 72, 50, 38, 66, 88, 54, 32, 46, 74, 90, 62, 42, 24, 58, 84, 70, 48,
  34, 64, 92, 58, 38, 72, 82, 44, 28, 56, 74, 94, 62, 40, 26, 48, 68, 86,
  52, 32, 58, 78, 46, 24,
];

export default function AudioDetailPage() {
  const params = useParams();
  const { toast } = useToast();
  const [downloaded, setDownloaded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [playing, setPlaying] = useState(false);

  const id = params?.id as string;
  const audio = mockAudios.find((item) => item.id === id);

  if (!audio) {
    return (
      <>
        <Navbar />
        <main className="pt-16">
          <div className="px-6 py-32 text-center">
            <h1 className="text-[22px] font-semibold">Audio not found</h1>
            <p className="mt-2 text-[15px] text-muted-foreground">
              This track may have been removed.
            </p>
            <Link href="/audios" className="mt-6 inline-block">
              <Button variant="outline">Back to Audios</Button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  const otherAudio = mockAudios.filter((item) => item.id !== audio.id);
  const creatorItems = otherAudio.slice(0, 2);
  const related = otherAudio.slice(2);

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

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 lg:gap-16 items-start">
            <div className="max-w-[520px] w-full mx-auto lg:mx-0">
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-border/60 bg-secondary shadow-2xl shadow-black/10">
                <img
                  src={audio.thumbnail_url}
                  alt={`${audio.title} cover`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
                <button
                  onClick={() => setPlaying((value) => !value)}
                  className="absolute bottom-6 left-6 w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-xl transition-transform hover:scale-105 active:scale-95"
                  aria-label={playing ? 'Pause preview' : 'Play preview'}
                >
                  {playing ? (
                    <Pause className="w-7 h-7" fill="currentColor" />
                  ) : (
                    <Play className="w-7 h-7 ml-1" fill="currentColor" />
                  )}
                </button>
                <span className="absolute bottom-8 right-6 text-[13px] font-medium text-white/85">
                  {audio.duration}
                </span>
              </div>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-accent font-medium">
                <span>Sound library</span>
                <span className="text-muted-foreground/50">/</span>
                <span className="text-muted-foreground">{audio.category}</span>
              </div>

              <h1 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.04em] leading-[1.05]">
                {audio.title}
              </h1>
              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                A polished {audio.category} track for edits, AMVs, short-form videos,
                and creative projects. Preview the track below, then save it for later
                or download it when you are ready to edit.
              </p>

              <div className="mt-10 rounded-2xl border border-border/70 bg-secondary/30 p-5 sm:p-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setPlaying((value) => !value)}
                    className="shrink-0 w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                    aria-label={playing ? 'Pause audio' : 'Play audio'}
                  >
                    {playing ? (
                      <Pause className="w-5 h-5" fill="currentColor" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-end gap-[3px] h-16" aria-label="Audio waveform">
                      {WAVEFORM.map((height, index) => (
                        <span
                          key={`${audio.id}-${index}`}
                          className={`flex-1 min-w-[2px] rounded-full transition-colors ${
                            playing && index < 26 ? 'bg-accent' : 'bg-foreground/25'
                          }`}
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>{playing ? '0:18' : '0:00'}</span>
                      <span>{audio.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <Button
                  variant={liked ? 'default' : 'outline'}
                  className="gap-2"
                  onClick={() => setLiked((value) => !value)}
                >
                  <Heart className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} />
                  {liked ? 'Liked' : 'Like'}
                </Button>
                <Button
                  variant={saved ? 'default' : 'outline'}
                  className="gap-2"
                  onClick={() => setSaved((value) => !value)}
                >
                  <Bookmark className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} />
                  {saved ? 'Saved' : 'Save'}
                </Button>
                <Button variant="outline" className="gap-2" onClick={handleShare}>
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button className="gap-2" onClick={handleDownload} disabled={downloaded}>
                  {downloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                  {downloaded ? 'Downloaded' : 'Download'}
                </Button>
              </div>

              <div className="mt-10 pt-6 border-t border-border/70">
                <dl className="grid grid-cols-2 gap-x-8 gap-y-4 text-[14px]">
                  <div>
                    <dt className="text-muted-foreground">Type</dt>
                    <dd className="mt-1 capitalize">{audio.category}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Length</dt>
                    <dd className="mt-1">{audio.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Downloads</dt>
                    <dd className="mt-1">{formatCount(audio.download_count)}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Format</dt>
                    <dd className="mt-1">.mp3 / .wav</dd>
                  </div>
                </dl>
              </div>

              <TagList
                tags={[audio.category, 'editing audio', 'soundtrack', 'creative library']}
              />
            </div>
          </div>

          <section className="mt-16">
            <CreatorBanner label="audio tracks" count={mockAudios.length} />
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {creatorItems.map((item: Audio) => (
                <ProductCard
                  key={item.id}
                  href={`/audios/${item.id}`}
                  thumbnailUrl={item.thumbnail_url}
                  title={item.title}
                  aspect="4/5"
                  audioId={item.id}
                  badge={
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/15 backdrop-blur-md text-white border border-white/20">
                      {item.duration}
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

          <section className="mt-20">
            <h2 className="text-[22px] font-semibold tracking-tight mb-6">More like this</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((item: Audio) => (
                <ProductCard
                  key={item.id}
                  href={`/audios/${item.id}`}
                  thumbnailUrl={item.thumbnail_url}
                  title={item.title}
                  aspect="4/5"
                  audioId={item.id}
                  badge={
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/15 backdrop-blur-md text-white border border-white/20">
                      {item.duration}
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
        </div>
      </main>
    </>
  );
}
