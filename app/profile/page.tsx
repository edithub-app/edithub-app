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
} from 'lucide-react';
import AppShell from '@/components/site/app-shell';
import ProductCard from '@/components/site/product-card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { mockAssets, mockScenepacks, mockPresets, mockAudios, formatCount } from '@/lib/mock-data';
import { PROFILE } from '@/lib/profile';

const stats = [
  { label: 'Downloads', value: '24.6k', icon: Download },
  { label: 'Uploads', value: '48', icon: ShoppingBag },
  { label: 'Followers', value: '12.4k', icon: Users },
  { label: 'Following', value: '186', icon: Heart },
];

export default function ProfilePage() {
  const [following, setFollowing] = useState(false);

  return (
    <AppShell>
      <div className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          {/* Banner */}
          <div className="relative h-48 sm:h-60 rounded-2xl overflow-hidden border border-border/60">
            <img
              src={PROFILE.bannerUrl}
              alt="Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Header card */}
          <div className="relative -mt-12 sm:-mt-14 px-6 flex flex-col sm:flex-row sm:items-end gap-4">
            <Avatar className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-background rounded-full">
              <AvatarImage
                src={PROFILE.avatarUrl}
                alt={PROFILE.name}
              />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>

            <div className="flex-1 sm:pb-2">
              <h1 className="text-[22px] font-semibold tracking-tight">{PROFILE.name}</h1>
              <p className="text-[14px] text-muted-foreground">{PROFILE.handle}</p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-[13px] text-muted-foreground">
                <a href="#" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <LinkIcon className="w-3.5 h-3.5" /> mayaedits.com
                </a>
                <a href="#" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <Twitter className="w-3.5 h-3.5" /> @mayaedits
                </a>
                <a href="#" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <Youtube className="w-3.5 h-3.5" /> Maya Edits
                </a>
                <a href="#" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <Instagram className="w-3.5 h-3.5" /> @maya.edits
                </a>
              </div>
            </div>

            <button
              onClick={() => setFollowing((v) => !v)}
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[14px] font-medium rounded-xl transition-all duration-200 active:scale-[0.97] ${
                following
                  ? 'bg-secondary text-foreground border border-border'
                  : 'bg-foreground text-background hover:bg-foreground/90'
              }`}
            >
              {following ? 'Following' : 'Follow'}
            </button>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border/60 bg-card/50 p-4"
              >
                <div className="flex items-center gap-2 text-muted-foreground">
                  <s.icon className="w-4 h-4" />
                  <span className="text-[12px] font-medium uppercase tracking-wide">{s.label}</span>
                </div>
                <p className="mt-2 text-[22px] font-semibold tracking-tight">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="mt-10">
            <Tabs defaultValue="assets">
              <TabsList className="bg-secondary/50">
                <TabsTrigger value="assets">Assets</TabsTrigger>
                <TabsTrigger value="scenepacks">Scenepacks</TabsTrigger>
                <TabsTrigger value="presets">Presets</TabsTrigger>
                <TabsTrigger value="audios">Audios</TabsTrigger>
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
            </Tabs>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
