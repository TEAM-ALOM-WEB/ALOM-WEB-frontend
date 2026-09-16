"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/constants/navigation";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 스크롤 감지
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
      className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-200 ${isScrolled || isMobileMenuOpen
          ? "bg-[#08090d]/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent border-b border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* 1. 좌측 로고 (ALOM) */}
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center focus:outline-hidden"
            aria-label="ALOM 홈으로 이동"
          >
            <Image
              src="/images/alom_logo2_copy.png"
              alt="ALOM Logo"
              width={210}
              height={60}
              priority
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* 2. 우측 네비게이션 메뉴 */}
          <nav
            className="hidden md:flex items-center gap-8 lg:gap-10"
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
                  className={`text-sm lg:text-base font-medium tracking-tight transition-colors duration-150 ${isActive
                      ? "text-white font-semibold"
                      : "text-neutral-300 hover:text-white"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <ThemeToggle />
          </nav>

          {/* 3. 모바일 다크모드 토글 + 햄버거 버튼 */}
          <div className="flex md:hidden items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 focus:outline-hidden transition-colors"
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

      {/* 4. 모바일 메뉴 드로어 */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bottom-0 bg-[#08090d]/95 backdrop-blur-xl border-b border-white/10 flex flex-col justify-between p-6 z-40">
          <nav className="flex flex-col gap-3 pt-4">
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
                  className={`px-4 py-3 rounded-lg text-lg font-medium transition-colors ${isActive
                      ? "bg-white/10 text-white font-semibold"
                      : "text-neutral-300 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="pb-8 text-center text-xs text-neutral-500">
            ALOM Dev Club
          </div>
        </div>
      )}
    </header>
  );
}
