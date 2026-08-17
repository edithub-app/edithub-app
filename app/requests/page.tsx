'use client';

import { useState } from 'react';
import { ArrowRight, ClipboardList, Film, Headphones, Image, SlidersHorizontal } from 'lucide-react';
import AppShell from '@/components/site/app-shell';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { PROFILE_REQUESTS } from '@/lib/profile';

const requestTypes = [
  { value: 'scenepack', label: 'Scenepack', icon: Film },
  { value: 'audio', label: 'Audio', icon: Headphones },
  { value: 'preset', label: 'Preset', icon: SlidersHorizontal },
  { value: 'asset', label: 'Asset', icon: Image },
];

export default function RequestsPage() {
  const [type, setType] = useState('scenepack');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [source, setSource] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !details.trim()) return;
    toast.success('Request submitted', {
      description: 'We will let you know when there is an update.',
    });
    setTitle('');
    setDetails('');
    setSource('');
  };

  return (
    <AppShell>
      <main className="px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-accent/15 text-accent">
              <ClipboardList className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-[26px] font-semibold tracking-tight">Request something for EditHub</h1>
              <p className="mt-1 max-w-xl text-[14px] leading-6 text-muted-foreground">
                Tell us what would make your next edit easier. Request a scenepack, audio, preset, or asset.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 rounded-3xl border border-border/60 bg-card/50 p-5 sm:p-8">
            <div>
              <Label>What would you like to request?</Label>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {requestTypes.map((item) => {
                  const Icon = item.icon;
                  const selected = type === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setType(item.value)}
                      className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center text-[13px] font-medium transition-all ${
                        selected
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-border/60 text-muted-foreground hover:border-border hover:bg-secondary/60 hover:text-foreground'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="request-title">Title</Label>
                <Input
                  id="request-title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="e.g. A Wednesday scenepack"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="request-details">Tell us more</Label>
                <Textarea
                  id="request-details"
                  value={details}
                  onChange={(event) => setDetails(event.target.value)}
                  placeholder="Share the creator, song, show, style, or details you have in mind…"
                  className="min-h-32 resize-y"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="request-source">Reference link (optional)</Label>
                <Input
                  id="request-source"
                  type="url"
                  value={source}
                  onChange={(event) => setSource(event.target.value)}
                  placeholder="https://…"
                />
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[12px] text-muted-foreground">Requests are reviewed by the EditHub team.</p>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-[14px] font-medium text-accent-foreground transition-all hover:bg-accent/90 active:scale-[0.97]"
              >
                Send request
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          <section className="mt-10">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Community board</p>
              <h2 className="mt-1 text-[20px] font-semibold tracking-tight">Requests people made</h2>
            </div>
            <div className="mt-5 space-y-3">
              {PROFILE_REQUESTS.map((request) => (
                <div key={request.id} className="rounded-2xl border border-border/60 bg-card/40 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-[14px] font-semibold">{request.title}</h3>
                        <span className="rounded-md bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">{request.type}</span>
                      </div>
                      <p className="mt-1 text-[12px] text-muted-foreground">Requested by {request.requester} ({request.handle})</p>
                    </div>
                    <div className="text-left text-[12px] text-muted-foreground sm:text-right">
                      <p>{request.date}</p>
                      <p className="mt-1 text-accent">{request.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </AppShell>
  );
}
