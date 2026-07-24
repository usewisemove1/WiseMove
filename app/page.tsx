import FeaturedListingsSection from "@/components/home/FeaturedListingsSection";
import HeroSection from "@/components/home/HeroSection";
import TrustGuideCTA from "@/components/home/TrustGuideCTA";
import TrustGuaranteeSection from "@/components/home/TrustGuaranteeSection";
import TrustStatsBar from "@/components/home/TrustStatsBar";
import SearchOrganisationBanner from "@/components/home/SearchOrganisationBanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SearchOrganisationBanner />
      <FeaturedListingsSection />
      <TrustStatsBar />
      <TrustGuaranteeSection />
      <TrustGuideCTA />
    </>
  );
}
