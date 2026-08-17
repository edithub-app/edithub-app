type Props = {
  tags: string[];
};

export default function TagList({ tags }: Props) {
  return (
    <div className="mt-6 space-y-3">
      <h3 className="text-[15px] font-semibold">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1.5 rounded-lg border border-border/70 bg-secondary/40 text-[12px] text-muted-foreground capitalize"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
