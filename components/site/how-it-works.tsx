import { Search, Download, Palette } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Discover',
    description:
      'Browse scenepacks, overlays, presets, and more from a curated community of editors.',
  },
  {
    icon: Download,
    title: 'Download or Buy',
    description:
      'Get free scenepacks of your favourite movies or characters, or buy editing presets etc',
  },
  {
    icon: Palette,
    title: 'Create',
    description:
      'Drop assets and clips into your timeline and make edits that stand out. easy right?.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-[28px] font-semibold tracking-tight">
            How it works
          </h2>
          <p className="mt-2 text-[15px] text-muted-foreground">
            Three steps. No complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-5">
                <div className="w-12 h-12 rounded-2xl border border-border bg-card flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                </div>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <span className="text-[13px] font-medium text-muted-foreground/60">
                  0{i + 1}
                </span>
                <h3 className="text-[18px] font-semibold tracking-tight">
                  {step.title}
                </h3>
              </div>
              <p className="text-[15px] text-muted-foreground leading-relaxed max-w-xs mx-auto md:mx-0">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
