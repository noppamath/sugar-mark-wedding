import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCountdown from '@/components/EventCountdown';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-rose-50 to-white py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">
              Sugar & Mark
            </h1>
            <p className="text-2xl text-gray-600 mb-2">are getting married</p>
            <p className="text-xl text-rose-500 font-semibold">June 14, 2026</p>
          </div>
        </section>

        {/* Countdown Section */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Time Until the Big Day
            </h2>
            <EventCountdown />
          </div>
        </section>

        {/* Welcome Section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Heart className="w-12 h-12 text-rose-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                We're thrilled you're here!
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join us for an unforgettable celebration of love and commitment. 
                Explore all the details about our special day, then help us capture 
                the memories by sharing your favorite moments!
              </p>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Explore the Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/schedule" className="p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-gray-800 mb-2">📅 Schedule</h3>
                <p className="text-gray-600">View the timeline of events for our wedding day</p>
              </Link>
              <Link href="/venue" className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-gray-800 mb-2">📍 Venue</h3>
                <p className="text-gray-600">Learn about our beautiful venue and location</p>
              </Link>
              <Link href="/ceremony" className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-gray-800 mb-2">💍 Ceremony</h3>
                <p className="text-gray-600">Details about our wedding ceremony</p>
              </Link>
              <Link href="/gallery" className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-gray-800 mb-2">📸 Gallery</h3>
                <p className="text-gray-600">View photos shared by our guests</p>
              </Link>
              <Link href="/upload" className="p-6 bg-gradient-to-br from-rose-50 to-red-50 rounded-lg hover:shadow-lg transition md:col-span-2 lg:col-span-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">📷 Share Photos</h3>
                <p className="text-gray-600">Upload your favorite moments with us</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
