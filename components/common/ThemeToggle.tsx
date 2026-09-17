"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const noopSubscribe = () => () => {};

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  // next-themes는 마운트 전 서버/클라이언트 테마 값이 다를 수 있어 하이드레이션 이후에만 실제 아이콘을 노출
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`p-2 rounded-lg focus:outline-hidden transition-colors ${className || "text-neutral-300 hover:text-white hover:bg-white/10"
        }`}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      {mounted ? (
        isDark ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )
      ) : (
        <span className="block w-5 h-5" aria-hidden="true" />
      )}
    </button>
  );
}
