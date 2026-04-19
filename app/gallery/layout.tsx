import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Sugar & Mark's Wedding",
  description: "Browse guest photos from Sugar & Mark's wedding celebration. Share your favorite moments in our interactive gallery.",
  openGraph: {
    title: "Wedding Gallery",
    description: "Browse and share your favorite wedding moments",
    type: "website",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
