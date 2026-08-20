<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ALOM-WEB Project Rules & Context (Next.js Web)

## 1. Project Identity & Purpose

- **Project Name:** ALOM-WEB
- **Concept:** 개발 동아리 **ALOM**의 공식 웹사이트 (홍보, 커리큘럼, 아카이브, 부원 소개, FAQ 및 리크루팅).
- **Project Goal:**
  - 동아리 비전 및 트랙별 커리큘럼 안내
  - 지난 기수 활동 내역 및 프로젝트 성과물(아카이브) 쇼케이스
  - 동아리를 빛낸 부원들(아롬인들) 소개 및 소속감 고취
  - 신규 부원 모집(리크루팅) 일정 및 FAQ 안내를 통한 지원 유도
- **Target Platform:** Responsive Web (Desktop, Tablet, Mobile Web).
- **Design Standard:**
  - 시각적으로 세련되고 인터랙티브한 모던 테크 웹 디자인.
  - 모바일(375px~)부터 대화면 데스크톱(1440px+)까지 자연스럽게 대응하는 반응형 레이아웃.

## 2. Technical Stack & Environment

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **State Management:**
  - **Client State:** Zustand (글로벌 모달, 테마, 필터 상태 등 필요 시) / React 내장 Hooks
  - **Server State:** TanStack Query (`@tanstack/react-query` v5, 비동기 데이터 패칭 필요 시)
- **Styling:** Tailwind CSS (v4) / CSS Variables
- **Icons & Animation:** Lucide React, CSS Transitions/Animations (또는 Framer Motion), `next/image`

## 3. Directory Structure & App Routing

Next.js App Router 표준 및 절대 경로 별칭(`@/*`)을 사용합니다:

### 3.1 App Router Pages (`@/app/*`)
- `@/app/page.tsx`: **메인(홈)** 랜딩 페이지 (Hero, 동아리 소개 요약, 핵심 하이라이트, 지원 CTA)
- `@/app/curriculum/page.tsx`: **커리큘럼** 페이지 (파트/트랙별 학습 로드맵, 세미나, 스터디 일정 등)
- `@/app/archive/page.tsx`: **아카이브** 페이지 (역대 프로젝트 쇼케이스, 해커톤, 활동 기록 및 성과물)
- `@/app/members/page.tsx` (또는 `@/app/alomers/page.tsx`): **아롬인들** 페이지 (기수별/역할별 부원 소개, 인터뷰/후기)
- `@/app/faq/page.tsx`: **FAQ** 페이지 (모집 일정, 지원 자격, 활동 관련 자주 묻는 질문 및 문의)

### 3.2 Component & Resource Aliases
- `@/*`: `./*` (프로젝트 루트)
- `@/components/*`: `./components/*` (UI 컴포넌트)
  - `@/components/common/*`: Button, Card, Modal, Badge, Accordion, Tab 등 공통 컴포넌트
  - `@/components/layout/*`: Header/Navbar, Footer, Floating CTA 등 전역 레이아웃
  - `@/components/curriculum/*`, `@/components/archive/*`, `@/components/members/*`, `@/components/faq/*`, `@/components/home/*`: 페이지별 특화 컴포넌트
- `@/hooks/*`: `./hooks/*` (Custom Hooks)
- `@/lib/*` 또는 `@/utils/*`: `./lib/*` (헬퍼 함수, 필터링 로직, 날짜 포맷 등)
- `@/constants/*`: `./constants/*` (커리큘럼, 아카이브 프로젝트, 부원 정보, FAQ 데이터셋 등)
- `@/types/*`: `./types/*` (TypeScript 인터페이스 및 타입 정의)
- `@/public/*`: 정적 에셋 (동아리 로고, 프로젝트 썸네일, 부원 프로필 사진, 활동 사진 등)

## 4. UI/UX & Responsive Rules (CRITICAL)

- **Mobile-First & Responsive Breakpoints:**
  - Tailwind CSS 표준 중단점을 준수 (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px`).
  - 모바일 뷰: 터치 친화적 네비게이션(햄버거 메뉴/바텀시트), 컴팩트한 카드 레이아웃.
  - 데스크톱 뷰: 2~3열 그리드, 풍부한 호버 인터랙션, 와이드 배너 및 인터랙티브 섹션.
- **Micro-interactions & Visual Excellence:**
  - 개발 동아리 특유의 테크니컬하고 트렌디한 무드 (부드러운 그라디언트, 글래스모피즘, 호버 시 카드 리프트 효과, 부드러운 스크롤).
- **Web Accessibility & SEO:**
  - Semantic HTML 태그(`header`, `nav`, `main`, `section`, `article`, `footer`) 필수 사용.
  - 검색 엔진 노출 및 SNS 공유를 위한 Next.js `Metadata` 및 Open Graph(OG 태그) 철저 구성.
  - 모든 이미지에 명확한 `alt` 속성 부여.

## 5. Coding Standards & Conventions

- **Server vs Client Components (Performance First):**
  - **기본값은 Server Component (RSC):** 랜딩 페이지의 정적 섹션, 소개 텍스트, 메타데이터 등은 서버 컴포넌트로 렌더링하여 빠른 FCP 및 SEO 확보.
  - **'use client' 지시어:** 모바일 네비게이션 토글, 아코디언(FAQ), 슬라이더/캐러셀, 탭 전환, 폼 입력 등 인터랙션이 필요한 잎(Leaf) 컴포넌트에만 선언.
- **Next.js Built-in Optimizations:**
  - **이미지:** `<img>` 대신 `next/image`의 `<Image />` 사용 (반응형 sizes 지정, WebP 자동 변환, CLS 방지).
  - **링크 & 네비게이션:** `next/link`의 `<Link />` 사용 및 부드러운 앵커 스크롤(`smooth scroll`) 지원.
  - **폰트:** `next/font/local` 또는 `next/font/google`을 활용하여 Pretendard / 영문 폰트 최적화.
- **Data & Content Management:**
  - 활동 내역, 프로젝트, FAQ, 리크루팅 일정 등의 텍스트 데이터는 하드코딩하지 않고 `@/constants/`의 구조화된 데이터 파일로 분리하여 유지보수성 향상.
- **Commit Messages:** `type: 설명 (#이슈번호)` 형식의 Conventional Commits 준수. 커밋 메시지는 **한국어**로 작성.
  - `feat`, `fix`, `style`, `refactor`, `docs`, `chore`, `test`
- **Testing:** Jest / React Testing Library를 통한 컴포넌트 렌더링 및 폼 인터랙션 검증.

## 6. Development Workflow

- **Git Flow:** `main` (Production) ← `develop` (Staging) ← `feat/기능-이름`
- **Default Branch:** `main`
- **Environment Variables:**
  - 구글 폼 링크, 지원서 URL, 외부 API 키 등은 `.env.local` 및 환경변수(`NEXT_PUBLIC_`)로 안전하게 관리.

## 7. Instructions for AI

- **Language:** 모든 응답과 코드 내 주석은 **한국어**로 작성합니다.
- **Next.js Best Practices:**
  - 랜딩 페이지의 로딩 속도 최적화를 위해 불필요한 클라이언트 컴포넌트화를 피하고, 번들 사이즈를 최소화합니다.
  - 이미지 및 비디오 에셋의 최적화(LCP 고려)를 최우선으로 합니다.
- **Responsive Coding:** 고정 픽셀(px) 기반 배치를 지양하고 유연한 Tailwind 유틸리티(`w-full`, `max-w-7xl`, `mx-auto`, `grid`, `flex`, `gap-`, `px-4 sm:px-6 lg:px-8`)를 적극 활용합니다.
- **Component Modularity:** 각 페이지(홈, 커리큘럼, 아카이브, 아롬인들, FAQ) 및 세부 섹션을 독립적인 컴포넌트로 모듈화하여 재사용 및 유지보수가 쉽도록 작성합니다.
- **Git Safety (no commit/push):** 사용자의 명시적 요청 없이 임의로 git commit/push 명령을 실행하지 않습니다.
- **Plan Workflow:** 계획 파일의 작업을 하나씩 순차적으로 수행하고 완료 시 체크박스를 업데이트합니다.
- **Commit Suggestion:** 각 작업 단위 완료 시 해당 컨벤션에 맞는 추천 커밋 메시지를 코드 블록으로 제안합니다.

