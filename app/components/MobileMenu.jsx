'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/site';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden relative">
      <button
        onClick={toggleMenu}
        className="btn btn-ghost p-3 list-none cursor-pointer min-h-[44px] flex items-center"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <nav className="absolute right-0 mt-2 bg-white border border-[var(--border)] rounded-2xl p-2 shadow w-44 z-50">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="block px-4 py-3 rounded-xl hover:bg-[var(--pink-50)] text-base min-h-[44px] flex items-center"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
