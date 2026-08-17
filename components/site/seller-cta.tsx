import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function SellerCTA() {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="relative rounded-3xl border border-border overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-[0.07] blur-[80px] bg-accent"
          />

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 p-10 md:p-14">
            <div>
              <h2 className="text-[32px] font-semibold tracking-tight leading-tight">
                Everything you need to edit.
              </h2>
              <p className="mt-3 text-[16px] text-muted-foreground leading-relaxed max-w-md">
                Scenepacks, overlays, PNGs, presets, and audio — all free to
                download. No paywalls, no subscriptions, no limits.
              </p>
            </div>

            <div className="flex flex-col justify-center items-start md:items-end gap-4">
              <Link
                href="/signin?mode=signup"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-[15px] font-medium bg-foreground text-background rounded-2xl hover:bg-foreground/90 transition-all duration-200 active:scale-[0.97]"
              >
                Sign up now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[13px] text-muted-foreground/60">
                New packs added regularly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
