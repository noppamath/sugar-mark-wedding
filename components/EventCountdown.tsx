'use client';

import { useState, useEffect } from 'react';

export default function EventCountdown() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const eventDate = new Date('2026-06-14').getTime();
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="text-center">
      <div className="bg-primary-500 text-white rounded-lg p-4 min-w-20">
        <div className="text-3xl font-bold" aria-hidden="true">{String(value).padStart(2, '0')}</div>
      </div>
      <div className="text-gray-600 mt-2 font-semibold">{label}</div>
    </div>
  );

  const countdownText = `${countdown.days} days, ${countdown.hours} hours, ${countdown.minutes} minutes, and ${countdown.seconds} seconds until the wedding`;

  return (
    <div
      className="flex justify-center gap-4"
      aria-live="polite"
      aria-atomic="true"
      aria-label={countdownText}
      role="status"
    >
      <TimeUnit value={countdown.days} label="Days" />
      <TimeUnit value={countdown.hours} label="Hours" />
      <TimeUnit value={countdown.minutes} label="Minutes" />
      <TimeUnit value={countdown.seconds} label="Seconds" />
    </div>
  );
}
