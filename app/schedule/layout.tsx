import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule | Sugar & Mark's Wedding",
  description: "View the complete timeline for Sugar & Mark's wedding celebration. Ceremony, reception, cocktail hour, and more.",
  openGraph: {
    title: "Wedding Schedule",
    description: "View the complete timeline for our wedding celebration",
    type: "website",
  },
};

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
