"use client";

import { cn } from "@/lib/utils";

interface ScoreRingProps {
  score: number | null;
  size?: number;
  strokeWidth?: number;
  className?: string;
  label?: string;
}

export function ScoreRing({
  score,
  size = 120,
  strokeWidth = 8,
  className,
  label,
}: ScoreRingProps) {
  const value = score ?? 0;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  const getColor = (score: number) => {
    if (score >= 75)
      return { stroke: "#22c55e", glow: "rgba(34, 197, 94, 0.3)" };
    if (score >= 55)
      return { stroke: "#eab308", glow: "rgba(234, 179, 8, 0.3)" };
    return { stroke: "#ef4444", glow: "rgba(239, 68, 68, 0.3)" };
  };

  const colors = getColor(value);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center",
        className,
      )}
    >
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/30"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 8px ${colors.glow})`,
            transition: "stroke-dashoffset 1s ease-out",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-3xl font-bold tabular-nums"
          style={{ color: colors.stroke }}
        >
          {score ?? "—"}
        </span>
        {label && (
          <span className="text-xs text-muted-foreground mt-0.5">{label}</span>
        )}
      </div>
    </div>
  );
}
