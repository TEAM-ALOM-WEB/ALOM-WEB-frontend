export interface ActivityItem {
  id: string;
  iconName: "BookOpenCheck" | "Trophy" | "HeartHandshake" | "Compass" | "Tent";
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
}

export const ACTIVITIES_DATA: {
  eyebrow: string;
  title: string;
  description: string;
  items: ActivityItem[];
} = {
  eyebrow: "ACTIVITIES",
  title: "아롬에서 보내는 하루하루",
  description:
    "배움의 방식부터 우정을 쌓는 방식까지, 아롬만의 색깔이 담긴 활동을 소개합니다.",
  items: [
    {
      id: "mentoring-study",
      iconName: "BookOpenCheck",
      title: "멘토멘티 & 스터디",
      subtitle: "과목마다 다른, 가장 잘 맞는 학습법",
      description:
        "C언어 기초·고급 C언어·파이썬은 선배가 1:1로 봐주는 멘토멘티로, 나머지 과목은 팀원들이 함께 진행하는 자율 스터디로 운영돼요.",
      tags: ["멘토멘티", "자율 스터디"],
      color: "cyan",
    },
    {
      id: "project-demoday",
      iconName: "Trophy",
      title: "프로젝트 & 데모데이",
      subtitle: "기획 → 중간 → 최종, 완성되는 프로젝트",
      description:
        "기획·중간·최종 3단계로 프로젝트를 완성하고, 종강총회와 함께 열리는 데모데이에서 시연과 피드백, 우수팀 시상까지 진행해요.",
      tags: ["단계별 진행", "데모데이", "우수팀 시상"],
      color: "amber",
    },
    {
      id: "arom-darom",
      iconName: "HeartHandshake",
      title: "아롬다롬",
      subtitle: "정해진 형식 없는 번개모임",
      description:
        '신청자 채팅방에서 누구든 자유롭게 모임을 제안하는 번개모임이에요. "한강 갈 사람!" 한마디면 그날의 만남이 시작돼요.',
      tags: ["번개모임", "자유 참여"],
      color: "purple",
    },
    {
      id: "clubs",
      iconName: "Compass",
      title: "소모임",
      subtitle: "취향으로 뭉치는 아롬인들",
      description:
        "클라이밍(아로밍), 테니스(NET워크), 음악(귤락), 게임(아로므파티), 야구직관(야발롬)까지 자율로 운영돼요.",
      tags: ["아로밍", "NET워크", "귤락", "아로므파티", "야발롬"],
      color: "emerald",
    },
    {
      id: "mt-events",
      iconName: "Tent",
      title: "MT & 총회",
      subtitle: "학기의 시작과 끝을 함께",
      description:
        "개강총회로 시작해 동아리 MT로 추억을 쌓고, 종강총회로 한 학기를 마무리해요.",
      tags: ["개강총회", "동아리 MT", "종강총회"],
      color: "indigo",
    },
  ],
};
