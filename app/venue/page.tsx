'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, ParkingCircle, CheckCircle } from 'lucide-react';

interface VenueData {
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  capacity: string;
  amenities: string[];
  parking: {
    available: boolean;
    spaces: number;
    valet: boolean;
    cost: string;
  };
  directions: string;
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
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
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
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div>Failed to load venue information</div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            {venue.name}
          </h1>
          <p className="text-center text-gray-600 mb-12">{venue.description}</p>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Address</p>
                  <p className="text-gray-600">{venue.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Phone</p>
                  <p className="text-gray-600">{venue.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-6 h-6 text-rose-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Email</p>
                  <p className="text-gray-600">{venue.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {venue.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                  <span className="text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Parking */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <ParkingCircle className="w-6 h-6 text-rose-500" />
              Parking
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Available:</span> {venue.parking.available ? 'Yes' : 'No'}
              </p>
              <p>
                <span className="font-semibold">Spaces:</span> {venue.parking.spaces}
              </p>
              <p>
                <span className="font-semibold">Valet:</span> {venue.parking.valet ? 'Available' : 'Not available'}
              </p>
              <p>
                <span className="font-semibold">Cost:</span> {venue.parking.cost}
              </p>
            </div>
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
