import { supabase } from "@/lib/supabase";
import type { Member } from "@/types/member";

interface MemberRow {
  id: string;
  name: string;
  position: string;
  student_id: string;
  department: string;
}

function toMember(row: MemberRow): Member {
  return {
    id: row.id,
    name: row.name,
    position: row.position,
    admissionYear: row.student_id.slice(0, 2),
    department: row.department,
  };
}

// 직책 표기가 다르더라도 같은 등급으로 묶어 정렬: 회장 > 부회장 > 전 회장/전 부회장 > 국장 > 고문 > 국원/수습국원
const POSITION_RANK: Record<string, number> = {
  회장: 0,
  부회장: 1,
  "전 회장": 2,
  "전 부회장": 2,
  기획국장: 3,
  교육국장: 3,
  행정국장: 3,
  홍보국장: 3,
  고문: 4,
  기획국원: 5,
  교육국원: 5,
  행정국원: 5,
  홍보국원: 5,
  수습국원: 5,
};

function positionRank(position: string): number {
  return POSITION_RANK[position] ?? 99;
}

function byPosition(a: Member, b: Member): number {
  return (
    positionRank(a.position) - positionRank(b.position) ||
    a.name.localeCompare(b.name, "ko")
  );
}

export async function getMembers(): Promise<Member[]> {
  const { data, error } = await supabase
    .from("members")
    .select("id, name, position, student_id, department");

  if (error) throw error;
  return ((data ?? []) as MemberRow[]).map(toMember).sort(byPosition);
}

export interface MemberTier {
  label: string;
  members: Member[];
}

const TIER_LABELS: Record<number, string> = {
  0: "회장단",
  3: "국장단",
  4: "고문단",
  5: "국원",
};

function tierLabel(position: string): string {
  const rank = positionRank(position);
  const tierRank = rank <= 2 ? 0 : rank;
  return TIER_LABELS[tierRank] ?? "기타";
}

export function groupMembersByTier(members: Member[]): MemberTier[] {
  const groups = new Map<string, Member[]>();

  for (const member of members) {
    const label = tierLabel(member.position);
    const group = groups.get(label);
    if (group) {
      group.push(member);
    } else {
      groups.set(label, [member]);
    }
  }

  return Array.from(groups, ([label, groupMembers]) => ({
    label,
    members: groupMembers,
  }));
}
