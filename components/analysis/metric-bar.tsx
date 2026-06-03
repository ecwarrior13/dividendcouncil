"use client";

import { cn } from "@/lib/utils";

interface MetricBarProps {
  label: string;
  value: number;
  weight?: string;
}

function getScoreColor(score: number) {
  if (score >= 75) return "bg-green-500";
  if (score >= 55) return "bg-yellow-500";
  return "bg-red-500";
}

function getScoreTextColor(score: number) {
  if (score >= 75) return "text-green-400";
  if (score >= 55) return "text-yellow-400";
  return "text-red-400";
}

export function MetricBar({ label, value, weight }: MetricBarProps) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground">{label}</span>
          {weight && (
            <span className="text-xs text-muted-foreground">({weight})</span>
          )}
        </div>
        <span
          className={cn(
            "text-sm font-semibold tabular-nums",
            getScoreTextColor(value),
          )}
        >
          {value}
        </span>
      </div>
      <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out",
            getScoreColor(value),
          )}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

interface BucketScoresProps {
  buckets: Record<string, number> | null;
  labels: Record<string, { name: string; weight: string }>;
}

export function BucketScores({ buckets, labels }: BucketScoresProps) {
  if (!buckets) return null;

  return (
    <div className="space-y-4">
      {Object.entries(labels).map(([key, { name, weight }]) => {
        const val = buckets[key] ?? 0;
        return <MetricBar key={key} label={name} value={val} weight={weight} />;
      })}
    </div>
  );
}
