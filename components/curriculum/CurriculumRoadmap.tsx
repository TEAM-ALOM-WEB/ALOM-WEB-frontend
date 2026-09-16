import {
  Terminal,
  Code2,
  FileCode,
  Boxes,
  GitBranch,
  Coffee,
  Leaf,
  LayoutTemplate,
  Atom,
  Brain,
  Network,
  Rocket,
  Server,
  MonitorSmartphone,
  BrainCircuit,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import {
  CURRICULUM_ROADMAP,
  RoadmapIconName,
  RoadmapTrackTheme,
} from "@/constants/curriculum";

const ICON_MAP: Record<RoadmapIconName, React.ComponentType<{ className?: string }>> = {
  Terminal,
  Code2,
  FileCode,
  Boxes,
  GitBranch,
  Coffee,
  Leaf,
  LayoutTemplate,
  Atom,
  Brain,
  Network,
  Rocket,
  Server,
  MonitorSmartphone,
  BrainCircuit,
};

// 트랙별 테마 컬러 (배지, 카드 호버 보더, 아이콘, 커넥터 라인에서 공통으로 사용)
const TRACK_THEME: Record<
  RoadmapTrackTheme,
  {
    badge: string;
    border: string;
    iconBg: string;
    line: string;
    lineText: string;
  }
> = {
  blue: {
    badge: "bg-blue-950/80 text-blue-400 border border-blue-800/60",
    border: "hover:border-blue-500/40",
    iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    line: "bg-blue-500/60",
    lineText: "text-blue-400/80",
  },
  amber: {
    badge: "bg-amber-950/80 text-amber-400 border border-amber-800/60",
    border: "hover:border-amber-500/40",
    iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    line: "bg-amber-500/60",
    lineText: "text-amber-400/80",
  },
  purple: {
    badge: "bg-purple-950/80 text-purple-400 border border-purple-800/60",
    border: "hover:border-purple-500/40",
    iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    line: "bg-purple-500/60",
    lineText: "text-purple-400/80",
  },
};

// 주니어반 3행에 걸친 세로 위치(%) - 3개 트랙 행의 중앙과 맞춘다
const ROW_CENTERS = ["16.6667%", "50%", "83.3333%"];

function SubjectChip({
  label,
  iconName,
}: {
  label: string;
  iconName: RoadmapIconName;
}) {
  const Icon = ICON_MAP[iconName];
  return (
    <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-foreground/[0.04] border border-foreground/10 hover:bg-foreground/[0.08] hover:border-cyan-500/30 transition-all duration-200">
      <span className="shrink-0 w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
        <Icon className="w-4 h-4" />
      </span>
      <span className="text-sm font-semibold text-foreground/85">{label}</span>
    </div>
  );
}

function StepCard({
  label,
  iconName,
  theme,
}: {
  label: string;
  iconName: RoadmapIconName;
  theme: RoadmapTrackTheme;
}) {
  const Icon = ICON_MAP[iconName];
  const t = TRACK_THEME[theme];
  return (
    <div
      className={`flex items-center gap-3 px-4 py-4 rounded-2xl bg-surface/85 border border-foreground/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/50 ${t.border}`}
    >
      <span
        className={`shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center ${t.iconBg}`}
      >
        <Icon className="w-5 h-5" />
      </span>
      <span className="text-sm sm:text-base font-bold text-foreground break-keep leading-tight">{label}</span>
    </div>
  );
}

/**
 * 데스크톱 전용 팬아웃/팬인 커넥터.
 * direction="out": 왼쪽(주니어)에서 오른쪽(3개 트랙)으로 하나의 선이 갈라진다.
 * direction="in": 왼쪽(3개 트랙)에서 오른쪽(파이널)으로 세 선이 하나로 모인다.
 */
function FanConnector({
  direction,
  themes,
}: {
  direction: "out" | "in";
  themes: RoadmapTrackTheme[];
}) {
  const trunkX = direction === "out" ? "0%" : "100%";

  return (
    <div className="relative h-full w-full" aria-hidden="true">
      {/* 세로 트렁크 라인 (하나의 경로가 갈라지거나 모이는 지점) */}
      <div
        className="absolute w-0.5 rounded-full bg-foreground/25"
        style={{ left: trunkX, top: ROW_CENTERS[0], bottom: `calc(100% - ${ROW_CENTERS[2]})` }}
      />
      {/* 3개 행으로 뻗는 가로 라인 + 화살표 (트랙별 테마 색상) */}
      {ROW_CENTERS.map((top, index) => (
        <div
          key={index}
          className="absolute left-0 right-0 flex items-center"
          style={{ top, transform: "translateY(-50%)" }}
        >
          <div className={`h-0.5 w-full rounded-full ${TRACK_THEME[themes[index]].line}`} />
          <ChevronRight
            className={`absolute w-4 h-4 ${TRACK_THEME[themes[index]].lineText} ${
              direction === "out" ? "right-0" : "right-0 translate-x-1/2"
            }`}
          />
        </div>
      ))}
    </div>
  );
}

export default function CurriculumRoadmap() {
  const { junior, tracks, final } = CURRICULUM_ROADMAP;

  return (
    <div>
      {/* 스크린리더용 흐름 요약 (시각적 다이어그램 보완) */}
      <p className="sr-only">
        {junior.title} 공통 기초를 마치면 {tracks.map((t) => t.name).join(", ")} 중 하나를
        선택해 학습하고, 최종적으로 {final.title}에 합류합니다.
      </p>

      {/* ===== 데스크톱: 좌 → 우 플로우차트 ===== */}
      <div
        className="hidden xl:grid gap-x-0 gap-y-5"
        style={{
          gridTemplateColumns: "232px 64px 208px 48px 208px 64px 288px",
          gridTemplateRows: "repeat(3, auto)",
        }}
      >
        {/* 주니어반 카드 (3행 전체를 차지) */}
        <div
          className="rounded-3xl border border-foreground/10 bg-surface/85 backdrop-blur-md p-6 flex flex-col justify-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/50"
          style={{ gridColumn: "1", gridRow: "1 / span 3" }}
        >
          <div>
            <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold tracking-wider bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
              {junior.badge}
            </span>
            <h3 className="mt-3 text-xl font-extrabold text-foreground">{junior.title}</h3>
            <p className="text-sm text-foreground/55">{junior.subtitle}</p>
          </div>
          <div className="flex flex-col gap-2">
            {junior.subjects.map((subject) => (
              <SubjectChip key={subject.id} label={subject.label} iconName={subject.iconName} />
            ))}
          </div>
        </div>

        {/* 팬아웃 커넥터: 주니어 → 3개 트랙 */}
        <div style={{ gridColumn: "2", gridRow: "1 / span 3" }}>
          <FanConnector direction="out" themes={tracks.map((t) => t.theme)} />
        </div>

        {/* 3개 트랙 행 */}
        {tracks.map((track, rowIndex) => (
          <div key={`${track.id}-step1`} style={{ gridColumn: "3", gridRow: rowIndex + 1 }} className="flex flex-col gap-2 justify-center">
            <span
              className={`self-start px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider ${TRACK_THEME[track.theme].badge}`}
            >
              {track.name}
            </span>
            <StepCard label={track.steps[0].label} iconName={track.steps[0].iconName} theme={track.theme} />
          </div>
        ))}

        {/* 트랙 내부 화살표 (step1 → step2) */}
        {tracks.map((track, rowIndex) => (
          <div
            key={`${track.id}-arrow`}
            style={{ gridColumn: "4", gridRow: rowIndex + 1 }}
            className="flex items-center justify-center"
            aria-hidden="true"
          >
            <ChevronRight className="w-6 h-6 text-foreground/40" />
          </div>
        ))}

        {tracks.map((track, rowIndex) => (
          <div key={`${track.id}-step2`} style={{ gridColumn: "5", gridRow: rowIndex + 1 }} className="flex items-center">
            <StepCard label={track.steps[1].label} iconName={track.steps[1].iconName} theme={track.theme} />
          </div>
        ))}

        {/* 팬인 커넥터: 3개 트랙 → 파이널 */}
        <div style={{ gridColumn: "6", gridRow: "1 / span 3" }}>
          <FanConnector direction="in" themes={tracks.map((t) => t.theme)} />
        </div>

        {/* 파이널 카드 (3행 전체를 차지, 시그니처 그라디언트로 강조) */}
        <div
          className="relative rounded-3xl p-[1px] bg-gradient-to-br from-cyan-400/60 via-indigo-500/60 to-purple-500/60 transition-all duration-300 hover:-translate-y-1.5"
          style={{ gridColumn: "7", gridRow: "1 / span 3" }}
        >
          <div className="h-full rounded-[calc(1.5rem-1px)] bg-[#0b0d13] p-7 flex flex-col justify-center gap-4 shadow-2xl shadow-indigo-950/60">
            <span className="inline-flex w-fit items-center px-3 py-1 rounded-lg text-xs font-bold tracking-wider bg-white/10 text-white border border-white/20">
              {final.badge}
            </span>
            <div className="min-w-0">
              <h3 className="text-2xl font-extrabold text-white leading-tight break-keep">{final.title}</h3>
              <p className="text-sm text-neutral-400 break-keep">{final.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== 모바일 / 태블릿: 세로형 타임라인 ===== */}
      <div className="flex flex-col items-stretch gap-0 xl:hidden">
        {/* 주니어반 */}
        <div className="rounded-3xl border border-foreground/10 bg-surface/85 backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40">
          <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold tracking-wider bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
            {junior.badge}
          </span>
          <h3 className="mt-3 text-xl font-extrabold text-foreground">{junior.title}</h3>
          <p className="text-sm text-foreground/55 mb-4">{junior.subtitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {junior.subjects.map((subject) => (
              <SubjectChip key={subject.id} label={subject.label} iconName={subject.iconName} />
            ))}
          </div>
        </div>

        <div className="flex justify-center py-3" aria-hidden="true">
          <ChevronDown className="w-6 h-6 text-foreground/30" />
        </div>

        {/* 3개 트랙 */}
        <div className="flex flex-col gap-4">
          {tracks.map((track) => (
            <div
              key={track.id}
              className={`rounded-3xl border border-foreground/10 bg-surface/85 backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-1 ${TRACK_THEME[track.theme].border}`}
            >
              <span
                className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider ${TRACK_THEME[track.theme].badge}`}
              >
                {track.name}
              </span>
              <div className="mt-3 flex items-center gap-3">
                <StepCard label={track.steps[0].label} iconName={track.steps[0].iconName} theme={track.theme} />
                <ChevronRight className="w-5 h-5 text-foreground/25 shrink-0" aria-hidden="true" />
                <StepCard label={track.steps[1].label} iconName={track.steps[1].iconName} theme={track.theme} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center py-3" aria-hidden="true">
          <ChevronDown className="w-6 h-6 text-foreground/30" />
        </div>

        {/* 파이널 */}
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-cyan-400/60 via-indigo-500/60 to-purple-500/60 transition-all duration-300 hover:-translate-y-1.5">
          <div className="rounded-[calc(1.5rem-1px)] bg-[#0b0d13] p-7 shadow-2xl shadow-indigo-950/60">
            <span className="inline-block mb-1 px-3 py-1 rounded-lg text-xs font-bold tracking-wider bg-white/10 text-white border border-white/20">
              {final.badge}
            </span>
            <h3 className="text-2xl font-extrabold text-white leading-tight break-keep">{final.title}</h3>
            <p className="text-sm text-neutral-400 break-keep">{final.subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
