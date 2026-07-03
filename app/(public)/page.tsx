import HeroSection from "@/components/home/HeroSection";
import QuickBookingBar from "@/components/home/QuickBookingBar";
import PoolHighlight from "@/components/home/PoolHighlight";
import ExperienceSection from "@/components/home/ExperienceSection";
import PackagesPreview from "@/components/home/PackagesPreview";
import GalleryPreview from "@/components/home/GalleryPreview";
import AboutPreview from "@/components/home/AboutPreview";
import ReviewsSection from "@/components/home/ReviewsSection";
import LocationSection from "@/components/home/LocationSection";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="md:hidden">
        <QuickBookingBar />
      </div>
      <ExperienceSection />
      <PackagesPreview />
      <PoolHighlight />
      <GalleryPreview />
      <AboutPreview />
      <ReviewsSection />
      <LocationSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
