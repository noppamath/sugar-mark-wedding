import React from 'react';

interface PhotoTransitionProps {
  imageUrl: string;
  caption?: string;
  height?: 'sm' | 'md' | 'lg';
}

export default function PhotoTransition({ imageUrl, caption, height = 'md' }: PhotoTransitionProps) {
  const heightClasses = {
    sm: 'h-48 sm:h-64 md:h-80',
    md: 'h-64 sm:h-80 md:h-[500px] lg:h-[600px]',
    lg: 'h-72 sm:h-96 md:h-[600px] lg:h-screen',
  };

  return (
    <div className={`relative w-full ${heightClasses[height]} overflow-hidden`}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
      />

      {/* Gradient Overlay for Text Contrast */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Text Content */}
      {caption && (
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center px-4 drop-shadow-lg">
            {caption}
          </h2>
        </div>
      )}
    </div>
  );
}
