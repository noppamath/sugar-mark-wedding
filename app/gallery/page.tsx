'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PhotoCard from '@/components/PhotoCard';
import { Button } from '@/components/ui';
import { useEffect, useState } from 'react';
import { Camera, Loader, Images } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
  guestName: string;
  uploadedAt: string;
}

export default function GalleryPage() {
  const [galleryPhotos, setGalleryPhotos] = useState<Photo[]>([]);
  const [guestPhotos, setGuestPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [galleryRes, guestRes] = await Promise.all([
          fetch('/api/gallery-images'),
          fetch('/api/photos'),
        ]);
        const [galleryData, guestData] = await Promise.all([
          galleryRes.json(),
          guestRes.json(),
        ]);
        setGalleryPhotos(galleryData.photos || []);
        setGuestPhotos(guestData.photos || []);
      } catch (error) {
        console.error('Failed to load photos:', error);
      } finally {
        setLoading(false);
      }
    };

    load();
    const interval = setInterval(load, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-12">

          {loading ? (
            <div className="flex items-center justify-center gap-2 py-24">
              <Loader className="w-6 h-6 animate-spin text-primary-500" aria-hidden="true" />
              <span>Loading gallery...</span>
            </div>
          ) : (
            <>
              {/* Curated Gallery */}
              <section className="mb-20">
                <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3 mb-2">
                  <Images className="w-10 h-10 text-primary-500" aria-hidden="true" />
                  Gallery
                </h1>
                <p className="text-gray-500 mb-8">A curated collection from Sugar & Mark</p>

                {galleryPhotos.length === 0 ? (
                  <div className="bg-white rounded-lg p-12 text-center text-gray-400">
                    No gallery photos yet.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryPhotos.map((photo) => (
                      <PhotoCard key={photo.id} url={photo.url} />
                    ))}
                  </div>
                )}
              </section>

              {/* Guest Photos */}
              <section>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <Camera className="w-8 h-8 text-accent-400" aria-hidden="true" />
                    Guest Photos
                  </h2>
                  <Button href="/upload" variant="primary" size="md">
                    Share Your Photos
                  </Button>
                </div>
                <p className="text-gray-500 mb-8">Moments shared by our guests</p>

                {guestPhotos.length === 0 ? (
                  <div className="bg-white rounded-lg p-12 text-center">
                    <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" aria-hidden="true" />
                    <p className="text-lg font-semibold text-gray-800 mb-2">No guest photos yet</p>
                    <p className="text-gray-600 mb-6">Be the first to share your memories!</p>
                    <Button href="/upload" variant="primary" size="lg">Upload Photos</Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {guestPhotos.map((photo) => (
                      <PhotoCard key={photo.id} url={photo.url} guestName={photo.guestName} />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}


  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
              <Camera className="w-10 h-10 text-accent-400" aria-hidden="true" />
              Photo Gallery
            </h1>
            <Button href="/upload" variant="secondary" size="md">
              Share Your Photos
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-2 py-12">
              <Loader className="w-6 h-6 animate-spin text-primary-500" aria-hidden="true" />
              <span>Loading gallery...</span>
            </div>
          ) : photos.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center">
              <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Gallery is Empty
              </h2>
              <p className="text-gray-600 mb-6">
                Be the first to share your memories from our wedding!
              </p>
              <Button href="/upload" variant="primary" size="lg">
                Upload Photos
              </Button>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-8">
                {photos.length} photo{photos.length !== 1 ? 's' : ''} shared by our guests
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {photos.map((photo) => (
                  <PhotoCard
                    key={photo.id}
                    url={photo.url}
                    guestName={photo.guestName}
                    uploadedAt={photo.uploadedAt}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
