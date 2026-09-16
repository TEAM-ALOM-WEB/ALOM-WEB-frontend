import type { Member } from "@/types/member";

export default function MemberCard({ member }: { member: Member }) {
  return (
    <article className="flex flex-col gap-4 p-6 rounded-3xl border border-foreground/10 bg-surface/85 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-foreground/25 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/50">
      <span className="self-start px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider bg-foreground/5 text-foreground border border-foreground/10">
        {member.position}
      </span>

      <div>
        <h3 className="text-lg font-extrabold text-foreground break-keep">{member.name}</h3>
        <p className="mt-1 text-sm text-foreground/55 break-keep">{member.department}</p>
      </div>

      <p className="text-xs font-semibold text-foreground tracking-wide">
        {member.admissionYear}학번
      </p>
    </article>
  );
}
