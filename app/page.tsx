'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCountdown from '@/components/EventCountdown';
import AnimatedSection from '@/components/AnimatedSection';
import PhotoTransition from '@/components/PhotoTransition';
import EventActionsBar from '@/components/EventActionsBar';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MapPin, ExternalLink, Clock, Camera, Loader } from 'lucide-react';
import Link from 'next/link';

interface ScheduleEvent {
  time: string;
  title: string;
  description: string;
  location: string;
}

interface VenueData {
  name: string;
  address: string;
  mapsUrl: string;
  description: string;
  directions: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  accessibility: {
    wheelchair: boolean;
    elevator: boolean;
    parking: boolean;
  };
}



interface Photo {
  id: string;
  url: string;
  guestName: string;
  uploadedAt: string;
}

export default function Home() {
  const [schedule, setSchedule] = useState<ScheduleEvent[]>([]);
  const [venue, setVenue] = useState<VenueData | null>(null);
  const [galleryPhotos, setGalleryPhotos] = useState<Photo[]>([]);
  const [guestPhotos, setGuestPhotos] = useState<Photo[]>([]);
  const [transitionImages, setTransitionImages] = useState<Array<{ id: string; url: string }>>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);

  useEffect(() => {
    fetch('/data/schedule.json')
      .then((res) => res.json())
      .then((data) => setSchedule(data.events || []))
      .catch(console.error);

    fetch('/data/venue.json')
      .then((res) => res.json())
      .then((data) => setVenue(data))
      .catch(console.error);

    const loadPhotos = async () => {
      setLoadingPhotos(true);
      try {
        const [galleryRes, guestRes] = await Promise.all([
          fetch('/api/gallery-images'),
          fetch('/api/guest-photos'),
        ]);
        const [galleryData, guestData] = await Promise.all([
          galleryRes.json(),
          guestRes.json(),
        ]);
        setGalleryPhotos(galleryData.photos || []);
        setGuestPhotos(guestData.photos || []);
      } catch (error) {
        console.error('Error loading photos:', error);
      } finally {
        setLoadingPhotos(false);
      }
    };

    const loadTransitionImages = async () => {
      try {
        const res = await fetch('/api/transition-images');
        const data = await res.json();
        setTransitionImages(data.photos || []);
      } catch (error) {
        console.error('Error loading transition images:', error);
      }
    };

    loadPhotos();
    loadTransitionImages();
    // Reduced polling interval from 30s to 60s for better performance
    const interval = setInterval(loadPhotos, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <AnimatedSection>
          <section className="bg-gradient-to-b from-primary-50 to-white py-20">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h1 className="sr-only">Sugar & Mark</h1>
              <Image
                src="/logo-dark.png"
                alt="Sugar & Mark"
                width={600}
                height={240}
                className="h-60 w-auto mx-auto mb-6"
                priority
              />
              <p className="text-2xl text-gray-600 mb-2">are getting married</p>
              <p className="text-4xl text-primary-500 font-semibold mb-8">June 14, 2026</p>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join us for an unforgettable celebration of love and commitment
              </p>
              <EventActionsBar />
            </div>
          </section>
        </AnimatedSection>

        {/* Countdown Section */}
        <AnimatedSection delay={200}>
          <section className="bg-white py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Time Until the Big Day
              </h2>
              <EventCountdown />
            </div>
          </section>
        </AnimatedSection>

        {/* Welcome Section */}
        <AnimatedSection delay={400}>
          <section className="bg-gray-50 py-16">
            <div className="max-w-6xl mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <span className="text-5xl text-accent-400 mx-auto mb-6 block">♥</span>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                  We're thrilled you're here!
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Scroll down to explore all the details about our special day, 
                  then help us capture the memories by sharing your favorite moments!
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Transition Photo 1 */}
        {transitionImages[0] && (
          <AnimatedSection delay={500}>
            <PhotoTransition imageUrl={transitionImages[0].url} height="md" />
          </AnimatedSection>
        )}

        {/* Venue Section */}
        <AnimatedSection delay={600}>
          <section className="bg-white py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                The Venue
              </h2>
              {venue && (
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {/* Map embed */}
                  <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(venue.name + ', ' + venue.address)}&output=embed&z=16`}
                    width="100%"
                    height="380"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map showing ${venue.name}`}
                  />
                  {/* Venue info below map */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{venue.name}</h3>
                    <p className="text-primary-600 font-semibold mb-3">Royal Maneeya Ballroom</p>
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-600">{venue.address}</p>
                    </div>
                    <a
                      href={venue.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              )}
            </div>
          </section>
        </AnimatedSection>

        {/* Transition Photo 2 */}
        {transitionImages[1] && (
          <AnimatedSection delay={700}>
            <PhotoTransition imageUrl={transitionImages[1].url} height="md" />
          </AnimatedSection>
        )}

        {/* Schedule Section */}
        <AnimatedSection delay={800}>
          <section className="bg-gray-50 py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Wedding Day Schedule
              </h2>
              <div className="space-y-6">
                {schedule?.map((event, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-primary-50 to-white rounded-lg shadow-md p-6 border-l-4 border-primary-500 hover:shadow-lg transition"
                  >
                    <div className="flex gap-6 items-start">
                      <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-8 h-8 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                          <div className="text-2xl font-bold text-primary-500">
                            {event.time}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{event.description}</p>
                        <p className="text-gray-500 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Transition Photo 3 */}
        {transitionImages[2] && (
          <AnimatedSection delay={900}>
            <PhotoTransition imageUrl={transitionImages[2].url} height="md" />
          </AnimatedSection>
        )}

        {/* Gallery Section */}
        <AnimatedSection delay={1200}>
          <section className="bg-gray-50 py-16">
            <div className="max-w-6xl mx-auto px-4">

              {/* Curated Gallery */}
              <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Gallery</h2>
              <p className="text-center text-gray-500 mb-10">A curated collection from Sugar & Mark</p>

              {loadingPhotos ? (
                <div className="flex justify-center mb-16">
                  <Loader className="w-8 h-8 animate-spin text-primary-500" />
                </div>
              ) : galleryPhotos.length === 0 ? (
                <p className="text-center text-gray-400 mb-16">No gallery photos yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                  {galleryPhotos.map((photo) => (
                    <div key={photo.id} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition hover:scale-105 transform duration-300">
                      <img src={photo.url} alt="Gallery photo" className="w-full h-64 object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {/* Guest Photos */}
              <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Guest Photos</h2>
              <p className="text-center text-gray-500 mb-10">Moments shared by our guests</p>

              {guestPhotos.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-16 text-center">
                  <Camera className="w-16 h-16 text-primary-500 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-semibold text-gray-800 mb-2">No guest photos yet</p>
                  <p className="text-gray-600 mb-8">Be the first to share a photo from the celebration!</p>
                  <Link
                    href="/upload"
                    className="inline-block bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition font-semibold"
                  >
                    Upload a Photo
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {guestPhotos.map((photo) => (
                      <div key={photo.id} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition hover:scale-105 transform duration-300">
                        <img src={photo.url} alt="Guest photo" className="w-full h-64 object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <Link
                      href="/upload"
                      className="inline-block bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition font-semibold"
                    >
                      Share More Photos
                    </Link>
                  </div>
                </div>
              )}

            </div>
          </section>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection delay={1400}>
          <section className="bg-gradient-to-r from-primary-500 to-accent-400 text-white py-16">
            <div className="max-w-4xl mx-auto text-center px-4">
              <Image
                src="/logo-white.png"
                alt="Sugar & Mark"
                width={360}
                height={144}
                className="h-36 w-auto mx-auto mb-6"
              />
              <h2 className="text-4xl font-bold mb-6">Can't Wait to See You! 💕</h2>
              <p className="text-lg mb-8 opacity-90">
                We'd love to have you celebrate this special day with us on June 14, 2026.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link
                  href="/upload"
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  📸 Share Your Photos
                </Link>
                <Link
                  href="/venue"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition"
                >
                  📍 View Venue Details
                </Link>
              </div>
              <EventActionsBar onDark />
            </div>
          </section>
        </AnimatedSection>
      </main>
      <Footer />
    </>
  );
}
