'use client';

import { memo } from 'react';

interface PhotoCardProps {
  url: string;
  guestName?: string;
  uploadedAt?: string;
}

function PhotoCard({ url, guestName }: PhotoCardProps) {
  const altText = guestName ? `Photo shared by ${guestName}` : 'Wedding photo';

  return (
    <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img
        src={url}
        alt={altText}
        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>
  );
}

// Memoize component to prevent unnecessary re-renders
export default memo(PhotoCard);
