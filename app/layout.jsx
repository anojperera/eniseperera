import './globals.css';
import { Fredoka, Caveat, Nunito } from 'next/font/google';
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL, NAV_ITEMS } from '@/lib/site';
import Link from 'next/link';
import MobileMenu from '@/app/components/MobileMenu';

const display = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});
const hand = Caveat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-hand',
  display: 'swap',
});
const body = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
});

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

const NAV_EMOJI = {
  '/projects': '🎨',
  '/swimming': '🌊',
  '/music': '🎵',
  '/hockey': '🏑',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${hand.variable} ${body.variable}`}>
      <body className="min-h-screen flex flex-col">
        {/* Dreamy floating doodles in the sky behind everything */}
        <div className="sky" aria-hidden="true">
          <span className="float-bit" style={{ left: '6%', top: '12%', animationDelay: '0s' }}>🌸</span>
          <span className="float-bit" style={{ left: '88%', top: '8%', animationDelay: '1.4s' }}>✨</span>
          <span className="float-bit" style={{ left: '78%', top: '34%', animationDelay: '2.1s' }}>💗</span>
          <span className="float-bit" style={{ left: '14%', top: '46%', animationDelay: '3s' }}>⭐</span>
          <span className="float-bit" style={{ left: '92%', top: '64%', animationDelay: '0.7s' }}>🎀</span>
          <span className="float-bit" style={{ left: '4%', top: '74%', animationDelay: '2.6s' }}>🫧</span>
          <span className="float-bit" style={{ left: '50%', top: '90%', animationDelay: '1.9s' }}>🌷</span>
        </div>

        <header className="site-head">
          <div className="max-w-5xl mx-auto flex items-center justify-between px-4 h-[72px]">
            <Link href="/" className="brand">
              <span className="brand-badge">E</span>
              <span className="brand-text">Enise<span className="brand-dot">.</span></span>
            </Link>

            <nav className="hidden md:flex md:items-center md:gap-2">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} className="tab">
                  <span className="tab-emoji">{NAV_EMOJI[item.href]}</span>
                  {item.label}
                </Link>
              ))}
            </nav>

            <MobileMenu />
          </div>
        </header>

        <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 sm:py-12 relative z-10">
          {children}
        </main>

        <footer className="site-foot">
          <div className="wave-top" aria-hidden="true" />
          <div className="max-w-5xl mx-auto px-4 py-10 text-center">
            <div className="foot-hand">made with 💗, music & a little bit of magic</div>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-[var(--text-muted)]">
              <span>© {new Date().getFullYear()} Enise Perera</span>
              <span className="text-[var(--pink-300)]">•</span>
              <a href="/feed.xml" className="foot-link">RSS feed</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
