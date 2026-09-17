export interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export const FOOTER_LINKS: FooterLink[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/alomsejong/",
    isExternal: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/TEAM-ALOM",
    isExternal: true,
  },

  // 추후 지원 기간일 때는
  // 구글 폼 url, isExternal: true
  // 변경 필요
  {
    label: "지원하기",
    href: process.env.NEXT_PUBLIC_RECRUIT_URL || "https://forms.google.com",
    isExternal: false,
  },
];

export interface FooterContact {
  role: string;
  name: string;
  phone: string;
}

export const FOOTER_CONTACTS: FooterContact[] = [
  { role: "회장:", name: "정현우", phone: "010-8925-3194" },
  { role: "부회장:", name: "박서현", phone: "010-9423-7090" },
];

export const FOOTER_LOCATION = "세종대학교 학생회관 622호";
