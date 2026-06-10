import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { ExperienceSection } from '@/components/home/ExperienceSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { PromoBanner } from '@/components/home/PromoBanner';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedProducts />
      <ExperienceSection />
      <TestimonialsSection />
      <PromoBanner />
    </main>
  );
}
