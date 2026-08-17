import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  metadataBase: new URL('https://edithub.app'),
  title: 'EditHub — The hub for creative editors',
  description:
    'Discover free scenepacks, buy premium editing assets, and request clips from your favourite movies and shows. Built for creative editors.',
  openGraph: {
    title: 'EditHub — The hub for creative editors',
    description:
      'Discover free scenepacks, buy premium editing assets, and request clips from your favourite movies and shows.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EditHub — The hub for creative editors',
    description:
      'Discover free scenepacks, buy premium editing assets, and request clips from your favourite movies and shows.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
