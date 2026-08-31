export interface ReviewItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  cohort: string;
  track: string;
  tilt: string;
}

export const REVIEWS_DATA: {
  eyebrow: string;
  title: string;
  description: string;
  items: ReviewItem[];
} = {
  eyebrow: "REVIEWS",
  title: "아롬 부원들의 이야기",
  description: "ALOM에서 함께 배우고 도전하며 성장한 부원들의 생생한 후기입니다.",
  items: [
    {
      id: "review-1",
      quote: "전공 수업에서 이해 못했던 개념을 아롬 스터디에서 확실히 잡고 갈 수 있었어요.",
      name: "김민서",
      role: "회원 A",
      cohort: "25학번",
      track: "주니어반",
      tilt: "-rotate-2",
    },
    {
      id: "review-2",
      quote: "멘토멘티 덕분에 처음 써본 React로 팀 프로젝트를 무사히 마쳤습니다.",
      name: "이준혁",
      role: "회원 B",
      cohort: "24학번",
      track: "시니어반",
      tilt: "rotate-2",
    },
    {
      id: "review-3",
      quote: "아롬다롬 활동에서 만난 선배 덕분에 진로 고민을 많이 해결했어요.",
      name: "박서연",
      role: "회원 C",
      cohort: "25학번",
      track: "주니어반",
      tilt: "-rotate-1",
    },
    {
      id: "review-4",
      quote: "해커톤에 나가서 처음으로 수상까지 해봤습니다. 아롬 아니었으면 못했을 도전이에요.",
      name: "최현우",
      role: "회원 D",
      cohort: "23학번",
      track: "시니어반",
      tilt: "rotate-3",
    },
    {
      id: "review-5",
      quote: "세미나에서 발표하면서 제가 아는 걸 설명하는 힘이 늘었어요.",
      name: "정다은",
      role: "회원 E",
      cohort: "24학번",
      track: "시니어반",
      tilt: "-rotate-2",
    },
  ],
};
