import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { HowItWorks } from '@/components/home/HowItWorks';
import { PromoBanner } from '@/components/home/PromoBanner';
import { RestaurantInfo } from '@/components/home/RestaurantInfo';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedProducts />
      <HowItWorks />
      <PromoBanner />
      <RestaurantInfo />
    </main>
  );
}
