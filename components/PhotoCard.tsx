'use client';

import { memo } from 'react';

interface PhotoCardProps {
  url: string;
  guestName?: string;
  uploadedAt?: string;
}

function PhotoCard({ url, guestName, uploadedAt }: PhotoCardProps) {
  const altText = guestName ? `Photo shared by ${guestName}` : 'Guest photo from wedding';
  
  return (
    <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative pb-full">
        <img
          src={url}
          alt={altText}
          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      {guestName && (
        <div className="p-3 bg-gray-50">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Shared by:</span> {guestName}
          </p>
          {uploadedAt && (
            <p className="text-xs text-gray-500">
              {new Date(uploadedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// Memoize component to prevent unnecessary re-renders
export default memo(PhotoCard);
