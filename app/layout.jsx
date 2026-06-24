import './globals.css';
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL, NAV_ITEMS } from '@/lib/site';
import Link from 'next/link';
import { Menu } from 'lucide-react';

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
        {/* Top nav - cute and simple */}
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-[var(--border)]">
          <div className="max-w-5xl mx-auto flex items-center justify-between px-4 h-16">
            <Link href="/" className="font-bold text-xl tracking-tight text-[var(--pink-700)]">
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

            {/* Mobile menu trigger (simple for now) */}
            <details className="md:hidden relative">
              <summary className="btn btn-ghost p-3 list-none cursor-pointer min-h-[44px] flex items-center">
                <Menu size={20} />
              </summary>
              <nav className="absolute right-0 mt-2 bg-white border border-[var(--border)] rounded-2xl p-2 shadow w-44">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-3 rounded-xl hover:bg-[var(--pink-50)] text-base min-h-[44px] flex items-center"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </details>
          </div>
        </header>

        <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-10">
          {children}
        </main>

        <footer className="border-t border-[var(--border)] py-8 mt-auto text-center">
          <div className="max-w-5xl mx-auto px-4 text-sm flex flex-col sm:flex-row items-center justify-center gap-x-4 gap-y-1">
            <span>© {new Date().getFullYear()} Enise Perera — Made with love and lots of pink 💗</span>
            <a href="/feed.xml" className="text-[var(--accent)] hover:underline">RSS feed</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
