import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CURRICULUM_DATA } from "@/constants/curriculum";

export default function CurriculumSection() {
  return (
    <section
      id="curriculum"
      className="relative w-full py-28 sm:py-36 lg:py-44 bg-background text-foreground px-4 sm:px-6 lg:px-10 border-t border-foreground/5 overflow-hidden"
    >
      {/* 배경 은은한 조명 포인트 */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-30"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.25)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.25)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* 1. 섹션 헤더 */}
        <div className="text-center mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-foreground/10 bg-foreground/5 text-xs sm:text-sm font-semibold tracking-widest text-foreground/70 uppercase mb-5">
            {CURRICULUM_DATA.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
            {CURRICULUM_DATA.title}
          </h2>
          <p className="mt-5 text-base sm:text-xl text-foreground/55 max-w-2xl mx-auto font-normal">
            {CURRICULUM_DATA.description}
          </p>
          <Link
            href="/curriculum"
            className="mt-6 inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            전체 커리큘럼 로드맵 보기
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 2. 2열 커리큘럼 카드 그리드 (주니어반 / 시니어반) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {CURRICULUM_DATA.tracks.map((track) => (
            <div
              key={track.badge}
              className={`relative flex flex-col justify-between p-8 sm:p-12 lg:p-14 rounded-3xl border border-foreground/10 bg-surface/85 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 ${track.borderHoverClass} hover:shadow-2xl hover:shadow-black/20 dark:hover:shadow-black/70 group`}
            >
              <div>
                {/* 카드 상단 뱃지 */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold tracking-wider transition-transform duration-300 group-hover:scale-105 ${track.badgeClass}`}
                  >
                    {track.badge}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
                  {track.title}
                </h3>
                <p className="text-base sm:text-lg text-foreground/55 mt-3 mb-10">
                  {track.description}
                </p>

                {/* 과목 리스트 (아이템별 호버 애니메이션) */}
                <ul className="space-y-3.5 sm:space-y-4">
                  {track.items.map((item) => (
                    <li
                      key={item.num}
                      className="group/item flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-foreground/[0.03] border border-foreground/5 hover:bg-foreground/[0.08] hover:border-foreground/20 hover:translate-x-1.5 transition-all duration-200"
                    >
                      <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center font-mono text-sm sm:text-base font-bold text-foreground/70 group-hover/item:text-foreground group-hover/item:border-foreground/30 group-hover/item:bg-foreground/10 transition-all duration-200 shrink-0">
                        {item.num}
                      </span>
                      <span className="text-base sm:text-lg lg:text-xl font-semibold text-foreground/85 group-hover/item:text-foreground transition-colors">
                        {item.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 카드 하단 장식선 */}
              <div className="mt-10 sm:mt-12 pt-6 border-t border-foreground/5 flex items-center justify-between text-xs sm:text-sm text-foreground/40 font-medium">
                <span>ALOM {CURRICULUM_DATA.season}</span>
                <span>총 {track.items.length}개 커리큘럼</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
