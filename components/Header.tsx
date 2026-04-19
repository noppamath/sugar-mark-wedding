'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui';

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  const navLinks = [
    { href: '/schedule', label: 'Schedule' },
    { href: '/venue', label: 'Venue' },
    { href: '/gallery', label: 'Gallery' },
  ];

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center" aria-label="Main navigation">
        <Link
          href="/"
          className="hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded"
          aria-label="Sugar & Mark Wedding Home"
        >
          <Image
            src="/logo-dark.png"
            alt="Sugar & Mark"
            width={120}
            height={48}
            className="h-12 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded px-2 py-1 ${
                isActive(href) ? 'text-primary-600 font-semibold' : 'text-gray-700 hover:text-primary-500'
              }`}
              aria-current={isActive(href) ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
          <Button
            href="/upload"
            variant="primary"
            size="md"
            className="ml-4"
            aria-current={isActive('/upload') ? 'page' : undefined}
          >
            Share Photos
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded text-gray-700 hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 flex flex-col gap-2">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded text-base transition-colors ${
                isActive(href) ? 'text-primary-600 font-semibold bg-primary-50' : 'text-gray-700 hover:text-primary-500 hover:bg-gray-50'
              }`}
              aria-current={isActive(href) ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
          <Button
            href="/upload"
            variant="primary"
            size="md"
            className="mt-2 w-full"
            onClick={() => setMobileOpen(false)}
          >
            Share Photos
          </Button>
        </div>
      )}
    </header>
  );
}
