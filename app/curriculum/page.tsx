import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { CURRICULUM_ROADMAP } from "@/constants/curriculum";
import CurriculumRoadmap from "@/components/curriculum/CurriculumRoadmap";

export const metadata: Metadata = createPageMetadata({
  title: "커리큘럼",
  description: CURRICULUM_ROADMAP.description,
  path: "/curriculum",
});

export default function CurriculumPage() {
  return (
    <section className="relative w-full pt-32 pb-28 sm:pt-40 sm:pb-36 lg:pt-48 lg:pb-44 bg-background text-foreground px-4 sm:px-6 lg:px-10 overflow-hidden">
      {/* 배경 은은한 조명 포인트 */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-30"
        aria-hidden="true"
      >
        <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.25)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.25)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* 1. 페이지 헤더 */}
        <div className="text-center mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-foreground/10 bg-foreground/5 text-xs sm:text-sm font-semibold tracking-widest text-foreground/70 uppercase mb-5">
            {CURRICULUM_ROADMAP.eyebrow}
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
            {CURRICULUM_ROADMAP.title}
          </h1>
          <p className="mt-5 text-base sm:text-xl text-foreground/55 max-w-2xl mx-auto font-normal">
            {CURRICULUM_ROADMAP.description}
          </p>
        </div>

        {/* 2. 커리큘럼 플로우차트 */}
        {/* overflow-x-auto는 overflow-y도 함께 clip 시키므로, 카드 hover 시 위로 뜨는 만큼 pt로 여백 확보 */}
        <div className="overflow-x-auto pt-3 pb-4">
          <div className="flex justify-center">
            <CurriculumRoadmap />
          </div>
        </div>
      </div>
    </section>
  );
}
