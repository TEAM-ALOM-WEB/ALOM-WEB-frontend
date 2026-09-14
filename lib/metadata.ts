import type { Metadata } from "next";

export const SITE_NAME = "ALOM";
export const SITE_URL = "https://alom.dev";
export const DEFAULT_DESCRIPTION =
  "ALOM은 함께 배우고 협업하며 성장하는 테크 개발 동아리입니다. 커리큘럼, 프로젝트 아카이브, 부원 소개 및 신규 리크루팅 안내를 확인하세요.";

type CreatePageMetadataOptions = {
  /** 탭에 표시될 페이지 타이틀. 루트 layout의 title.template("%s | ALOM - 개발 동아리")이 자동으로 붙는다. */
  title: string;
  description?: string;
  /** 사이트 루트 기준 경로. 예: "/curriculum" */
  path: string;
  images?: NonNullable<Metadata["openGraph"]>["images"];
};

/**
 * 정적/동적 페이지 공통 metadata(및 og) 생성 헬퍼.
 * title에는 페이지 고유 타이틀만 넘기고, "| ALOM" 같은 접미사는 붙이지 않는다.
 * (루트 layout의 title.template가 접미사를 담당하므로 중복 적용을 피하기 위함)
 */
export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  images,
}: CreatePageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "website",
      ...(images ? { images } : {}),
    },
  };
}
