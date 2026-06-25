'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/site';

const EMOJI = {
  '/projects': '🎨',
  '/swimming': '🌊',
  '/music': '🎵',
  '/hockey': '🏑',
};

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden relative">
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="grid place-items-center w-11 h-11 rounded-2xl bg-white border-2 border-[var(--border)] text-[var(--pink-700)] shadow-[var(--pop-sm)] active:scale-95 transition-transform"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <nav className="absolute right-0 mt-3 card p-2 w-52 z-50">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[var(--pink-800)] font-semibold hover:bg-[var(--pink-50)] active:scale-[0.98] transition-all"
            >
              <span className="text-xl">{EMOJI[item.href]}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
