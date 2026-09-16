"use client";

export default function MembersError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <section className="w-full pt-32 pb-28 sm:pt-40 sm:pb-36 lg:pt-48 lg:pb-44 px-4 sm:px-6 lg:px-10 text-center">
      <p className="text-foreground/70">부원 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>
      <button
        type="button"
        onClick={() => retry()}
        className="mt-5 px-5 py-2.5 rounded-full border border-foreground/15 text-sm font-semibold text-foreground hover:bg-foreground/5 transition-colors"
      >
        다시 시도
      </button>
    </section>
  );
}
