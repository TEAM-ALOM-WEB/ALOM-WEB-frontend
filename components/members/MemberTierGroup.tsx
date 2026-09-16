import type { MemberTier } from "@/lib/members";
import MemberCard from "@/components/members/MemberCard";

export default function MemberTierGroup({ tier }: { tier: MemberTier }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">{tier.label}</h2>
        <span className="text-sm font-semibold text-foreground/40">{tier.members.length}명</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tier.members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}
