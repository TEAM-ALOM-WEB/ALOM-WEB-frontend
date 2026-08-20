"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_ITEMS, RECRUIT_CONFIG } from "@/constants/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 스크롤 감지하여 헤더 블러 및 보더 효과 적용
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 모바일 메뉴 열렸을 때 배경 스크롤 방지
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 shadow-xs"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* 1. 로고 (ALOM) */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-hidden"
            aria-label="ALOM 홈으로 이동"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-black text-sm tracking-tighter shadow-xs group-hover:scale-105 transition-transform duration-200">
              A
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-neutral-900 dark:text-white">
                ALOM
              </span>
              <span className="hidden sm:inline-block text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                DEV CLUB
              </span>
            </div>
          </Link>

          {/* 2. 데스크톱 네비게이션 */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2"
            aria-label="주요 메뉴"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 font-semibold"
                      : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* 3. 데스크톱 CTA 버튼 */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href={RECRUIT_CONFIG.href}
              target={RECRUIT_CONFIG.isExternal ? "_blank" : undefined}
              rel={RECRUIT_CONFIG.isExternal ? "noopener noreferrer" : undefined}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900 transition-all duration-200 shadow-xs hover:shadow-sm active:scale-98"
            >
              <span>{RECRUIT_CONFIG.label}</span>
              {RECRUIT_CONFIG.isExternal ? (
                <ArrowUpRight className="w-4 h-4 opacity-70" />
              ) : null}
            </Link>
          </div>

          {/* 4. 모바일 햄버거 토글 버튼 */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-hidden transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 5. 모바일 네비게이션 드로어 */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800 flex flex-col justify-between p-6 animate-in fade-in-0 duration-200 z-40">
          <nav className="flex flex-col gap-2 pt-2">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? "bg-neutral-100 dark:bg-neutral-900 text-neutral-950 dark:text-white font-semibold"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900/60"
                  }`}
                >
                  <div className="flex flex-col">
                    <span>{item.label}</span>
                    {item.description && (
                      <span className="text-xs text-neutral-500 dark:text-neutral-400 font-normal mt-0.5">
                        {item.description}
                      </span>
                    )}
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-neutral-100 dark:border-neutral-900">
            <Link
              href={RECRUIT_CONFIG.href}
              target={RECRUIT_CONFIG.isExternal ? "_blank" : undefined}
              rel={RECRUIT_CONFIG.isExternal ? "noopener noreferrer" : undefined}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-base font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm active:scale-98 transition-transform"
            >
              <span>{RECRUIT_CONFIG.label}</span>
              {RECRUIT_CONFIG.isExternal && <ArrowUpRight className="w-4 h-4" />}
            </Link>
            <p className="text-center text-xs text-neutral-400 dark:text-neutral-500 mt-4">
              ALOM Dev Club &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
