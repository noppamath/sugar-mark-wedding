'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { MapPin, ExternalLink, CheckCircle } from 'lucide-react';

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

export default function VenuePage() {
  const [venue, setVenue] = useState<VenueData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVenue = async () => {
      try {
        const response = await fetch('/data/venue.json');
        const data = await response.json();
        setVenue(data);
      } catch (error) {
        console.error('Failed to load venue:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVenue();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <main id="main-content" className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div>Loading venue information...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!venue) {
    return (
      <>
        <Header />
        <main id="main-content" className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div>Failed to load venue information</div>
        </main>
        <Footer />
      </>
    );
  }

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(venue.name + ', ' + venue.address)}&output=embed&z=16`;

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
            {venue.name}
          </h1>
          <p className="text-center text-primary-600 font-semibold text-lg mb-3">Royal Maneeya Ballroom</p>
          <p className="text-center text-gray-600 mb-12">{venue.description}</p>

          {/* Address & Maps link */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <MapPin className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-800 mb-1">Address</p>
                <p className="text-gray-600">{venue.address}</p>
              </div>
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

          {/* Map embed */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map showing ${venue.name}`}
            />
          </div>

          {/* Directions */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Getting There</h2>
            <p className="text-gray-700">{venue.directions}</p>
          </div>

          {/* Accessibility */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Accessibility</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle className={`w-5 h-5 flex-shrink-0 ${venue.accessibility.wheelchair ? 'text-green-500' : 'text-gray-300'}`} />
                <span>Wheelchair Accessible</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className={`w-5 h-5 flex-shrink-0 ${venue.accessibility.elevator ? 'text-green-500' : 'text-gray-300'}`} />
                <span>Elevator</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className={`w-5 h-5 flex-shrink-0 ${venue.accessibility.parking ? 'text-green-500' : 'text-gray-300'}`} />
                <span>Accessible Parking</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
