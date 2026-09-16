import HeroSection from "@/components/home/HeroSection";
import CurriculumSection from "@/components/home/CurriculumSection";
import ActivitiesSection from "@/components/home/ActivitiesSection";
import ReviewsSection from "@/components/home/ReviewsSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full bg-background">
      <HeroSection />
      <CurriculumSection />
      <ActivitiesSection />
      <ReviewsSection />
    </div>
  );
}
