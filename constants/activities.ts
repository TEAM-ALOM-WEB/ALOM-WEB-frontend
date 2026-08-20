export interface ActivityItem {
  id: string;
  iconName: "HeartHandshake" | "Compass" | "BookOpenCheck" | "Presentation" | "Trophy";
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
  title: "아롬의 활동",
  description: "선후배 간의 밀착 네트워킹부터 실전 프로젝트, 대외 해커톤까지 함께 성장합니다.",
  items: [
    {
      id: "arom-darom",
      iconName: "HeartHandshake",
      title: "아롬다롬",
      subtitle: "선후배 1:1 짝매칭 네트워킹",
      description:
        "후배(아롬)와 선배(다롬)가 짝을 이루어 학기 내내 소통합니다. 전공 공부부터 진로 고민까지, 편하게 물어보고 함께 답을 찾아가는 시간이에요.",
      tags: ["선후배 멘토링", "진로 상담", "네트워킹"],
      color: "cyan",
    },
    {
      id: "mentor-mentee",
      iconName: "Compass",
      title: "멘토멘티",
      subtitle: "실무 역량 중심 맞춤 코칭",
      description:
        "실력 있는 멘토가 멘티들을 코칭합니다. 막막했던 개념도 눈높이에 맞는 설명과 코드 리뷰로 확실하게 내 것으로 만들 수 있어요.",
      tags: ["코드 리뷰", "기술 코칭", "피드백"],
      color: "purple",
    },
    {
      id: "study",
      iconName: "BookOpenCheck",
      title: "스터디",
      subtitle: "트랙별 자율 심화 스터디",
      description:
        "같은 목표를 가진 부원들이 모여 자율적으로 학습합니다. 혼자라면 미뤘을 공부도 함께라면 끝까지 해낼 수 있어요.",
      tags: ["기술 스터디", "CS 기초", "알고리즘"],
      color: "emerald",
    },
    {
      id: "seminar",
      iconName: "Presentation",
      title: "세미나",
      subtitle: "주간 정기 기술 발표 & 공유",
      description:
        "최신 기술 트렌드와 실전 경험을 발표로 공유합니다. 발표자는 설명하는 힘을, 청중은 새로운 인사이트를 얻어갑니다.",
      tags: ["기술 발표", "트렌드 공유", "인사이트"],
      color: "indigo",
    },
    {
      id: "competition",
      iconName: "Trophy",
      title: "대외활동",
      subtitle: "해커톤 & 공모전 팀 빌딩",
      description:
        "해커톤과 공모전에 팀으로 도전합니다. 아이디어를 실제 서비스로 만들어보는 짧고 굵은 몰입의 시간이에요.",
      tags: ["해커톤", "공모전", "팀 프로젝트"],
      color: "amber",
    },
  ],
};
