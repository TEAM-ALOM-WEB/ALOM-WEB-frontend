"use client";

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

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
  twinkleSpeed: number;
  phase: number;
  depth: number;
  color: string;
}

const PARTICLE_COLORS = ["255,255,255", "168,132,255", "94,234,212"];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
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

  // 스크롤에 따라 별 입자가 화면 중앙에서 바깥으로 퍼져나가는(워프) 캔버스 파티클 배경
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const buildParticles = () => {
      const density = reducedMotionRef.current ? 0.00015 : 0.00038;
      const count = Math.round(width * height * density);
      particlesRef.current = Array.from({ length: count }, () => {
        const depth = Math.random() * 0.7 + 0.3;
        const dirAngle = Math.random() * Math.PI * 2;
        const speed = 6 + depth * 16; // px/s, 멀리 있는(작은) 입자일수록 느리게 흐름
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(dirAngle) * speed,
          vy: Math.sin(dirAngle) * speed,
          radius: Math.random() * 1.4 + 0.5,
          baseOpacity: Math.random() * 0.5 + 0.35,
          twinkleSpeed: Math.random() * 1.5 + 0.6,
          phase: Math.random() * Math.PI * 2,
          depth,
          color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        };
      });
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    };

    resize();
    window.addEventListener("resize", resize);

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      particlesRef.current.forEach((p) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.color},${p.baseOpacity})`;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    if (reducedMotionRef.current) {
      drawStatic();
      return () => window.removeEventListener("resize", resize);
    }

    let rafId = 0;
    const startTime = performance.now();
    let lastTime = startTime;
    const wrapPad = 60;

    const render = (now: number) => {
      rafId = requestAnimationFrame(render);
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const elapsed = (now - startTime) / 1000;
      const progress = progressRef.current;
      const centerX = width / 2;
      const centerY = height / 2;

      // 스크롤을 시작하자마자 빠르게 워프가 붙고, 문구가 완성되는 구간에서 서서히 가라앉음
      const warp = smoothstep(0, 0.4, progress) * (1 - smoothstep(0.85, 1, progress) * 0.6);
      const fadeOut = smoothstep(0.9, 1, progress);
      const driftBoost = 1 + warp * 5;

      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((p) => {
        // 스크롤 여부와 무관하게 항상 은은히 흘러가고, 스크롤 중에는 흐름 자체가 가속됨
        p.x += p.vx * dt * driftBoost;
        p.y += p.vy * dt * driftBoost;
        if (p.x < -wrapPad) p.x = width + wrapPad;
        if (p.x > width + wrapPad) p.x = -wrapPad;
        if (p.y < -wrapPad) p.y = height + wrapPad;
        if (p.y > height + wrapPad) p.y = -wrapPad;

        const dx = p.x - centerX;
        const dy = p.y - centerY;
        const dist = Math.hypot(dx, dy) || 1;
        const dirX = dx / dist;
        const dirY = dy / dist;
        const push = warp * p.depth * 360;
        const rx = p.x + dirX * push;
        const ry = p.y + dirY * push;

        const twinkle = p.baseOpacity * (0.6 + 0.4 * Math.sin(elapsed * p.twinkleSpeed + p.phase));
        const alpha = Math.max(0, twinkle * (1 - fadeOut * 0.75));

        if (warp > 0.04) {
          // 워프 구간: 이동 방향으로 길게 궤적을 그려 빛의 줄기처럼 표현
          const trailLen = push * 0.6 + warp * 70;
          ctx.strokeStyle = `rgba(${p.color},${alpha})`;
          ctx.lineWidth = p.radius * (1 + warp * 1.5);
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(rx - dirX * trailLen, ry - dirY * trailLen);
          ctx.lineTo(rx, ry);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${p.color},${alpha})`;
          ctx.arc(rx, ry, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
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
        {/* 1. 베이스 다크 캔버스 (은은한 중앙 라이트 워시가 천천히 숨쉬며 깊이감 부여, 사진 미사용) */}
        <div
          className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(30,32,48,0.9)_0%,#08090d_70%)] animate-aurora"
          aria-hidden="true"
        />

        {/* 2. 가장자리 비네팅 (파티클보다 아래 레이어에 둬서 별이 가려지지 않게 함) */}
        <div
          className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_at_center,transparent_45%,#08090d_92%)]"
          aria-hidden="true"
        />

        {/* 3. 스크롤에 반응해 중앙에서 바깥으로 퍼져나가는 별 입자(파티클) 캔버스 */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-10"
          aria-hidden="true"
        />

        {/* 4. 중앙 메인 타이포그래피 스테이지 */}
        <div
          ref={stageRef}
          className="relative z-20 flex w-full flex-col items-center text-center select-none pt-12"
        >
          {/* 4-1. 측정 전용 ALOM 로고 배치 (항상 투명, 초기 스크롤 위치에서의 글자 좌표 기준) */}
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

          {/* 4-2. 실제 최종 문구 레이아웃 (A/L/O/M은 스크롤 완료 시점에만 서서히 나타남) */}
          <h1 className="flex items-baseline justify-center flex-wrap tracking-normal text-white leading-none font-sans group">
            <span
              ref={(el) => addRevealRef(el, 0)}
              className="text-2xl sm:text-4xl md:text-5xl font-semibold text-neutral-400 mr-3 sm:mr-6 md:mr-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] inline-block"
            >
              from
            </span>

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
                ref={(el) => addRevealRef(el, 1)}
                className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] inline-block"
              >
                pha
              </span>
            </span>

            <span
              ref={(el) => addRevealRef(el, 2)}
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
                ref={(el) => addRevealRef(el, 3)}
                className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] inline-block"
              >
                ega
              </span>
            </span>
          </h1>

          {/* 4-3. 스크롤에 맞춰 날아다니는 A/L/O/M 글자 레이어 */}
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

          {/* 5. 서브 카피 */}
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
