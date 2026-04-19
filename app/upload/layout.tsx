import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload | Sugar & Mark's Wedding",
  description: "Share your photos from Sugar & Mark's wedding celebration. Upload your favorite moments to our guest gallery.",
  openGraph: {
    title: "Share Your Photos",
    description: "Upload your favorite wedding moments to our gallery",
    type: "website",
  },
};

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
