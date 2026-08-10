import { HeroSection } from "@/components/home/HeroSection";
import { ReelsSection } from "@/components/home/ReelsSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { VenueCtaSection } from "@/components/home/VenueCtaSection";
import {
  getBanners,
  getReels,
  getReviews,
  getSettings,
  getStats,
} from "@/lib/data";

export default async function HomePage() {
  const [banners, reels, reviews, stats, settings] = await Promise.all([
    getBanners(),
    getReels(),
    getReviews(),
    getStats(),
    getSettings(),
  ]);

  return (
    <>
      <HeroSection banners={banners} stats={stats} settings={settings} />
      <ReelsSection reels={reels} settings={settings} />
      <ReviewsSection reviews={reviews} settings={settings} />
      <VenueCtaSection settings={settings} />
    </>
  );
}
