'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCountdown from '@/components/EventCountdown';
import AnimatedSection from '@/components/AnimatedSection';
import PhotoTransition from '@/components/PhotoTransition';
import { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Camera, Loader, Heart } from 'lucide-react';
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
  phone: string;
  email: string;
  amenities: string[];
  parking: {
    available: boolean;
    spaces: number;
    valet: boolean;
    cost: string;
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
  const [photos, setPhotos] = useState<Photo[]>([]);
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
        const res = await fetch('/api/gallery-images');
        const data = await res.json();
        setPhotos(data.photos || []);
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
    const interval = setInterval(loadPhotos, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <AnimatedSection>
          <section className="bg-gradient-to-b from-cyan-50 to-white py-20">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h1 className="text-6xl font-bold text-gray-800 mb-4">
                Sugar & Mark
              </h1>
              <p className="text-2xl text-gray-600 mb-2">are getting married</p>
              <p className="text-xl text-cyan-500 font-semibold mb-8">June 14, 2026</p>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join us for an unforgettable celebration of love and commitment
              </p>
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
                <Heart className="w-12 h-12 text-cyan-500 mx-auto mb-6" />
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

        {/* Schedule Section */}
        <AnimatedSection delay={600}>
          <section className="bg-white py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Wedding Day Schedule
              </h2>
              <div className="space-y-6">
                {schedule?.map((event, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-cyan-50 to-white rounded-lg shadow-md p-6 border-l-4 border-cyan-500 hover:shadow-lg transition"
                  >
                    <div className="flex gap-6 items-start">
                      <div className="w-16 h-16 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-8 h-8 text-cyan-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                          <div className="text-2xl font-bold text-cyan-500">
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

        {/* Transition Photo 2 */}
        {transitionImages[1] && (
          <AnimatedSection delay={700}>
            <PhotoTransition imageUrl={transitionImages[1].url} height="md" />
          </AnimatedSection>
        )}

        {/* Venue Section */}
        <AnimatedSection delay={800}>
          <section className="bg-gray-50 py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                The Venue
              </h2>
              {venue && (
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">{venue.name}</h3>

                  <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b">
                    <div>
                      <div className="flex gap-4 mb-6">
                        <MapPin className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-gray-800">{venue.address}</p>
                          <p className="text-gray-600 text-sm mt-1">Capacity: 200 guests</p>
                        </div>
                      </div>
                      <div className="flex gap-4 mb-6">
                        <Phone className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                        <p className="text-gray-700">{venue.phone}</p>
                      </div>
                      <div className="flex gap-4">
                        <Mail className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                        <p className="text-gray-700">{venue.email}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-800 mb-4">✨ Amenities</h4>
                      <ul className="space-y-2">
                        {venue.amenities?.map((amenity, i) => (
                          <li key={i} className="text-gray-700 flex items-center gap-2">
                            <span className="text-cyan-500">✓</span> {amenity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-gray-800 mb-3">🚗 Parking</h4>
                      <p className="text-gray-700">
                        {typeof venue.parking === 'string' 
                          ? venue.parking 
                          : `${venue.parking?.spaces || 0} spaces - ${venue.parking?.cost || 'Free'} (Valet: ${venue.parking?.valet ? 'Yes' : 'No'})`}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-3">♿ Accessibility</h4>
                      <ul className="space-y-1">
                        {typeof venue.accessibility === 'object' && !Array.isArray(venue.accessibility) ? (
                          Object.entries(venue.accessibility).map(([key, value]) => (
                            value && (
                              <li key={key} className="text-gray-700 flex items-center gap-2">
                                <span className="text-cyan-500">✓</span> 
                                {key === 'wheelchair' ? 'Wheelchair Access' : 
                                 key === 'elevator' ? 'Elevator Access' : 
                                 key === 'parking' ? 'Accessible Parking' : key}
                              </li>
                            )
                          ))
                        ) : Array.isArray(venue.accessibility) ? (
                          venue.accessibility.map((item, i) => (
                            <li key={i} className="text-gray-700 flex items-center gap-2">
                              <span className="text-cyan-500">✓</span> {item}
                            </li>
                          ))
                        ) : null}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
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
              <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                Guest Photos
              </h2>
              <p className="text-center text-gray-600 mb-12">
                Share your favorite moments from the celebration
              </p>

              {loadingPhotos ? (
                <div className="flex justify-center">
                  <Loader className="w-8 h-8 animate-spin text-cyan-500" />
                </div>
              ) : photos.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-16 text-center">
                  <Camera className="w-16 h-16 text-cyan-500 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-semibold text-gray-800 mb-2">No photos yet</p>
                  <p className="text-gray-600 mb-8">Be the first to share a photo from the celebration!</p>
                  <Link
                    href="/upload"
                    className="inline-block bg-cyan-500 text-white px-8 py-3 rounded-lg hover:bg-cyan-600 transition font-semibold"
                  >
                    Upload a Photo
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {photos.map((photo) => (
                      <div key={photo.id} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition hover:scale-105 transform duration-300">
                        <img
                          src={photo.url}
                          alt={photo.guestName}
                          className="w-full h-64 object-cover"
                        />
                        <div className="bg-white p-4">
                          <p className="font-semibold text-gray-800">{photo.guestName}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(photo.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <Link
                      href="/upload"
                      className="inline-block bg-cyan-500 text-white px-8 py-3 rounded-lg hover:bg-cyan-600 transition font-semibold"
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
          <section className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-16">
            <div className="max-w-4xl mx-auto text-center px-4">
              <h2 className="text-4xl font-bold mb-6">Can't Wait to See You! 💕</h2>
              <p className="text-lg mb-8 opacity-90">
                We'd love to have you celebrate this special day with us on June 14, 2026.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link
                  href="/upload"
                  className="bg-white text-cyan-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  📸 Share Your Photos
                </Link>
                <Link
                  href="/venue"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-cyan-500 transition"
                >
                  📍 View Venue Details
                </Link>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </main>
      <Footer />
    </>
  );
}
