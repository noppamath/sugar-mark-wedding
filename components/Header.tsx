'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui';

export default function Header() {
  const pathname = usePathname();

  // Determine active nav link
  const isActive = (href: string) => pathname === href;

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center" aria-label="Main navigation">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 rounded"
          aria-label="Sugar & Mark Wedding Home"
        >
          <Heart className="w-6 h-6 text-rose-500" aria-hidden="true" />
          <span className="text-2xl font-bold text-gray-800">Sugar & Mark</span>
        </Link>

        <div className="flex gap-8 items-center">
          <Link
            href="/schedule"
            className={`text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 rounded px-2 py-1 ${
              isActive('/schedule')
                ? 'text-cyan-600 font-semibold'
                : 'text-gray-700 hover:text-cyan-500'
            }`}
            aria-current={isActive('/schedule') ? 'page' : undefined}
          >
            Schedule
          </Link>

          <Link
            href="/venue"
            className={`text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 rounded px-2 py-1 ${
              isActive('/venue')
                ? 'text-cyan-600 font-semibold'
                : 'text-gray-700 hover:text-cyan-500'
            }`}
            aria-current={isActive('/venue') ? 'page' : undefined}
          >
            Venue
          </Link>

          <Link
            href="/gallery"
            className={`text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 rounded px-2 py-1 ${
              isActive('/gallery')
                ? 'text-cyan-600 font-semibold'
                : 'text-gray-700 hover:text-cyan-500'
            }`}
            aria-current={isActive('/gallery') ? 'page' : undefined}
          >
            Gallery
          </Link>

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
      </nav>
    </header>
  );
}
