import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Venue | Sugar & Mark's Wedding",
  description: "Discover the beautiful wedding venue for Sugar & Mark's celebration. Location, directions, amenities, and accessibility information.",
  openGraph: {
    title: "Wedding Venue",
    description: "Discover our beautiful wedding venue with full details and directions",
    type: "website",
  },
};

export default function VenueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
