'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { Heart, Clock, Users } from 'lucide-react';

interface Ceremony {
  title: string;
  duration: string;
  location: string;
  startTime: string;
  description: string;
  participants: Array<{ name: string; role: string }>;
  specialMoments: Array<{ time: string; description: string }>;
  traditions: string[];
  notes: string;
}

export default function CeremonyPage() {
  const [ceremony, setCeremony] = useState<Ceremony | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCeremony = async () => {
      try {
        const response = await fetch('/data/ceremony.json');
        const data = await response.json();
        setCeremony(data);
      } catch (error) {
        console.error('Failed to load ceremony:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCeremony();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div>Loading ceremony information...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!ceremony) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div>Failed to load ceremony information</div>
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
            <Heart className="w-10 h-10 text-rose-500 fill-rose-500" />
            {ceremony.title}
          </h1>

          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-rose-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Time</p>
                  <p className="text-gray-600">{ceremony.startTime}</p>
                  <p className="text-sm text-gray-500">Duration: {ceremony.duration}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="w-6 h-6 text-rose-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Location</p>
                  <p className="text-gray-600">{ceremony.location}</p>
                </div>
              </div>
              <div></div>
            </div>
            <p className="text-gray-700 mt-6">{ceremony.description}</p>
          </div>

          {/* Key Participants */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-rose-500" />
              Key Participants
            </h2>
            <div className="space-y-4">
              {ceremony.participants.map((participant, index) => (
                <div key={index} className="border-l-4 border-rose-500 pl-4">
                  <p className="font-semibold text-gray-800">{participant.name}</p>
                  <p className="text-rose-500 text-sm">{participant.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Ceremony Timeline</h2>
            <div className="space-y-4">
              {ceremony.specialMoments.map((moment, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-20 flex-shrink-0">
                    <div className="bg-rose-100 rounded-lg p-2 text-center">
                      <p className="font-bold text-rose-600 text-sm">{moment.time}</p>
                    </div>
                  </div>
                  <div className="flex-grow pt-2">
                    <p className="text-gray-700">{moment.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Traditions */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Traditions</h2>
            <ul className="space-y-2">
              {ceremony.traditions.map((tradition, index) => (
                <li key={index} className="text-gray-700 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  {tradition}
                </li>
              ))}
            </ul>
          </div>

          {/* Important Notes */}
          <div className="bg-rose-50 rounded-lg p-8 border-l-4 border-rose-500">
            <p className="text-gray-700">{ceremony.notes}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
