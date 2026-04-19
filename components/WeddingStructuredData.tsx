/**
 * Schema.org Structured Data for Wedding Event
 * This component provides JSON-LD structured data for search engines
 */

export function WeddingStructuredData() {
  const eventDate = "2026-06-14";
  const eventTime = "14:00:00";
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Sugar & Mark's Wedding Celebration",
    "description": "Join us for the celebration of Sugar & Mark's wedding. A day of love, joy, and cherished memories with family and friends.",
    "startDate": `${eventDate}T${eventTime}`,
    "endDate": `${eventDate}T23:59:59`,
    "location": {
      "@type": "Place",
      "name": "Wedding Venue",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
      }
    },
    "organizer": {
      "@type": "Person",
      "name": "Sugar & Mark"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://sugar-mark-wedding.vercel.app",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/PreOrder",
      "validFrom": "2026-04-01"
    },
    "image": "https://sugar-mark-wedding.vercel.app/og-image.jpg",
    "url": "https://sugar-mark-wedding.vercel.app"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default WeddingStructuredData;
