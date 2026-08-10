import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  Platform: [
    { label: 'Assets', href: '/assets' },
    { label: 'Scenepacks', href: '/scenepacks' },
    { label: 'Presets', href: '/presets' },
    { label: 'Audios', href: '/audios' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Terms', href: '/terms' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Copyright', href: '/copyright' },
    { label: 'Refunds', href: '/refunds' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo + tagline */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative w-8 h-8">
                <Image src="/logo.png" alt="EditHub" width={32} height={32} className="object-contain dark:invert" />
              </div>
              <span className="text-[17px] font-semibold tracking-tight">
                EditHub
              </span>
            </Link>
            <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed max-w-xs">
              The hub for creative editors. Discover, download, and create.
            </p>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-[13px] font-semibold text-foreground mb-4">
                {group}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-muted-foreground/60">
            © {new Date().getFullYear()} EditHub. All rights reserved.
          </p>
          <p className="text-[13px] text-muted-foreground/60">
            Built for creative editors.
          </p>
        </div>
      </div>
    </footer>
  );
}
