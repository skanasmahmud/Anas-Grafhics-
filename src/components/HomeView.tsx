import React from 'react';
import { HeroSection } from './HeroSection';
import { PopularCategoriesSection } from './PopularCategoriesSection';
import { FeaturedServicesSection } from './FeaturedServicesSection';
import { DigitalResourcesSpotlight } from './DigitalResourcesSpotlight';
import { PopularSellersSection } from './PopularSellersSection';
import { HowItWorksSection } from './HowItWorksSection';
import { TestimonialsSection } from './TestimonialsSection';
import { CtaSection } from './CtaSection';

export const HomeView: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <HeroSection />
      <PopularCategoriesSection />
      <FeaturedServicesSection />
      <DigitalResourcesSpotlight />
      <PopularSellersSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
};
