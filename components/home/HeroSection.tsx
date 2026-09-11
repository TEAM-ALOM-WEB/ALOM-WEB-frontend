"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type LetterKey = "A" | "L" | "O" | "M";

const LETTERS: LetterKey[] = ["A", "L", "O", "M"];

const BIG_LETTER_CLASS =
  "text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] inline-block";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function createLetterRefMap<T>() {
  return { A: null, L: null, O: null, M: null } as Record<LetterKey, T | null>;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sourceRefs = useRef(createLetterRefMap<HTMLSpanElement>());
  const targetRefs = useRef(createLetterRefMap<HTMLSpanElement>());
  const flyRefs = useRef(createLetterRefMap<HTMLSpanElement>());
  const revealRefs = useRef<HTMLSpanElement[]>([]);
  const subRef = useRef<HTMLParagraphElement>(null);

  const rectsRef = useRef(
    createLetterRefMap<{ dx: number; dy: number; sx: number; sy: number }>()
  );
  const progressRef = useRef(0);
  const reducedMotionRef = useRef(false);

  const [ready, setReady] = useState(false);

  // 스크롤 진행도(0~1)에 맞춰 각 글자의 transform/opacity를 직접 갱신 (리렌더 없이 처리)
  const applyProgress = (progress: number) => {
    LETTERS.forEach((key) => {
      const delta = rectsRef.current[key];
      const fly = flyRefs.current[key];
      const target = targetRefs.current[key];
      if (!delta || !fly || !target) return;

      const t = 1 - progress;
      const tx = delta.dx * t;
      const ty = delta.dy * t;
      const scaleX = 1 + (delta.sx - 1) * t;
      const scaleY = 1 + (delta.sy - 1) * t;

      fly.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scaleX}, ${scaleY})`;
      fly.style.opacity = String(1 - smoothstep(0.88, 1, progress));
      target.style.opacity = String(smoothstep(0.88, 1, progress));
    });

    const reveal = smoothstep(0.15, 0.9, progress);
    revealRefs.current.forEach((el) => {
      if (el) el.style.opacity = String(reveal);
    });

    if (subRef.current) {
      subRef.current.style.opacity = String(smoothstep(0.75, 1, progress));
    }
  };

  // 로고(소스) 상태와 최종 문구(타겟) 상태의 위치 차이를 측정 (FLIP 방식)
  const measure = () => {
    const stage = stageRef.current;
    if (!stage) return;
    const stageRect = stage.getBoundingClientRect();
    let allMeasured = true;

    LETTERS.forEach((key) => {
      const source = sourceRefs.current[key];
      const target = targetRefs.current[key];
      if (!source || !target) {
        allMeasured = false;
        return;
      }
      const sr = source.getBoundingClientRect();
      const tr = target.getBoundingClientRect();
      rectsRef.current[key] = {
        dx: sr.left - tr.left,
        dy: sr.top - tr.top,
        sx: sr.width / tr.width,
        sy: sr.height / tr.height,
      };

      // 리사이즈 등으로 재측정될 때 날아다니는 글자의 기준 좌표도 함께 갱신
      const fly = flyRefs.current[key];
      if (fly) {
        fly.style.left = `${tr.left - stageRect.left}px`;
        fly.style.top = `${tr.top - stageRect.top}px`;
      }
    });

    if (allMeasured) setReady(true);
    applyProgress(progressRef.current);
  };

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;

    const section = sectionRef.current;
    if (section && !mq.matches) {
      // 스크롤 애니메이션을 위한 여유 스크롤 구간을 JS로 점진적 확보 (No-JS 환경은 기본 1화면 높이 유지)
      section.style.height = "220vh";
    }

    measure();

    if (mq.matches) {
      // 모션 최소화 환경: 애니메이션 없이 최종 문구 상태를 바로 노출
      progressRef.current = 1;
      applyProgress(1);
    }

    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    let cancelled = false;
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        if (!cancelled) measure();
      });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 날아다니는 글자 레이어가 처음 DOM에 마운트된 직후, 화면에 그려지기 전에 좌표를 재측정
  useLayoutEffect(() => {
    if (ready) measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  useEffect(() => {
    if (reducedMotionRef.current) return;

    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const progress = total > 0 ? clamp(-rect.top / total, 0, 1) : 1;
        progressRef.current = progress;
        applyProgress(progress);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const addRevealRef = (el: HTMLSpanElement | null, index: number) => {
    revealRefs.current[index] = el as HTMLSpanElement;
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#08090d] text-white"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4 sm:px-6">
        {/* 1. heroBg.jpg 별빛 배경 이미지 (본래 고화질 해상도 유지 및 선명한 커버) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <Image
            src="/images/heroBg.jpg"
            alt="ALOM Hero Starry Background"
            fill
            priority
            quality={100}
            unoptimized
            className="object-cover opacity-80"
          />
          {/* 상하단 및 전체 은은한 다크 그라디언트 비네팅 */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#08090d]/60 via-transparent to-[#08090d]/90" />
        </div>

        {/* 2. BOAZ 스타일 유기적 앰비언트 그라디언트 컨테이너 (bg-gradients-container) */}
        <div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden [filter:blur(70px)] opacity-65"
          aria-hidden="true"
        >
          <div className="relative w-[500px] h-[500px] sm:w-[800px] sm:h-[800px]">
            <div className="absolute top-[calc(50%-250px)] left-[calc(50%-250px)] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.65)_0%,rgba(147,51,234,0)_70%)] animate-move-vertical mix-blend-screen" />
            <div className="absolute top-[calc(50%-250px)] left-[calc(50%-250px)] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.65)_0%,rgba(6,182,212,0)_70%)] animate-move-in-circle-reverse origin-[calc(50%-250px)] mix-blend-screen" />
            <div className="absolute top-[calc(50%-250px)] left-[calc(50%-250px)] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.65)_0%,rgba(99,102,241,0)_70%)] animate-move-in-circle origin-[calc(50%+250px)] mix-blend-screen" />
            <div className="absolute top-[calc(50%-250px)] left-[calc(50%-250px)] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_70%)] animate-move-horizontal mix-blend-screen" />
          </div>
        </div>

        {/* 3. 중앙 메인 타이포그래피 스테이지 */}
        <div
          ref={stageRef}
          className="relative z-20 flex w-full flex-col items-center text-center select-none pt-12"
        >
          {/* 3-1. 측정 전용 ALOM 로고 배치 (항상 투명, 초기 스크롤 위치에서의 글자 좌표 기준) */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0"
            aria-hidden="true"
          >
            <div className="flex items-baseline">
              {LETTERS.map((letter) => (
                <span
                  key={letter}
                  ref={(el) => {
                    sourceRefs.current[letter] = el;
                  }}
                  className={BIG_LETTER_CLASS}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>

          {/* 3-2. 실제 최종 문구 레이아웃 (A/L/O/M은 스크롤 완료 시점에만 서서히 나타남) */}
          <h1 className="flex items-baseline justify-center flex-wrap tracking-normal text-white leading-none font-sans group">
            <span className="inline-flex items-baseline">
              <span
                ref={(el) => {
                  targetRefs.current.A = el;
                }}
                className={BIG_LETTER_CLASS}
              >
                A
              </span>
              <span
                ref={(el) => {
                  targetRefs.current.L = el;
                }}
                className={BIG_LETTER_CLASS}
              >
                L
              </span>
              <span
                ref={(el) => addRevealRef(el, 0)}
                className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] inline-block"
              >
                pha
              </span>
            </span>

            <span
              ref={(el) => addRevealRef(el, 1)}
              className="text-2xl sm:text-4xl md:text-5xl font-semibold text-neutral-400 mx-3 sm:mx-6 md:mx-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] inline-block"
            >
              to
            </span>

            <span className="inline-flex items-baseline">
              <span
                ref={(el) => {
                  targetRefs.current.O = el;
                }}
                className={BIG_LETTER_CLASS}
              >
                O
              </span>
              <span
                ref={(el) => {
                  targetRefs.current.M = el;
                }}
                className={BIG_LETTER_CLASS}
              >
                M
              </span>
              <span
                ref={(el) => addRevealRef(el, 2)}
                className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] inline-block"
              >
                ega
              </span>
            </span>
          </h1>

          {/* 3-3. 스크롤에 맞춰 날아다니는 A/L/O/M 글자 레이어 */}
          {ready && (
            <div
              className="pointer-events-none absolute inset-0 z-30"
              aria-hidden="true"
            >
              {LETTERS.map((letter) => (
                <span
                  key={letter}
                  ref={(el) => {
                    flyRefs.current[letter] = el;
                  }}
                  className={BIG_LETTER_CLASS}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    opacity: 0,
                    transformOrigin: "top left",
                    willChange: "transform, opacity",
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
          )}

          {/* 4. 서브 카피 */}
          <p
            ref={subRef}
            className="mt-8 sm:mt-10 text-lg sm:text-2xl md:text-3xl font-medium text-neutral-200 tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]"
          >
            다 함께 성장하는 개발 동아리
          </p>
        </div>
      </div>
    </section>
  );
}
