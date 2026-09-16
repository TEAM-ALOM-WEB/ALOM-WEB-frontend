"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  HeartHandshake,
  Compass,
  BookOpenCheck,
  Trophy,
  Tent,
  ArrowRight,
} from "lucide-react";
import { ACTIVITIES_DATA, ActivityItem } from "@/constants/activities";

const ICON_MAP = {
  HeartHandshake: HeartHandshake,
  Compass: Compass,
  BookOpenCheck: BookOpenCheck,
  Trophy: Trophy,
  Tent: Tent,
};

// 배경 사진 자동 전환 간격 (ms)
const SLIDE_INTERVAL = 4000;
// 좌측 목록을 마우스가 스쳐 지나갈 때 다른 활동 사진이 잠깐 끼어드는 것을 막기 위한 호버 디바운스 (ms)
const HOVER_SELECT_DELAY = 150;

export default function ActivitiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem: ActivityItem = ACTIVITIES_DATA.items[activeIndex];
  const ActiveIcon = ICON_MAP[activeItem.iconName];

  // 우측 프리뷰 카드 배경에서 자동으로 넘어가는 사진의 현재 인덱스
  const [bgIndex, setBgIndex] = useState(0);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSelectActivity = (index: number) => {
    // 이미 선택된 활동이면 상태를 건드리지 않아 슬라이드쇼가 끊기지 않도록 함
    if (index === activeIndex) return;
    setActiveIndex(index);
    setBgIndex(0);
  };

  const handleHoverActivity = (index: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    // 마우스가 목록을 훑고 지나가는 중에는 선택하지 않고, 잠시 머무를 때만 전환
    hoverTimeoutRef.current = setTimeout(() => {
      handleSelectActivity(index);
    }, HOVER_SELECT_DELAY);
  };

  const handleHoverLeaveList = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // 활성 활동이 바뀌어도 마우스를 계속 올려두고 있는 것과 무관하게 일정 주기로 다음 사진으로 자연스럽게 전환
  useEffect(() => {
    if (activeItem.images.length <= 1) return;

    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % activeItem.images.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [activeItem.images.length, activeIndex]);

  return (
    <section
      id="activities"
      className="relative w-full py-28 sm:py-36 lg:py-44 bg-background text-foreground px-4 sm:px-6 lg:px-10 border-t border-foreground/5 overflow-hidden"
    >
      {/* 배경 은은한 오로라 라이트 */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-25"
        aria-hidden="true"
      >
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.25)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.2)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* 1. 섹션 헤더 */}
        <div className="text-center mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-foreground/10 bg-foreground/5 text-xs sm:text-sm font-semibold tracking-widest text-foreground/70 uppercase mb-5">
            {ACTIVITIES_DATA.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
            {ACTIVITIES_DATA.title}
          </h2>
          <p className="mt-5 text-base sm:text-xl text-foreground/55 max-w-2xl mx-auto font-normal">
            {ACTIVITIES_DATA.description}
          </p>
        </div>

        {/* 2. 인터랙티브 활동 쇼케이스 (좌측 리스트 + 우측 대형 프리뷰 카드) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* 좌측 활동 선택 리스트 (5열) */}
          <div
            className="lg:col-span-5 flex flex-col gap-3 sm:gap-4"
            onMouseLeave={handleHoverLeaveList}
          >
            {ACTIVITIES_DATA.items.map((item, index) => {
              const Icon = ICON_MAP[item.iconName];
              const isActive = activeIndex === index;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectActivity(index)}
                  onMouseEnter={() => handleHoverActivity(index)}
                  className={`group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer overflow-hidden ${
                    isActive
                      ? "bg-foreground/[0.09] border-foreground/25 shadow-xl shadow-black/10 dark:shadow-black/50 translate-x-1 sm:translate-x-2"
                      : "bg-surface/60 border-foreground/5 hover:bg-foreground/[0.04] hover:border-foreground/10 hover:translate-x-1"
                  }`}
                >
                  {/* 활성 상태 좌측 포인트 바 */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-400 to-indigo-500 transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                        isActive
                          ? "bg-foreground/15 border-foreground/30 text-foreground scale-105 shadow-md"
                          : "bg-foreground/5 border-foreground/10 text-foreground/50 group-hover:text-foreground/80 group-hover:scale-105"
                      }`}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:rotate-3" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg sm:text-xl font-bold text-foreground transition-colors">
                          {item.title}
                        </span>
                        <span className="text-xs font-mono text-foreground/40">
                          0{index + 1}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-foreground/55 mt-0.5 font-normal">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive
                        ? "text-foreground translate-x-1 opacity-100"
                        : "text-foreground/30 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* 우측 활성화된 활동 상세 프리뷰 카드 (7열 - 전환 애니메이션 포함) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-8 sm:p-12 lg:p-14 rounded-3xl border border-foreground/15 bg-surface/90 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
            {/* 활동 사진이 은은하게 계속 자동으로 넘어가는 배경 슬라이드쇼 (z-0: 콘텐츠보다 뒤에 위치) */}
            <div className="absolute inset-0 z-0" aria-hidden="true">
              {activeItem.images.map((src, index) => (
                <div
                  key={src}
                  className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
                    index === bgIndex ? "opacity-30" : "opacity-0"
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/50 to-surface/30" />
            </div>

            {/* 내부 은은한 앰비언트 글로우 */}
            <div className="absolute -top-24 -right-24 z-0 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none transition-all duration-700 group-hover:scale-125" />
            <div className="absolute -bottom-24 -left-24 z-0 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl pointer-events-none transition-all duration-700 group-hover:scale-125" />

            {/* 카드 내용 (activeItem 변경 시 부드러운 전환, z-10: 배경 사진/글로우보다 항상 위에) */}
            <div
              key={activeItem.id}
              className="relative z-10 flex flex-col justify-between h-full animate-fade-in-up"
            >
              <div>
                {/* 상단 대형 아이콘 */}
                <div className="mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-foreground/10 border border-foreground/20 flex items-center justify-center text-foreground shadow-inner transition-transform duration-500 hover:scale-110 hover:rotate-3">
                    <ActiveIcon className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                </div>

                {/* 메인 타이틀 */}
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
                  {activeItem.title}
                </h3>
                <p className="text-lg sm:text-xl text-foreground/70 font-medium mt-3 mb-6">
                  {activeItem.subtitle}
                </p>

                {/* 상세 설명 */}
                <p className="text-base sm:text-lg text-foreground/55 leading-relaxed font-normal">
                  {activeItem.description}
                </p>
              </div>

              {/* 하단 태그 목록 */}
              <div className="mt-10 pt-6 border-t border-foreground/10">
                <div className="flex flex-wrap gap-2.5">
                  {activeItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 rounded-xl bg-foreground/5 border border-foreground/10 text-xs sm:text-sm font-medium text-foreground/70 hover:border-foreground/25 hover:bg-foreground/10 hover:text-foreground transition-all duration-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
