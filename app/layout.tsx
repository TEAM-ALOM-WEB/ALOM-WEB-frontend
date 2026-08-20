import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | ALOM - 개발 동아리",
    default: "ALOM - 함께 성장하는 개발 동아리",
  },
  description:
    "ALOM은 함께 배우고 협업하며 성장하는 테크 개발 동아리입니다. 커리큘럼, 프로젝트 아카이브, 부원 소개 및 신규 리크루팅 안내를 확인하세요.",
  keywords: [
    "ALOM",
    "개발 동아리",
    "소프트웨어",
    "웹 개발",
    "앱 개발",
    "해커톤",
    "프로젝트",
    "리크루팅",
  ],
  openGraph: {
    title: "ALOM - 함께 성장하는 개발 동아리",
    description:
      "ALOM은 함께 배우고 협업하며 성장하는 테크 개발 동아리입니다. 커리큘럼, 프로젝트 아카이브, 부원 소개 및 신규 리크루팅 안내를 확인하세요.",
    url: "https://alom.dev",
    siteName: "ALOM",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
