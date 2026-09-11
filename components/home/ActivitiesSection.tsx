"use client";

import React, { useState } from "react";
import {
  HeartHandshake,
  Compass,
  BookOpenCheck,
  Trophy,
  Tent,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { ACTIVITIES_DATA, ActivityItem } from "@/constants/activities";

const ICON_MAP = {
  HeartHandshake: HeartHandshake,
  Compass: Compass,
  BookOpenCheck: BookOpenCheck,
  Trophy: Trophy,
  Tent: Tent,
};

export default function ActivitiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem: ActivityItem = ACTIVITIES_DATA.items[activeIndex];
  const ActiveIcon = ICON_MAP[activeItem.iconName];

  return (
    <section
      id="activities"
      className="relative w-full py-28 sm:py-36 lg:py-44 bg-[#08090d] text-white px-4 sm:px-6 lg:px-10 border-t border-white/5 overflow-hidden"
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs sm:text-sm font-semibold tracking-widest text-neutral-300 uppercase mb-5">
            {ACTIVITIES_DATA.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            {ACTIVITIES_DATA.title}
          </h2>
          <p className="mt-5 text-base sm:text-xl text-neutral-400 max-w-2xl mx-auto font-normal">
            {ACTIVITIES_DATA.description}
          </p>
        </div>

        {/* 2. 인터랙티브 활동 쇼케이스 (좌측 리스트 + 우측 대형 프리뷰 카드) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* 좌측 활동 선택 리스트 (5열) */}
          <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-4">
            {ACTIVITIES_DATA.items.map((item, index) => {
              const Icon = ICON_MAP[item.iconName];
              const isActive = activeIndex === index;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer overflow-hidden ${
                    isActive
                      ? "bg-white/[0.09] border-white/25 shadow-xl shadow-black/50 translate-x-1 sm:translate-x-2"
                      : "bg-[#0e1017]/60 border-white/5 hover:bg-white/[0.04] hover:border-white/10 hover:translate-x-1"
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
                          ? "bg-white/15 border-white/30 text-white scale-105 shadow-md"
                          : "bg-white/5 border-white/10 text-neutral-400 group-hover:text-neutral-200 group-hover:scale-105"
                      }`}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:rotate-3" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg sm:text-xl font-bold text-white transition-colors">
                          {item.title}
                        </span>
                        <span className="text-xs font-mono text-neutral-500">
                          0{index + 1}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-400 mt-0.5 font-normal">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive
                        ? "text-white translate-x-1 opacity-100"
                        : "text-neutral-600 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* 우측 활성화된 활동 상세 프리뷰 카드 (7열 - 전환 애니메이션 포함) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-8 sm:p-12 lg:p-14 rounded-3xl border border-white/15 bg-[#0e1017]/90 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
            {/* 내부 은은한 앰비언트 글로우 */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none transition-all duration-700 group-hover:scale-125" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl pointer-events-none transition-all duration-700 group-hover:scale-125" />

            {/* 카드 내용 (activeItem 변경 시 부드러운 전환) */}
            <div
              key={activeItem.id}
              className="flex flex-col justify-between h-full animate-fade-in-up"
            >
              <div>
                {/* 상단 뱃지 & 대형 아이콘 */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-inner transition-transform duration-500 hover:scale-110 hover:rotate-3">
                    <ActiveIcon className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold tracking-wider text-neutral-300">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>ALOM ACTIVITY</span>
                  </div>
                </div>

                {/* 메인 타이틀 */}
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                  {activeItem.title}
                </h3>
                <p className="text-lg sm:text-xl text-neutral-300 font-medium mt-3 mb-6">
                  {activeItem.subtitle}
                </p>

                {/* 상세 설명 */}
                <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
                  {activeItem.description}
                </p>
              </div>

              {/* 하단 태그 목록 */}
              <div className="mt-10 pt-6 border-t border-white/10">
                <div className="flex flex-wrap gap-2.5">
                  {activeItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-medium text-neutral-300 hover:border-white/25 hover:bg-white/10 hover:text-white transition-all duration-200 cursor-default"
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
