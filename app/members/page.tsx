import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { getMembers, groupMembersByTier } from "@/lib/members";
import MemberTierGroup from "@/components/members/MemberTierGroup";

export const metadata: Metadata = createPageMetadata({
  title: "아롬인들",
  description: "함께 성장하는 ALOM 부원들을 소개합니다.",
  path: "/members",
});

export default async function MembersPage() {
  const members = await getMembers();
  const tiers = groupMembersByTier(members);

  return (
    <section className="relative w-full pt-32 pb-28 sm:pt-40 sm:pb-36 lg:pt-48 lg:pb-44 bg-background text-foreground px-4 sm:px-6 lg:px-10 overflow-hidden">
      {/* 배경 은은한 조명 포인트 */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-30"
        aria-hidden="true"
      >
        <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.25)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.25)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* 1. 페이지 헤더 */}
        <div className="text-center mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-foreground/10 bg-foreground/5 text-xs sm:text-sm font-semibold tracking-widest text-foreground/70 uppercase mb-5">
            ALOM People
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
            아롬인들
          </h1>
          <p className="mt-5 text-base sm:text-xl text-foreground/55 max-w-2xl mx-auto font-normal">
            함께 성장하는 ALOM 부원들을 소개합니다.
          </p>
        </div>

        {/* 2. 부원 목록 */}
        {tiers.length > 0 ? (
          <div className="flex flex-col gap-16">
            {tiers.map((tier) => (
              <MemberTierGroup key={tier.label} tier={tier} />
            ))}
          </div>
        ) : (
          <p className="text-center text-foreground/55">
            아직 등록된 부원 정보가 없습니다.
          </p>
        )}
      </div>
    </section>
  );
}
