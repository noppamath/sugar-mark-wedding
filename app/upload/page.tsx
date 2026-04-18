'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UploadForm from '@/components/UploadForm';
import { useState } from 'react';

export default function UploadPage() {
  const [refreshGallery, setRefreshGallery] = useState(false);

  const handleUploadSuccess = () => {
    setRefreshGallery(!refreshGallery);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            Share Your Photos
          </h1>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Help us capture the memories of our special day. Share your favorite 
            moments from the wedding!
          </p>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <UploadForm onSuccess={handleUploadSuccess} />
          </div>

          {/* Guidelines */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">✓ Accepted Formats</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• JPEG (.jpg, .jpeg)</li>
                <li>• PNG (.png)</li>
                <li>• WebP (.webp)</li>
                <li>• Maximum 10MB per photo</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">📋 Guidelines</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Keep photos appropriate</li>
                <li>• Horizontal photos work best</li>
                <li>• High resolution preferred</li>
                <li>• You can share multiple photos</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
