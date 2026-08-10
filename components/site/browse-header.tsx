'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, ArrowUpDown, Check, ChevronDown } from 'lucide-react';

export type CategoryPill = { label: string; value: string };

type SortOption = { label: string; value: string };

type Props = {
  title: string;
  subtitle?: string;
  search: string;
  onSearchChange: (value: string) => void;
  categories: CategoryPill[];
  activeCategory: string;
  onCategoryChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  sortOptions: SortOption[];
};

export default function BrowseHeader({
  title,
  subtitle,
  search,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange,
  sort,
  onSortChange,
  sortOptions,
}: Props) {
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const activeSort = sortOptions.find((o) => o.value === sort);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    }
    if (sortOpen) document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [sortOpen]);

  return (
    <div className="sticky top-16 z-40 -mx-6 px-6 py-5 bg-background/80 backdrop-blur-xl border-b border-border/60">
      <div className="mx-auto max-w-6xl">
        {/* Title row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-[24px] font-semibold tracking-tight">{title}</h1>
            {subtitle && (
              <p className="mt-1 text-[14px] text-muted-foreground">{subtitle}</p>
            )}
          </div>

          {/* Search + sort */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search…"
                className="w-full sm:w-64 pl-9 pr-3 py-2 text-[14px] rounded-xl bg-secondary/60 border border-border/60 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/20 transition-all duration-200"
              />
            </div>

            {/* Custom sort dropdown */}
            <div ref={sortRef} className="relative">
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="flex items-center gap-2 h-9 px-3.5 text-[14px] font-medium rounded-xl bg-secondary/60 border border-border/60 text-foreground hover:bg-secondary transition-all duration-200 cursor-pointer"
                aria-haspopup="listbox"
                aria-expanded={sortOpen}
              >
                <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                <span className="hidden sm:inline">
                  {activeSort?.label ?? 'Sort'}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {sortOpen && (
                <div
                  role="listbox"
                  className="absolute right-0 mt-2 w-52 p-1.5 rounded-2xl border border-border/60 bg-popover shadow-xl shadow-black/5 backdrop-blur-xl origin-top-right animate-in fade-in-0 zoom-in-95 duration-150"
                >
                  <p className="px-3 pt-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Sort by
                  </p>
                  {sortOptions.map((opt) => {
                    const active = sort === opt.value;
                    return (
                      <button
                        key={opt.value}
                        role="option"
                        aria-selected={active}
                        onClick={() => {
                          onSortChange(opt.value);
                          setSortOpen(false);
                        }}
                        className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 text-[14px] rounded-xl transition-all duration-150 text-left ${
                          active
                            ? 'bg-secondary text-foreground font-medium'
                            : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                        }`}
                      >
                        {opt.label}
                        {active && <Check className="w-4 h-4 text-foreground" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category pills */}
        <div
          className="flex gap-2 overflow-x-auto -mx-6 px-6 scroll-smooth"
          style={{ scrollbarWidth: 'none' }}
        >
          {categories.map((cat) => {
            const active = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => onCategoryChange(cat.value)}
                className={`flex-none px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition-all duration-200 active:scale-[0.97] ${
                  active
                    ? 'bg-foreground text-background border-foreground shadow-sm'
                    : 'bg-secondary/50 text-muted-foreground border-border/60 hover:text-foreground hover:bg-secondary'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
