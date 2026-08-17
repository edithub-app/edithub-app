import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PROFILE } from '@/lib/profile';

type Props = {
  label: string;
  count: number;
};

export default function CreatorBanner({ label, count }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border/70 bg-secondary/30 p-4 sm:p-5">
      <div className="flex items-center gap-3.5 min-w-0">
        <img
          src={PROFILE.avatarUrl}
          alt={PROFILE.name}
          className="w-11 h-11 rounded-full object-cover border border-border/70"
        />
        <div className="min-w-0">
          <p className="text-[13px] text-muted-foreground">More from creator</p>
          <p className="mt-0.5 text-[15px] font-semibold truncate">
            {PROFILE.name} <span className="font-normal text-muted-foreground">{PROFILE.handle}</span>
          </p>
          <p className="mt-0.5 text-[12px] text-muted-foreground">
            {count} {label.toLowerCase()} in the EditHub library
          </p>
        </div>
      </div>
      <Link
        href="/profile"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-accent hover:text-foreground transition-colors"
      >
        View creator
        <ArrowUpRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
