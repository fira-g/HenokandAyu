import {
  HeroSection,
  CountdownSection,
  StorySection,
  QuoteSection,
  TimelineSection,
  CTASection,
  HomeFooter,
} from "@/components/sections";

export default function HomePage() {
  return (
    <div className="animate-fade-up">
      <HeroSection />
      <CountdownSection />
      <StorySection />
      <QuoteSection />
      <TimelineSection />
      <CTASection />
      <HomeFooter />
    </div>
  );
}
