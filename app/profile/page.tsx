'use client';

import { useState } from 'react';
import {
  Download,
  ShoppingBag,
  Users,
  Link as LinkIcon,
  Twitter,
  Youtube,
  Instagram,
  Heart,
  Star,
} from 'lucide-react';
import AppShell from '@/components/site/app-shell';
import ProductCard from '@/components/site/product-card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { mockAssets, mockScenepacks, mockPresets, mockAudios, formatCount } from '@/lib/mock-data';
import {
  PROFILE,
  PROFILE_FOLLOWERS,
  PROFILE_FOLLOWING,
  PROFILE_REVIEWS,
} from '@/lib/profile';

const stats = [
  { label: 'Downloads', value: '24.6k', icon: Download },
  { label: 'Uploads', value: '48', icon: ShoppingBag },
  { label: 'Followers', value: '12.4k', icon: Users, people: PROFILE_FOLLOWERS },
  { label: 'Following', value: '186', icon: Heart, people: PROFILE_FOLLOWING },
];

export default function ProfilePage() {
  const [following, setFollowing] = useState(false);

  return (
    <AppShell>
      <div className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          {/* Profile hero */}
          <div className="relative overflow-hidden rounded-[28px] border border-[#342a2a] bg-[#1d1717] px-3 pb-5 pt-3 shadow-sm sm:px-5 sm:pb-7 sm:pt-5">
            <div className="relative h-48 overflow-hidden rounded-[20px] border border-white/10 sm:h-64">
              <img
                src={PROFILE.bannerUrl}
                alt="Banner"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
            </div>

            <div className="relative -mt-12 px-4 sm:-mt-16 sm:px-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <Avatar className="h-24 w-24 rounded-full border-4 border-[#1d1717] shadow-xl sm:h-32 sm:w-32">
                  <AvatarImage src={PROFILE.avatarUrl} alt={PROFILE.name} />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1 pb-1 text-white">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <h1 className="text-[22px] font-semibold tracking-tight">{PROFILE.name}</h1>
                    <p className="text-[14px] text-white/60">{PROFILE.handle}</p>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px] text-white/65">
                    <a href="#" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
                      <LinkIcon className="h-3.5 w-3.5" /> mayaedits.com
                    </a>
                    <a href="#" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
                      <Twitter className="h-3.5 w-3.5" /> @mayaedits
                    </a>
                    <a href="#" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
                      <Youtube className="h-3.5 w-3.5" /> Maya Edits
                    </a>
                    <a href="#" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
                      <Instagram className="h-3.5 w-3.5" /> @maya.edits
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => setFollowing((v) => !v)}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-[14px] font-medium transition-all duration-200 active:scale-[0.97] ${
                    following
                      ? 'border border-white/20 bg-white/10 text-white hover:bg-white/15'
                      : 'bg-white text-[#1d1717] hover:bg-white/90'
                  }`}
                >
                  {following ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((s) => {
              const card = (
                <div className="rounded-2xl border border-border/60 bg-card/50 p-4 text-left">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <s.icon className="w-4 h-4" />
                    <span className="text-[12px] font-medium uppercase tracking-wide">{s.label}</span>
                  </div>
                  <p className="mt-2 text-[22px] font-semibold tracking-tight">{s.value}</p>
                </div>
              );

              if (!s.people) {
                return <div key={s.label}>{card}</div>;
              }

              return (
                <Dialog key={s.label}>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="group rounded-2xl text-left transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {card}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>{s.label}</DialogTitle>
                      <DialogDescription>
                        People connected to {PROFILE.name}&apos;s profile.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[min(60vh,420px)] space-y-2 overflow-y-auto pr-1">
                      {s.people.map((person) => (
                        <a
                          key={person.id}
                          href="/profile"
                          className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-secondary"
                        >
                          <Avatar className="h-10 w-10 border border-border/60">
                            <AvatarImage src={person.avatarUrl} alt={person.name} />
                            <AvatarFallback>{person.name.slice(0, 1)}</AvatarFallback>
                          </Avatar>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[14px] font-medium">{person.name}</span>
                            <span className="block truncate text-[12px] text-muted-foreground">{person.handle}</span>
                          </span>
                          <span className="text-[12px] text-muted-foreground">
                            {person.followers.toLocaleString()} followers
                          </span>
                        </a>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>

          {/* Tabs */}
          <div className="mt-10">
            <Tabs defaultValue="assets">
              <TabsList className="bg-secondary/50">
                <TabsTrigger value="assets">Assets</TabsTrigger>
                <TabsTrigger value="scenepacks">Scenepacks</TabsTrigger>
                <TabsTrigger value="presets">Presets</TabsTrigger>
                <TabsTrigger value="audios">Audios</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="assets" className="mt-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mockAssets.slice(0, 8).map((asset) => (
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
              </TabsContent>

              <TabsContent value="scenepacks" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockScenepacks.slice(0, 6).map((pack) => (
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
              </TabsContent>

              <TabsContent value="presets" className="mt-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mockPresets.slice(0, 8).map((preset) => (
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
              </TabsContent>

              <TabsContent value="audios" className="mt-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mockAudios.slice(0, 8).map((audio) => (
                    <ProductCard
                      key={audio.id}
                      href={`/audios/${audio.id}`}
                      thumbnailUrl={audio.thumbnail_url}
                      title={audio.title}
                      aspect="4/5"
                      audioId={audio.id}
                      meta={
                        <p className="text-[13px] text-white/60">
                          {formatCount(audio.download_count)} downloads
                        </p>
                      }
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        Creator reviews
                      </p>
                      <div className="mt-2 flex items-end gap-3">
                        <span className="text-4xl font-semibold tracking-tight">4.9</span>
                        <div className="pb-1">
                          <div className="flex items-center gap-0.5 text-accent">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Star key={index} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
                          <p className="mt-1 text-[12px] text-muted-foreground">36 reviews</p>
                        </div>
                      </div>
                    </div>
                    <p className="max-w-xs text-[13px] leading-5 text-muted-foreground">
                      Feedback from editors using Maya&apos;s assets, presets, and scene packs.
                    </p>
                  </div>

                  <div className="mt-6 divide-y divide-border/60">
                    {PROFILE_REVIEWS.map((review) => (
                      <article key={review.id} className="py-5 first:pt-0 last:pb-0">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10 border border-border/60">
                            <AvatarImage src={review.avatarUrl} alt={review.name} />
                            <AvatarFallback>{review.name.slice(0, 1)}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                              <div>
                                <p className="text-[14px] font-medium">{review.name}</p>
                                <p className="text-[12px] text-muted-foreground">{review.handle}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-0.5 text-accent">
                                  {Array.from({ length: 5 }).map((_, index) => (
                                    <Star
                                      key={index}
                                      className={`h-3.5 w-3.5 ${index < review.rating ? 'fill-current' : ''}`}
                                    />
                                  ))}
                                </div>
                                <span className="text-[12px] text-muted-foreground">{review.date}</span>
                              </div>
                            </div>
                            <p className="mt-3 text-[13px] leading-5 text-muted-foreground">{review.text}</p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
