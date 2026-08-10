import Link from 'next/link';
import { ArrowRight, Sparkles, Info } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden">
      {/* Soft ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-start justify-center pointer-events-none"
      >
        <div className="w-[680px] h-[480px] rounded-full opacity-[0.06] blur-[120px] bg-accent" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">

        {/* Headline */}
        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold tracking-[-0.03em] leading-[1.05] text-balance animate-fade-up">
          The hub for creative
          <br />
          editors.
        </h1>

        {/* Subtext */}
        <p
          className="mt-6 text-[18px] md:text-[19px] text-muted-foreground leading-relaxed max-w-xl mx-auto text-balance animate-fade-up"
          style={{ animationDelay: '80ms' }}
        >
          Discover free scenepacks, overlays, presets, and audio for your
          edits — all in one place.
        </p>

        {/* CTAs */}
        <div
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up"
          style={{ animationDelay: '160ms' }}
        >
          <Link
            href="/scenepacks"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-[15px] font-medium bg-foreground text-background rounded-2xl hover:bg-foreground/90 transition-all duration-200 active:scale-[0.97] w-full sm:w-auto justify-center"
          >
            Browse Scenepacks
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/assets"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-[15px] font-medium border border-border bg-card/50 backdrop-blur-sm rounded-2xl hover:bg-secondary transition-all duration-200 active:scale-[0.97] w-full sm:w-auto justify-center"
          >
            Browse Assets
          </Link>
        </div>

        {/* Copyright notice */}
        <div
          className="mt-7 flex items-center justify-center gap-2 text-[13px] text-muted-foreground/70 animate-fade-in"
          style={{ animationDelay: '300ms' }}
        >
          <Info className="w-3.5 h-3.5" />
          <span>
            Scenepacks are free due to copyright (not tryna get sued🙏)
          </span>
        </div>
      </div>
    </section>
  );
}
