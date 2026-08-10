'use client';

import { useEffect, useState } from 'react';
import { Bookmark } from 'lucide-react';

type Props = {
  assetId?: string;
  scenepackId?: string;
  presetId?: string;
  audioId?: string;
};

function getStorageKey(props: Props): string {
  if (props.assetId) return `bm_a_${props.assetId}`;
  if (props.scenepackId) return `bm_s_${props.scenepackId}`;
  if (props.presetId) return `bm_p_${props.presetId}`;
  if (props.audioId) return `bm_au_${props.audioId}`;
  return '';
}

export default function BookmarkButton(props: Props) {
  const [bookmarked, setBookmarked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const key = getStorageKey(props);
    if (key && typeof window !== 'undefined') {
      setBookmarked(localStorage.getItem(key) === '1');
    }
  }, [props.assetId, props.scenepackId, props.presetId, props.audioId]);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!mounted) return;
    const key = getStorageKey(props);
    if (!key) return;
    const next = !bookmarked;
    setBookmarked(next);
    localStorage.setItem(key, next ? '1' : '0');
  };

  return (
    <button
      onClick={toggle}
      aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
      className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-200 active:scale-90 ${
        bookmarked
          ? 'bg-foreground text-background border-foreground'
          : 'bg-black/30 text-white border-white/20 hover:bg-black/50'
      }`}
    >
      <Bookmark
        className="w-4 h-4"
        fill={bookmarked ? 'currentColor' : 'none'}
        strokeWidth={2}
      />
    </button>
  );
}
