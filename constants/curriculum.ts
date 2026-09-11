export interface CurriculumTrack {
  badge: string;
  title: string;
  description: string;
  items: {
    num: string;
    title: string;
    description?: string;
  }[];
  badgeClass: string;
  borderHoverClass: string;
}

export const CURRICULUM_DATA: {
  season: string;
  eyebrow: string;
  title: string;
  description: string;
  tracks: CurriculumTrack[];
} = {
  season: "2026학년도 2학기",
  eyebrow: "CURRICULUM",
  title: "2026학년도 2학기 커리큘럼",
  description:
    "기초부터 실전 프로젝트까지, 체계적인 로드맵으로 이어지는 커리큘럼입니다.",
  tracks: [
    {
      badge: "JUNIOR",
      title: "주니어반",
      description: "선배가 옆에서 함께 걸어주는, 개발의 첫걸음",
      badgeClass: "bg-cyan-950/80 text-cyan-400 border border-cyan-800/60",
      borderHoverClass: "hover:border-cyan-500/40",
      items: [
        { num: "01", title: "C언어 기초" },
        { num: "02", title: "고급 C언어" },
        { num: "03", title: "파이썬 기초 코딩" },
        { num: "04", title: "알고리즘" },
      ],
    },
    {
      badge: "SENIOR",
      title: "시니어반",
      description: "자율과 몰입으로 완성하는 실전형 성장",
      badgeClass: "bg-purple-950/80 text-purple-400 border border-purple-800/60",
      borderHoverClass: "hover:border-purple-500/40",
      items: [
        { num: "01", title: "Java" },
        { num: "02", title: "Spring" },
        { num: "03", title: "프론트 기초 (HTML, CSS, JS, TS)" },
        { num: "04", title: "React" },
        { num: "05", title: "AI - ML" },
        { num: "06", title: "AI - DL" },
        { num: "07", title: "팀 프로젝트반" },
      ],
    },
  ],
};
