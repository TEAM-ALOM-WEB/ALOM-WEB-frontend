import { Quote } from "lucide-react";
import { REVIEWS_DATA } from "@/constants/reviews";

export default function ReviewsSection() {
  // 무한 롤링을 위해 2벌의 리스트를 연결
  const duplicatedReviews = [...REVIEWS_DATA.items, ...REVIEWS_DATA.items];

  return (
    <section
      id="reviews"
      className="relative w-full py-28 sm:py-36 lg:py-44 bg-[#08090d] text-white border-t border-white/5 overflow-hidden"
    >
      {/* 배경 은은한 조명 포인트 */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-20"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.2)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.2)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-16 sm:mb-20 text-center">
        {/* 1. 섹션 헤더 */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs sm:text-sm font-semibold tracking-widest text-neutral-300 uppercase mb-5">
          {REVIEWS_DATA.eyebrow}
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
          {REVIEWS_DATA.title}
        </h2>
        <p className="mt-5 text-base sm:text-xl text-neutral-400 max-w-2xl mx-auto font-normal">
          {REVIEWS_DATA.description}
        </p>
      </div>

      {/* 2. 무한 롤링 마퀴 슬라이더 (좌우 페이드아웃 마스크) */}
      <div className="relative w-full overflow-hidden py-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee gap-6 sm:gap-8 px-4">
          {duplicatedReviews.map((review, idx) => (
            <article
              key={`${review.id}-${idx}`}
              className={`w-[320px] sm:w-[380px] shrink-0 flex flex-col justify-between p-7 sm:p-9 rounded-3xl border border-white/10 bg-[#0e1017]/90 backdrop-blur-xl transition-all duration-300 cursor-default ${review.tilt} hover:rotate-0 hover:scale-105 hover:border-white/30 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-black/80 group`}
            >
              <div>
                {/* 상단 큰따옴표 아이콘 */}
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-colors mb-6">
                  <Quote className="w-5 h-5" />
                </div>

                {/* 후기 인용문 */}
                <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-medium break-keep group-hover:text-white transition-colors">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              {/* 작성자 메타 정보 */}
              <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-base font-bold text-white block">
                    {review.role}
                  </span>
                  <span className="text-xs text-neutral-400 font-normal">
                    {review.track} · {review.cohort}
                  </span>
                </div>
                <div className="w-2 h-2 rounded-full bg-cyan-400/80 group-hover:scale-125 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
