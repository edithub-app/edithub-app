'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  Download,
  Heart,
  Pause,
  Play,
  Share2,
} from 'lucide-react';
import Navbar from '@/components/site/navbar';
import BrowseHeader, { CategoryPill } from '@/components/site/browse-header';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
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

const WAVEFORM = [
  24, 42, 30, 58, 76, 46, 34, 64, 86, 52, 38, 70, 92, 62, 44, 30, 56, 78,
  96, 72, 50, 38, 66, 88, 54, 32, 46, 74, 90, 62, 42, 24, 58, 84, 70, 48,
  34, 64, 92, 58, 38, 72, 82, 44, 28, 56, 74, 94, 62, 40, 26, 48, 68, 86,
  52, 32, 58, 78, 46, 24,
];

function TrackWaveform({ playing }: { playing: boolean }) {
  return (
    <div className="flex items-end gap-[3px] h-14 w-full" aria-label="Audio waveform">
      {WAVEFORM.map((height, index) => (
        <span
          key={`${height}-${index}`}
          className={`flex-1 min-w-[2px] rounded-full transition-colors ${
            playing && index < 22 ? 'bg-accent' : 'bg-foreground/25'
          }`}
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

export default function AudiosPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('trending');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});

  const audios = mockAudios
    .filter((audio) => category === 'all' || audio.category === category)
    .filter((audio) =>
      search.trim()
        ? audio.title.toLowerCase().includes(search.trim().toLowerCase())
        : true
    )
    .sort((a, b) => {
      if (sort === 'newest') {
        return +new Date(b.created_at) - +new Date(a.created_at);
      }
      return b.download_count - a.download_count;
    });

  const handleShare = async (audio: Audio) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/audios/${audio.id}`);
      toast({ title: 'Link copied', description: `Share ${audio.title} with anyone.` });
    } catch {
      toast({ title: 'Could not copy link' });
    }
  };

  const handleDownload = (audio: Audio) => {
    toast({
      title: 'Download started',
      description: `${audio.title} (${audio.duration}) is downloading.`,
    });
  };

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="px-6">
          <BrowseHeader
            title="Audios"
            subtitle="Songs, SFX, loops, and beats for your edits."
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
          <div className="mx-auto max-w-5xl">
            {audios.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-[15px] text-muted-foreground">
                  No audios found. Try a different search or filter.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {audios.map((audio: Audio) => {
                  const isPlaying = playingId === audio.id;
                  const isLiked = Boolean(likedIds[audio.id]);
                  const isSaved = Boolean(savedIds[audio.id]);

                  return (
                    <article
                      key={audio.id}
                      className="group rounded-3xl border border-border/70 bg-card/70 p-3.5 sm:p-4 transition-all duration-300 hover:border-border hover:bg-card hover:shadow-lg"
                    >
                      <div className="grid grid-cols-[112px_minmax(0,1fr)] sm:grid-cols-[156px_minmax(0,1fr)] lg:grid-cols-[184px_minmax(0,1fr)] gap-4 sm:gap-5 items-center">
                        <Link
                          href={`/audios/${audio.id}`}
                          className="relative aspect-square rounded-2xl overflow-hidden border border-border/60 bg-secondary"
                        >
                          <img
                            src={audio.thumbnail_url}
                            alt={`${audio.title} cover`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                        </Link>

                        <div className="min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <Link href={`/audios/${audio.id}`} className="min-w-0">
                              <p className="text-[11px] uppercase tracking-[0.16em] text-accent font-medium">
                                {audio.category}
                              </p>
                              <h2 className="mt-1 text-[19px] sm:text-[21px] font-semibold tracking-tight truncate group-hover:text-accent transition-colors">
                                {audio.title}
                              </h2>
                            </Link>
                            <span className="shrink-0 text-[12px] text-muted-foreground">
                              {audio.duration}
                            </span>
                          </div>

                          <div className="mt-4 flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setPlayingId(isPlaying ? null : audio.id)}
                              className="shrink-0 w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                              aria-label={isPlaying ? `Pause ${audio.title}` : `Play ${audio.title}`}
                            >
                              {isPlaying ? (
                                <Pause className="w-4 h-4" fill="currentColor" />
                              ) : (
                                <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                              )}
                            </button>
                            <TrackWaveform playing={isPlaying} />
                          </div>

                          <div className="mt-4 flex flex-wrap items-center gap-2">
                            <Button
                              variant={isLiked ? 'default' : 'outline'}
                              size="sm"
                              className="gap-1.5 rounded-xl"
                              onClick={() =>
                                setLikedIds((current) => ({ ...current, [audio.id]: !isLiked }))
                              }
                            >
                              <Heart className="w-3.5 h-3.5" fill={isLiked ? 'currentColor' : 'none'} />
                              {isLiked ? 'Liked' : 'Like'}
                            </Button>
                            <Button
                              variant={isSaved ? 'default' : 'outline'}
                              size="sm"
                              className="gap-1.5 rounded-xl"
                              onClick={() =>
                                setSavedIds((current) => ({ ...current, [audio.id]: !isSaved }))
                              }
                            >
                              <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
                              {isSaved ? 'Saved' : 'Save'}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1.5 rounded-xl"
                              onClick={() => handleDownload(audio)}
                            >
                              <Download className="w-3.5 h-3.5" />
                              Download
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1.5 rounded-xl"
                              onClick={() => handleShare(audio)}
                            >
                              <Share2 className="w-3.5 h-3.5" />
                              Share
                            </Button>
                            <span className="ml-auto hidden sm:inline text-[12px] text-muted-foreground">
                              {formatCount(audio.download_count)} downloads
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
