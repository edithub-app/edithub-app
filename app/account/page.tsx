'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Download,
  Search,
  Calendar,
} from 'lucide-react';
import AppShell from '@/components/site/app-shell';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { mockAssets, mockScenepacks, mockPresets, mockAudios, formatCount } from '@/lib/mock-data';

type DownloadItem = {
  id: string;
  title: string;
  thumbnail_url: string;
  date: string;
  type: 'asset' | 'scenepack' | 'preset' | 'audio';
  href: string;
};

const items: DownloadItem[] = [
  { id: 'd1', title: 'Overbills Massive Pack', thumbnail_url: mockAssets[0].thumbnail_url, date: '2026-07-24', type: 'asset', href: `/assets/${mockAssets[0].id}` },
  { id: 'd2', title: 'Glow Dark Overlay', thumbnail_url: mockAssets[1].thumbnail_url, date: '2026-07-22', type: 'asset', href: `/assets/${mockAssets[1].id}` },
  { id: 'd3', title: '4K Scenepack Mix', thumbnail_url: mockScenepacks[3].thumbnail_url, date: '2026-07-19', type: 'scenepack', href: `/scenepacks/${mockScenepacks[3].id}` },
  { id: 'd4', title: 'Demitra Kalogeras', thumbnail_url: mockScenepacks[0].thumbnail_url, date: '2026-07-18', type: 'scenepack', href: `/scenepacks/${mockScenepacks[0].id}` },
  { id: 'd5', title: 'Billie CC', thumbnail_url: mockPresets[0].thumbnail_url, date: '2026-07-16', type: 'preset', href: `/presets/${mockPresets[0].id}` },
  { id: 'd6', title: 'Shake Pack Pro', thumbnail_url: mockPresets[2].thumbnail_url, date: '2026-07-14', type: 'preset', href: `/presets/${mockPresets[2].id}` },
  { id: 'd7', title: 'Midnight Drive', thumbnail_url: mockAudios[0].thumbnail_url, date: '2026-07-12', type: 'audio', href: `/audios/${mockAudios[0].id}` },
  { id: 'd8', title: 'Trap SFX Pack', thumbnail_url: mockAudios[2].thumbnail_url, date: '2026-07-10', type: 'audio', href: `/audios/${mockAudios[2].id}` },
];

export default function AccountPage() {
  const [search, setSearch] = useState('');

  const filtered = items.filter((p) =>
    p.title.toLowerCase().includes(search.trim().toLowerCase())
  );
  const byType = (type: string) => filtered.filter((p) => type === 'all' || p.type === type);

  const Row = ({ p }: { p: DownloadItem }) => (
    <Link
      href={p.href}
      className="group flex items-center gap-4 p-3 rounded-2xl border border-border/60 hover:bg-secondary/40 transition-colors duration-200"
    >
      <div className="w-16 h-16 rounded-xl overflow-hidden border border-border/60 flex-none">
        <img src={p.thumbnail_url} alt={p.title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold truncate">{p.title}</p>
        <div className="mt-1 flex items-center gap-3 text-[12px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="capitalize text-accent">{p.type}</span>
        </div>
      </div>
      <button className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium bg-secondary text-foreground rounded-xl border border-border hover:bg-secondary/80 transition-colors duration-200">
        <Download className="w-4 h-4" />
        Download
      </button>
    </Link>
  );

  return (
    <AppShell>
      <div className="px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-[26px] font-semibold tracking-tight">Account</h1>
          <p className="mt-1 text-[14px] text-muted-foreground">
            Everything you have downloaded.
          </p>

          {/* Summary */}
          <div className="mt-6 grid grid-cols-4 gap-3">
            <div className="rounded-2xl border border-border/60 bg-card/50 p-4">
              <Download className="w-4 h-4 text-muted-foreground" />
              <p className="mt-2 text-[20px] font-semibold">{items.length}</p>
              <p className="text-[12px] text-muted-foreground">Total</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/50 p-4">
              <p className="text-[12px] text-muted-foreground uppercase tracking-wide">Assets</p>
              <p className="mt-2 text-[20px] font-semibold">{byType('asset').length}</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/50 p-4">
              <p className="text-[12px] text-muted-foreground uppercase tracking-wide">Scenepacks</p>
              <p className="mt-2 text-[20px] font-semibold">{byType('scenepack').length}</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/50 p-4">
              <p className="text-[12px] text-muted-foreground uppercase tracking-wide">Presets</p>
              <p className="mt-2 text-[20px] font-semibold">{byType('preset').length}</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mt-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search your downloads…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Tabs */}
          <div className="mt-6">
            <Tabs defaultValue="all">
              <TabsList className="bg-secondary/50">
                <TabsTrigger value="all">All ({filtered.length})</TabsTrigger>
                <TabsTrigger value="asset">Assets ({byType('asset').length})</TabsTrigger>
                <TabsTrigger value="scenepack">Scenepacks ({byType('scenepack').length})</TabsTrigger>
                <TabsTrigger value="preset">Presets ({byType('preset').length})</TabsTrigger>
                <TabsTrigger value="audio">Audios ({byType('audio').length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4 space-y-3">
                {filtered.map((p) => <Row key={p.id} p={p} />)}
              </TabsContent>
              <TabsContent value="asset" className="mt-4 space-y-3">
                {byType('asset').map((p) => <Row key={p.id} p={p} />)}
              </TabsContent>
              <TabsContent value="scenepack" className="mt-4 space-y-3">
                {byType('scenepack').map((p) => <Row key={p.id} p={p} />)}
              </TabsContent>
              <TabsContent value="preset" className="mt-4 space-y-3">
                {byType('preset').map((p) => <Row key={p.id} p={p} />)}
              </TabsContent>
              <TabsContent value="audio" className="mt-4 space-y-3">
                {byType('audio').map((p) => <Row key={p.id} p={p} />)}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
