import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function SellerCTA() {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="relative rounded-3xl border border-border overflow-hidden">
          {/* Subtle accent glow */}
          <div
            aria-hidden
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-[0.07] blur-[80px] bg-accent"
          />

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 p-10 md:p-14">
            {/* Left */}
            <div>
              <h2 className="text-[32px] font-semibold tracking-tight leading-tight">
                Sell your edits.
              </h2>
              <p className="mt-3 text-[16px] text-muted-foreground leading-relaxed max-w-md">
                Apply to become a seller and start selling your original
                overlays, presets, and templates. You set the price, we handle
                the rest.
              </p>
              <p className="mt-4 text-[14px] text-muted-foreground/70">
                Scenepacks remain free due to copyright — only original assets
                can be sold.
              </p>
            </div>

            {/* Right */}
            <div className="flex flex-col justify-center items-start md:items-end gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-[15px] font-medium bg-foreground text-background rounded-2xl hover:bg-foreground/90 transition-all duration-200 active:scale-[0.97]"
              >
                Apply to Sell
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[13px] text-muted-foreground/60">
                Approval required before listing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
