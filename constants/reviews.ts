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
    // 멘토·멘티 방식 후기 (C, 고급C, 파이썬)
    {
      id: "review-1",
      quote:
        "코딩이 처음이라 막막했는데, 배정된 멘토님이 친절하게 알려주셔서 C언어 기초를 확실하게 잡을 수 있었습니다!",
      name: "회원 A",
      role: "회원 A",
      cohort: "26학번",
      track: "C언어 기초",
      tilt: "-rotate-2",
    },
    {
      id: "review-2",
      quote:
        "방학동안 전공 필수인 고급C언어를 미리 공부할 수 있었어요! 공부도 하고 방학동안 잘 놀기도 했습니다.",
      name: "회원 B",
      role: "회원 B",
      cohort: "26학번",
      track: "고급C언어",
      tilt: "rotate-2",
    },
    {
      id: "review-3",
      quote:
        "어렵기로 소문난 고급C언어를 멘토멘티 방식으로 배우니 학교 전공 수업에 정말 큰 도움이 되었습니다. 노션으로 스터디 자료가 다 공유되어서 복습하기도 무척 편했어요.",
      name: "회원 C",
      role: "회원 C",
      cohort: "25학번",
      track: "고급C언어",
      tilt: "-rotate-1",
    },
    {
      id: "review-4",
      quote:
        "실습 중 막히는 에러가 많았는데, 멘토님과 함께 해결해가며 코딩 실력이 훌쩍 뛰었습니다. 아롬의 멘토링 시스템은 주니어에게 최고의 커리큘럼입니다.",
      name: "회원 D",
      role: "회원 D",
      cohort: "24학번",
      track: "고급C언어",
      tilt: "rotate-3",
    },
    {
      id: "review-5",
      quote:
        "파이썬 기초 멘토링 덕분에 비전공자나 다름없던 저도 코딩에 흥미를 붙이게 되었습니다! 노션에 활동 히스토리와 커리큘럼이 체계적으로 정리되어 있어 따라가기 좋았어요.",
      name: "회원 E",
      role: "회원 E",
      cohort: "24학번",
      track: "파이썬 기초",
      tilt: "-rotate-2",
    },
    // 팀별 자율 스터디 & 데모데이 후기 (자구, 알고리즘, 프론트, AI 등)
    {
      id: "review-6",
      quote:
        "자료구조 스터디를 통해 팀원들과 토론하며 공부하니 혼자 할 때보다 훨씬 이해가 빨랐습니다. 팀별 자체 진행이라 책임감도 더 생기고 주도적으로 학습하게 되더라고요.",
      name: "회원 F",
      role: "회원 F",
      cohort: "23학번",
      track: "자료구조",
      tilt: "rotate-1",
    },
    {
      id: "review-7",
      quote:
        "자료구조에 대한 이론적 이해에 충분히 도움이 되었고 학기가 끝나고 진행했던 회식도 너무 재밌었습니다!",
      name: "회원 G",
      role: "회원 G",
      cohort: "25학번",
      track: "자료구조",
      tilt: "-rotate-3",
    },
    {
      id: "review-8",
      quote:
        "HTML, CSS, JS 프론트 기초를 팀원들과 함께 공부하며 웹 개발의 재미를 알게 되었습니다. 클라이밍 소모임인 '아로밍' 활동까지 병행하며 힐링과 공부를 동시에 챙겼어요.",
      name: "회원 H",
      role: "회원 H",
      cohort: "25학번",
      track: "프론트 기초",
      tilt: "rotate-2",
    },
    {
      id: "review-9",
      quote:
        "React 스터디 후 프로젝트까지 이어져 데모데이에서 기획한 아이디어를 직접 시연해 볼 수 있었습니다. 개발부터 최종 발표, 피드백까지 잊지 못할 경험이었습니다.",
      name: "회원 I",
      role: "회원 I",
      cohort: "24학번",
      track: "React",
      tilt: "-rotate-1",
    },
    {
      id: "review-10",
      quote:
        "방학동안 AI 머신러닝 스터디로 뼈대를 잡고 팀 프로젝트에 적용해 보며 실무 감각을 익혔습니다. 토이 프로젝트를 하며 협업 능력도 기르고 발표를 위해 열심히 공부하게 되었던 것 같습니다. 덕분에 알찬 방학을 보낼 수 있었습니다!",
      name: "회원 J",
      role: "회원 J",
      cohort: "25학번",
      track: "AI-ML",
      tilt: "rotate-3",
    },
    // 졸업생 및 실무 연계 후기 (Java, Spring)
    {
      id: "review-11",
      quote:
        "시니어반 자바 스터디에서 객체지향의 기본기를 탄탄하게 다진 덕분에, 현재 백엔드 개발자로 실무에 적응하는 데 큰 밑거름이 되었습니다. 아롬은 취업에 직결되는 진짜 스터디를 하는 곳입니다.",
      name: "회원 K",
      role: "회원 K",
      cohort: "졸업생",
      track: "Java",
      tilt: "-rotate-2",
    },
    {
      id: "review-12",
      quote:
        "Spring 스터디와 종강총회 데모데이 프로젝트 경험은 실제 실무 프로세스와 가장 흡사했습니다. 기획부터 개발, 팀 협업까지 아롬의 체계적인 시스템을 후배들에게 적극 추천합니다.",
      name: "회원 L",
      role: "회원 L",
      cohort: "졸업생",
      track: "Spring",
      tilt: "rotate-1",
    },
    // 네트워킹 및 종합 후기
    {
      id: "review-13",
      quote:
        "체계적인 스터디 커리큘럼은 물론이고, NET워크(테니스), 귤락(음악) 같은 소모임과 어린이대공원 피크닉 번개 모임 등 다채로운 활동이 아롬의 가장 큰 매력입니다. 개발 실력과 끈끈한 선후배 인맥을 모두 얻어 갈 수 있어요!",
      name: "회원 M",
      role: "회원 M",
      cohort: "24학번",
      track: "종합 후기",
      tilt: "-rotate-3",
    },
    {
      id: "review-14",
      quote:
        "동아리 단톡방에서 '오늘 한강 맥주 마시러 갈 사람!' 한마디에 바로 모이는 자유로운 분위기가 너무 좋습니다. 코딩하다 지칠 때 동기, 선배들과 함께하는 번개 모임은 대학 생활의 확실한 활력소예요.",
      name: "회원 N",
      role: "회원 N",
      cohort: "한강 맥주",
      track: "번개 모임",
      tilt: "rotate-2",
    },
    {
      id: "review-15",
      quote:
        "MT는 정말 잊지 못할 추억입니다! 1박 2일 동안 부원들과 밤새워 스위치 게임도 하고 소통도 했습니다! 앞으로 한 학기 동안 스터디를 함께할 끈끈한 유대감이 생겼어요.",
      name: "회원 O",
      role: "회원 O",
      cohort: "네트워킹",
      track: "동아리 MT",
      tilt: "-rotate-1",
    },
    {
      id: "review-16",
      quote:
        "단순한 학술 동아리를 넘어 '야발롬(야구 관람)', '아로밍(클라이밍)' 같은 테마별 소모임이 활성화되어 있다는 게 큰 장점입니다. 관심사가 맞는 부원들과 개발 외적인 취미까지 공유할 수 있어 소속감이 배가 됩니다.",
      name: "회원 P",
      role: "회원 P",
      cohort: "취미 공유",
      track: "테마별 소모임",
      tilt: "rotate-3",
    },
    {
      id: "review-17",
      quote:
        "날씨 좋은 날 다 같이 돗자리 들고 어린이대공원으로 피크닉을 가거나, 자양동에서 모이는 등 공부할 땐 빡세게 집중하고 놀 땐 확실하게 노는 아롬만의 문화가 정말 좋습니다!",
      name: "회원 Q",
      role: "회원 Q",
      cohort: "네트워킹",
      track: "피크닉 & 번개",
      tilt: "-rotate-2",
    },
  ],
};
