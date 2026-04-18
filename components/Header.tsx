'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-rose-500" />
          <span className="text-2xl font-bold text-gray-800">Sugar & Mark</span>
        </Link>
        <div className="flex gap-8">
          <Link href="/schedule" className="text-gray-700 hover:text-cyan-500 transition">
            Schedule
          </Link>
          <Link href="/venue" className="text-gray-700 hover:text-cyan-500 transition">
            Venue
          </Link>
          <Link href="/gallery" className="text-gray-700 hover:text-cyan-500 transition">
            Gallery
          </Link>
          <Link href="/upload" className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition">
            Share Photos
          </Link>
        </div>
      </nav>
    </header>
  );
}
