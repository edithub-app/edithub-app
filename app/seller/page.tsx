'use client';

import { useState } from 'react';
import { ArrowRight, Check, Store } from 'lucide-react';
import AppShell from '@/components/site/app-shell';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const benefits = [
  'Share your presets, assets, audio, and scenepacks',
  'Build a profile editors can come back to',
  'Keep your creative work in one organised place',
];

export default function SellerPage() {
  const [name, setName] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [about, setAbout] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !about.trim()) return;
    toast.success('Seller application started', {
      description: 'We will be in touch with the next steps.',
    });
  };

  return (
    <AppShell>
      <main className="px-6 pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="rounded-3xl bg-accent p-7 text-accent-foreground sm:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <Store className="h-6 w-6" />
              </div>
              <h1 className="mt-8 text-[30px] font-semibold leading-tight tracking-tight">Become a seller on EditHub.</h1>
              <p className="mt-3 text-[15px] leading-6 text-white/75">
                Give editors the tools you wish you had and grow a home for your creative work.
              </p>
              <ul className="mt-8 space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-[14px] text-white/90">
                    <Check className="mt-0.5 h-4 w-4 flex-none" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="rounded-3xl border border-border/60 bg-card/50 p-5 sm:p-8">
              <h2 className="text-[20px] font-semibold tracking-tight">Tell us about your work</h2>
              <p className="mt-1 text-[13px] leading-5 text-muted-foreground">
                This frontend form is ready for the seller workflow we will connect during the backend phase.
              </p>
              <div className="mt-6 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="seller-name">Name or creator name</Label>
                  <Input
                    id="seller-name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your creator name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seller-portfolio">Portfolio link (optional)</Label>
                  <Input
                    id="seller-portfolio"
                    type="url"
                    value={portfolio}
                    onChange={(event) => setPortfolio(event.target.value)}
                    placeholder="https://…"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seller-about">What do you make?</Label>
                  <Textarea
                    id="seller-about"
                    value={about}
                    onChange={(event) => setAbout(event.target.value)}
                    placeholder="Tell us about the packs, presets, audio, or assets you want to share…"
                    className="min-h-36 resize-y"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-[14px] font-medium text-accent-foreground transition-all hover:bg-accent/90 active:scale-[0.97]"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
