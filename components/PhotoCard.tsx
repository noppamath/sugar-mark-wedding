'use client';

interface PhotoCardProps {
  url: string;
  guestName?: string;
  uploadedAt?: string;
}

export default function PhotoCard({ url, guestName, uploadedAt }: PhotoCardProps) {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
      <div className="relative pb-full">
        <img
          src={url}
          alt="Guest photo"
          className="w-full h-64 object-cover hover:scale-105 transition duration-300"
        />
      </div>
      {guestName && (
        <div className="p-3 bg-gray-50">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Shared by:</span> {guestName}
          </p>
          {uploadedAt && (
            <p className="text-xs text-gray-500">
              {new Date(uploadedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
