import type { FaqCategory } from "@/types/faq";

export const FAQ_DATA: {
  eyebrow: string;
  title: string;
  description: string;
  categories: FaqCategory[];
} = {
  eyebrow: "FAQ",
  title: "자주 묻는 질문",
  description: "가입, 커리큘럼, 동아리 문화에 대해 궁금한 점을 확인해보세요.",
  categories: [
    {
      id: "membership",
      icon: "💡",
      label: "가입 및 자격 요건",
      items: [
        {
          id: "membership-1",
          question: "가입 조건이나 학년 제한이 있나요? 특정 학과만 가입 가능한가요?",
          answer:
            "학년과 전공 제한이 없습니다! 현재 인공지능융합대학 재학생뿐 아니라 코딩을 처음 접하는 타 단과대 비전공자까지 다양한 학우들이 활발히 활동하고 있습니다.",
        },
        {
          id: "membership-2",
          question: "모집 시기와 절차는 어떻게 되나요?",
          answer:
            "매 학기 시작 전 방학(2월, 8월)에 신입 부원을 모집합니다. 서류 지원 후 간단한 면접을 거쳐 최종 선발되며, 자세한 일정은 에브리타임 및 동아리 공식 SNS를 통해 공지됩니다.",
        },
        {
          id: "membership-3",
          question: "코딩 노베이스(초보자)인데 스터디를 따라갈 수 있을까요?",
          answer:
            "네, 충분히 가능합니다. 주니어반의 C언어, 파이썬은 '멘토·멘티 방식'으로 운영되어 기초부터 탄탄하게 학습할 수 있도록 적극적으로 도와줍니다.",
        },
      ],
    },
    {
      id: "curriculum",
      icon: "💻",
      label: "커리큘럼 및 활동 내용",
      items: [
        {
          id: "curriculum-1",
          question: "프로젝트와 데모데이는 어떻게 진행되나요?",
          answer:
            "기획부터 디자인, 최종 구현까지 실제 실무와 유사한 단계별 프로젝트를 진행합니다. 학기 말 종강총회와 함께 열리는 동아리 최대 축제인 '데모데이'에서 한 학기 동안의 성과를 발표하며 피드백 시간과 함께 우수팀 시상(상금 수여)이 이루어집니다.",
        },
      ],
    },
    {
      id: "culture",
      icon: "🍻",
      label: "네트워킹 및 동아리 문화",
      items: [
        {
          id: "culture-1",
          question: "스터디 말고 친목 활동도 활발한가요?",
          answer:
            "물론입니다! 학기 초 동아리 MT와 선후배 네트워킹 행사인 '아롬다롬'의 전개 모임을 통해 빠르게 친해질 수 있습니다. 아롬다롬 채팅방에서 수시로 열리는 한강 맥주, 어린이대공원 피크닉 같은 번개 모임과 아로밍(클라이밍), 야발롬(야구) 등 부원들의 취향에 맞춘 테마별 소모임이 활발하게 운영됩니다.",
        },
        {
          id: "culture-2",
          question: "동아리 스터디 자료나 프로젝트 산출물은 어떻게 공유되나요?",
          answer:
            "아롬은 스마트한 동아리 운영을 지향합니다. 모든 커리큘럼 자료와 활동 히스토리는 노션(Notion)에 체계적으로 기록되며 각종 자료와 산출물은 구글 드라이브(Google Drive)를 통해 관리되고 있습니다.",
        },
      ],
    },
  ],
};
