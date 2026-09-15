export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "커리큘럼",
    href: "/curriculum",
    description: "트랙별 학습 로드맵 및 스터디",
  },
  {
    label: "아카이브",
    href: "/#activities",
    description: "역대 프로젝트 및 활동 기록",
  },
  {
    label: "아롬인들",
    href: "/members",
    description: "함께 성장하는 ALOM 부원들",
  },
  {
    label: "자주 묻는 질문",
    href: "/faq",
    description: "자주 묻는 질문 및 안내",
  },
];

export const RECRUIT_CONFIG = {
  label: "지원하기",
  href: process.env.NEXT_PUBLIC_RECRUIT_URL || "https://forms.google.com",
  isExternal: true,
  badgeText: "Recruiting",
  isRecruiting: true,
};
