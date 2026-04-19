'use client';

import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <Image
                src="/logo-white.png"
                alt="Sugar & Mark"
                width={120}
                height={48}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-300">June 14, 2026</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Venue</h4>
            <p className="text-gray-300">Grand Ballroom Estate</p>
            <p className="text-gray-300">123 Wedding Lane</p>
            <p className="text-gray-300">Celebration City, CC 12345</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-gray-300">info@grandbollroom.com</p>
            <p className="text-gray-300">+1 (555) 123-4567</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Sugar & Mark Wedding. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
