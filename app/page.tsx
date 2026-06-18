import FeaturedListingsSection from "@/components/home/FeaturedListingsSection";
import HeroSection from "@/components/home/HeroSection";
import TrustGuideCTA from "@/components/home/TrustGuideCTA";
import TrustGuaranteeSection from "@/components/home/TrustGuaranteeSection";
import TrustStatsBar from "@/components/home/TrustStatsBar";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedListingsSection />
      <TrustStatsBar />
      <TrustGuaranteeSection />
      <TrustGuideCTA />
    </>
  );
}
