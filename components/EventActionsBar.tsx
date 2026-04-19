'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, Mail } from 'lucide-react';

const EVENT = {
  title: "Sugar & Mark's Wedding",
  description: 'Join us for our wedding celebration!',
  location: 'Renaissance Bangkok Ratchaprasong Hotel, Lumphini, Pathum Wan, Bangkok 10330, Thailand',
  /** Date/time in YYYYMMDDTHHMMSS (local, no timezone suffix) */
  startLocal: '20260614T180000',
  endLocal: '20260614T210000',
  /** ISO date range for Google Calendar (local floating) */
  googleDates: '20260614T180000/20260614T210000',
};

/** Google Calendar URL */
function googleCalendarUrl() {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: EVENT.title,
    dates: EVENT.googleDates,
    details: EVENT.description,
    location: EVENT.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Generate and trigger download of an .ics file */
function downloadIcs() {
  const uid = `sugar-mark-wedding-2026@wedding`;
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sugar & Mark Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTART:${EVENT.startLocal}`,
    `DTEND:${EVENT.endLocal}`,
    `SUMMARY:${EVENT.title}`,
    `DESCRIPTION:${EVENT.description}`,
    `LOCATION:${EVENT.location.replace(/,/g, '\\,')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sugar-mark-wedding.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function EventActionsBar({ onDark = false }: { onDark?: boolean }) {
  const [calOpen, setCalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCalOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const rsvpClass = onDark
    ? 'inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 active:bg-gray-200 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
    : 'inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 active:bg-primary-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

  const calClass = onDark
    ? 'inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-accent-600 active:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
    : 'inline-flex items-center gap-2 bg-accent-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-500 active:bg-accent-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400';

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-8">
      {/* RSVP Button */}
      <a
        href="https://docs.google.com/forms/d/1UUb3wTKpE9_P5R2ivSgUqOiH1coUA8AlZW7Lmoqhon4/viewform"
        target="_blank"
        rel="noopener noreferrer"
        className={rsvpClass}
        aria-label="RSVP to Sugar and Mark's Wedding"
      >
        <Mail className="w-5 h-5" aria-hidden="true" />
        RSVP
      </a>

      {/* Add to Calendar dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setCalOpen((prev) => !prev)}
          className={calClass}
          aria-haspopup="menu"
          aria-expanded={calOpen}
          aria-label="Add wedding to your calendar"
        >
          <Calendar className="w-5 h-5" aria-hidden="true" />
          Add to Calendar
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${calOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>

        {calOpen && (
          <div
            role="menu"
            className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50 overflow-hidden"
          >
            <a
              href={googleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors text-sm font-medium"
              onClick={() => setCalOpen(false)}
            >
              <span aria-hidden="true">📅</span> Google Calendar
            </a>
            <button
              type="button"
              role="menuitem"
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors text-sm font-medium"
              onClick={() => { downloadIcs(); setCalOpen(false); }}
            >
              <span aria-hidden="true">📥</span> Download .ics
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
