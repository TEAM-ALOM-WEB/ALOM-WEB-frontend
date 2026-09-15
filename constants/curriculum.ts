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

/** 커리큘럼 로드맵(플로우차트) 전용 아이콘 키 */
export type RoadmapIconName =
  | "Terminal"
  | "Code2"
  | "FileCode"
  | "Boxes"
  | "GitBranch"
  | "Coffee"
  | "Leaf"
  | "LayoutTemplate"
  | "Atom"
  | "Brain"
  | "Network"
  | "Rocket"
  | "Server"
  | "MonitorSmartphone"
  | "BrainCircuit";

export interface RoadmapSubject {
  id: string;
  label: string;
  iconName: RoadmapIconName;
}

export interface RoadmapTrackStep {
  label: string;
  iconName: RoadmapIconName;
}

export type RoadmapTrackTheme = "blue" | "amber" | "purple";

export interface RoadmapTrack {
  id: string;
  name: string;
  iconName: RoadmapIconName;
  theme: RoadmapTrackTheme;
  steps: RoadmapTrackStep[];
}

export const CURRICULUM_ROADMAP: {
  eyebrow: string;
  title: string;
  description: string;
  junior: {
    badge: string;
    title: string;
    subtitle: string;
    subjects: RoadmapSubject[];
  };
  tracks: RoadmapTrack[];
  final: {
    badge: string;
    title: string;
    subtitle: string;
    iconName: RoadmapIconName;
  };
} = {
  eyebrow: "CURRICULUM ROADMAP",
  title: "아롬 커리큘럼 로드맵",
  description:
    "공통 기초를 다지는 주니어반부터, 관심사에 따라 나뉘는 시니어반 3개 트랙, 그리고 하나로 모이는 팀프로젝트반까지 한눈에 확인하세요.",
  junior: {
    badge: "JUNIOR",
    title: "주니어반",
    subtitle: "공통 기초 풀",
    subjects: [
      { id: "c-basic", label: "C언어 기초", iconName: "Terminal" },
      { id: "c-advanced", label: "고급 C언어", iconName: "Code2" },
      { id: "python-basic", label: "파이썬 기초", iconName: "FileCode" },
      { id: "data-structure", label: "자료구조", iconName: "Boxes" },
      { id: "algorithm", label: "알고리즘", iconName: "GitBranch" },
    ],
  },
  tracks: [
    {
      id: "backend",
      name: "백엔드 트랙",
      iconName: "Server",
      theme: "blue",
      steps: [
        { label: "Java", iconName: "Coffee" },
        { label: "Spring", iconName: "Leaf" },
      ],
    },
    {
      id: "frontend",
      name: "프론트엔드 트랙",
      iconName: "MonitorSmartphone",
      theme: "amber",
      steps: [
        { label: "프론트 기초", iconName: "LayoutTemplate" },
        { label: "React", iconName: "Atom" },
      ],
    },
    {
      id: "ai",
      name: "인공지능 트랙",
      iconName: "BrainCircuit",
      theme: "purple",
      steps: [
        { label: "AI - ML", iconName: "Brain" },
        { label: "AI - DL", iconName: "Network" },
      ],
    },
  ],
  final: {
    badge: "FINAL",
    title: "팀프로젝트반",
    subtitle: "트랙을 넘어 하나의 팀으로",
    iconName: "Rocket",
  },
};

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
