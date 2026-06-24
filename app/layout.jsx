import './globals.css';
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL, NAV_ITEMS } from '@/lib/site';
import Link from 'next/link';
import MobileMenu from '@/app/components/MobileMenu';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: '/favicon.ico',
    apple: '/favicons/apple-touch-icon.png',
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: 'https://eniseperera-media.s3.eu-west-2.amazonaws.com/social_img.png' }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)]">
        {/* Awesome top nav - elevated with gradient and polish */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[var(--border)] shadow-sm">
          <div className="max-w-5xl mx-auto flex items-center justify-between px-4 h-16">
            <Link href="/" className="font-bold text-2xl tracking-tighter bg-gradient-to-r from-[var(--pink-800)] via-[var(--accent)] to-[var(--lavender)] bg-clip-text text-transparent hover:scale-105 transition-transform">
              Enise Perera ✨
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link px-3 py-1.5 md:px-4 md:py-2"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <MobileMenu />
          </div>
        </header>

        <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 sm:py-10">
          {children}
        </main>

        <footer className="py-10 mt-auto text-center border-t border-[var(--border)] bg-[var(--card)]/50">
          <div className="max-w-5xl mx-auto px-4 text-sm flex flex-col sm:flex-row items-center justify-center gap-x-4 gap-y-1">
            <span>© {new Date().getFullYear()} Enise Perera — Crafted with love, music & adventure 💗✨</span>
            <a href="/feed.xml" className="text-[var(--accent)] hover:text-[var(--accent-dark)] font-medium transition-colors">RSS feed</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
