import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#08090d] text-white overflow-hidden px-4 sm:px-6">
      {/* 1. heroBg.jpg 배경 이미지 (풀스크린 커버) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
        <div className="relative w-[150vmax] h-[150vmax] flex-shrink-0">
          <Image
            src="/images/heroBg.jpg"
            alt="ALOM Hero Background"
            fill
            priority
            sizes="100vw"
            className="object-cover -rotate-90 origin-center opacity-70"
          />
        </div>
        {/* 상하단 부드러운 그라디언트 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090d]/40 via-transparent to-[#08090d]/80" />
      </div>

      {/* 2. BOAZ 스타일 유기적 앰비언트 그라디언트 컨테이너 (bg-gradients-container) */}
      <div
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden [filter:blur(70px)] opacity-70"
        aria-hidden="true"
      >
        <div className="relative w-[500px] h-[500px] sm:w-[800px] sm:h-[800px]">
          {/* g1 - Purple/Violet */}
          <div className="absolute top-[calc(50%-250px)] left-[calc(50%-250px)] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.65)_0%,rgba(147,51,234,0)_70%)] animate-move-vertical mix-blend-screen" />

          {/* g2 - Cyan/Teal */}
          <div className="absolute top-[calc(50%-250px)] left-[calc(50%-250px)] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.65)_0%,rgba(6,182,212,0)_70%)] animate-move-in-circle-reverse origin-[calc(50%-250px)] mix-blend-screen" />

          {/* g3 - Indigo/Blue */}
          <div className="absolute top-[calc(50%-250px)] left-[calc(50%-250px)] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.65)_0%,rgba(99,102,241,0)_70%)] animate-move-in-circle origin-[calc(50%+250px)] mix-blend-screen" />

          {/* g4 - Emerald/Sky */}
          <div className="absolute top-[calc(50%-250px)] left-[calc(50%-250px)] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_70%)] animate-move-horizontal mix-blend-screen" />
        </div>
      </div>

      {/* 3. 중앙 메인 타이포그래피 (선명한 순백색 텍스트 & 안정적인 가독성) */}
      <div className="relative z-20 flex flex-col items-center text-center select-none pt-12">
        <h1 className="flex items-baseline justify-center flex-wrap tracking-normal text-white leading-none font-sans group">
          {/* ALpha */}
          <span className="inline-flex items-baseline">
            <span className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] group-hover:scale-[1.02] transition-transform duration-200 inline-block">
              AL
            </span>
            <span className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] inline-block">
              pha
            </span>
          </span>

          {/* to */}
          <span className="text-2xl sm:text-4xl md:text-5xl font-semibold text-neutral-400 mx-3 sm:mx-6 md:mx-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] inline-block">
            to
          </span>

          {/* OMega */}
          <span className="inline-flex items-baseline">
            <span className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] group-hover:scale-[1.02] transition-transform duration-200 inline-block">
              OM
            </span>
            <span className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] inline-block">
              ega
            </span>
          </span>
        </h1>

        {/* 4. 서브 카피 */}
        <p className="mt-8 sm:mt-10 text-lg sm:text-2xl md:text-3xl font-medium text-neutral-200 tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
          다 함께 성장하는 개발 동아리
        </p>
      </div>
    </section>
  );
}
