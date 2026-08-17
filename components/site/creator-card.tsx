'use client';

import Link from 'next/link';
import { ArrowUpRight, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { CreatorProfile } from '@/lib/profile';

type Props = {
  creator: CreatorProfile;
};

export default function CreatorCard({ creator }: Props) {
  return (
    <Link
      href="/profile"
      className="group rounded-2xl border border-border/60 bg-card/40 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:bg-card hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <Avatar className="h-14 w-14 border border-border/60">
          <AvatarImage src={creator.avatarUrl} alt={creator.name} />
          <AvatarFallback>{creator.name.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
      <div className="mt-4">
        <h3 className="text-[15px] font-semibold tracking-tight">{creator.name}</h3>
        <p className="mt-0.5 text-[13px] text-muted-foreground">{creator.handle}</p>
        <p className="mt-3 min-h-[40px] text-[13px] leading-5 text-muted-foreground line-clamp-2">
          {creator.bio}
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-[12px] text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          {creator.followers.toLocaleString()} followers
        </div>
      </div>
    </Link>
  );
}
