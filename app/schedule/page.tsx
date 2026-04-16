'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { Clock, MapPin } from 'lucide-react';

interface Event {
  id: number;
  time: string;
  title: string;
  description: string;
  location: string;
}

export default function SchedulePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        const response = await fetch('/data/schedule.json');
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error('Failed to load schedule:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSchedule();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">
            Wedding Schedule
          </h1>

          {loading ? (
            <div className="text-center py-8">Loading schedule...</div>
          ) : (
            <div className="space-y-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-rose-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-8 h-8 text-rose-600" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800">
                            {event.title}
                          </h3>
                          <p className="text-gray-600 mt-1">{event.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-rose-500">
                            {event.time}
                          </div>
                          <div className="flex items-center gap-1 text-gray-500 mt-2">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
