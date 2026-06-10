import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { PromoBanner } from '@/components/home/PromoBanner';
import { RestaurantInfo } from '@/components/home/RestaurantInfo';
import { GoogleReviews } from '@/components/home/GoogleReviews';
import { MapBanner } from '@/components/home/MapBanner';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedProducts />
      <PromoBanner />
      <GoogleReviews />
      <MapBanner />
      <RestaurantInfo />
    </main>
  );
}
