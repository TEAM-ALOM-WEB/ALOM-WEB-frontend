# 페이지별 title/metadata 적용 가이드

브라우저 탭 title을 페이지별로 다르게 표시하기 위한 Next.js App Router `generateMetadata` / 정적 `metadata` 적용 규칙입니다. 새 페이지(`curriculum`, `archive`, `members`, `faq` 등)를 추가할 때 이 문서를 따르세요.

## 1. 기본 구조 (이미 적용됨)

`app/layout.tsx`에 title template와 default title이 설정되어 있습니다.

```ts
export const metadata: Metadata = {
  title: {
    template: "%s | ALOM - 개발 동아리",
    default: "ALOM - 함께 성장하는 개발 동아리",
  },
  ...
};
```

- 하위 페이지가 `title`을 지정하지 않으면 `default`가 사용됩니다. (예: 홈 `app/page.tsx`는 별도 title 없이 default를 그대로 사용 중)
- 하위 페이지가 `title: "커리큘럼"`처럼 문자열을 지정하면 결과는 `커리큘럼 | ALOM - 개발 동아리`가 됩니다.
- **`template`은 반드시 루트 `layout.tsx`에서만 정의**하세요. 하위 page/layout에서 `title.template`을 또 설정하면 안 됩니다. (`title.absolute`도 layout 접미사를 무시하므로 특별한 이유가 없으면 사용하지 않습니다.)

## 2. 정적 콘텐츠 페이지 (curriculum, archive, members, faq 등)

각 `page.tsx`에서 `export const metadata`를 추가합니다. `@/lib/metadata`의 `createPageMetadata` 헬퍼를 사용하면 OG 태그까지 일관되게 채워집니다.

```tsx
// app/curriculum/page.tsx
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "커리큘럼",
  description: "ALOM의 트랙별 학습 로드맵과 세미나, 스터디 일정을 확인하세요.",
  path: "/curriculum",
});

export default function CurriculumPage() {
  // ...
}
```

`title`에는 접미사(`| ALOM`) 없이 페이지 고유 타이틀만 넘깁니다. 접미사는 layout의 template가 자동으로 붙입니다.

## 3. 동적 콘텐츠 페이지 ([id] 라우트)

게시글/프로젝트 상세처럼 데이터에 따라 title이 바뀌어야 하는 라우트는 `generateMetadata`를 사용합니다. 페이지 본문에서 쓰는 데이터 fetch 함수를 그대로 재사용하고, 같은 요청이 중복되지 않도록 `react`의 `cache`로 감싸는 것을 권장합니다.

```tsx
// app/archive/[projectId]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { getArchiveProject } from "@/lib/archive"; // 페이지 본문과 공유하는 데이터 fetch 함수 (react cache로 감싸져 있다고 가정)

type Props = {
  params: Promise<{ projectId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { projectId } = await params;
  const project = await getArchiveProject(projectId);

  if (!project) {
    return createPageMetadata({
      title: "존재하지 않는 프로젝트",
      path: `/archive/${projectId}`,
    });
  }

  return createPageMetadata({
    title: project.title,
    description: project.summary,
    path: `/archive/${projectId}`,
    images: project.thumbnailUrl ? [project.thumbnailUrl] : undefined,
  });
}

export default async function ArchiveProjectPage({ params }: Props) {
  const { projectId } = await params;
  const project = await getArchiveProject(projectId);
  if (!project) notFound();
  // ...
}
```

- `metadata` 객체(static)와 `generateMetadata`(dynamic)는 같은 route segment에서 동시에 export할 수 없습니다. 데이터에 따라 title이 바뀌는 라우트는 `generateMetadata`만 사용하세요.
- `params`는 Promise이므로 반드시 `await` 후 사용합니다 (Next.js 15+ 규칙).

## 4. title 템플릿 중복 방지 체크리스트

- [ ] `title.template`은 `app/layout.tsx`에만 존재하는가 (하위 layout/page에 중복 정의 없음)
- [ ] 각 page/generateMetadata의 `title`에 `| ALOM` 같은 접미사를 수동으로 붙이지 않았는가
- [ ] 브라우저 개발자 도구에서 실제 `<title>` 태그를 확인해 `... | 아롬 | 아롬` 같은 중복이 없는가

## 5. 참고

- 헬퍼: `@/lib/metadata.ts` (`createPageMetadata`)
- Next.js 공식 문서(로컬): `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md`
