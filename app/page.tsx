import HeroSection from "@/components/home/HeroSection";
import CurriculumSection from "@/components/home/CurriculumSection";
import ActivitiesSection from "@/components/home/ActivitiesSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full bg-[#08090d]">
      <HeroSection />
      <CurriculumSection />
      <ActivitiesSection />
    </div>
  );
}
