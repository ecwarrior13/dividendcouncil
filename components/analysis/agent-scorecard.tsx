import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScoreRing } from "./score-ring";
import { BucketScores } from "./metric-bar";
import { FlagsList } from "./flags-list";
import { Shield, TrendingUp } from "lucide-react";

interface AgentScorecardProps {
  agent: "aiden" | "lexa";
  score: number | null;
  confidence: number | null;
  buckets: Record<string, number> | null;
  hardFlags: string[] | null;
  softFlags: string[] | null;
  rationale: string | null;
}

const agentConfig = {
  aiden: {
    name: "Aiden",
    subtitle: "Safety Analysis",
    icon: Shield,
    bucketLabels: {
      dividend_coverage: { name: "Dividend Coverage", weight: "35%" },
      financial_strength: { name: "Financial Strength", weight: "25%" },
      business_quality: { name: "Business Quality", weight: "25%" },
      reliability_signals: { name: "Reliability Signals", weight: "15%" },
    },
  },
  lexa: {
    name: "Lexa",
    subtitle: "Growth Analysis",
    icon: TrendingUp,
    bucketLabels: {
      dividend_growth_power: { name: "Dividend Growth Power", weight: "30%" },
      growth_support: { name: "Growth Support", weight: "25%" },
      opportunity_valuation: { name: "Opportunity & Valuation", weight: "25%" },
      safety_floor: { name: "Safety Floor", weight: "20%" },
    },
  },
};

export function AgentScorecard({
  agent,
  score,
  confidence,
  buckets,
  hardFlags,
  softFlags,
  rationale,
}: AgentScorecardProps) {
  const config = agentConfig[agent];
  const Icon = config.icon;

  return (
    <Card
      className={cn(
        "border shadow-sm overflow-hidden",
        agent === "aiden"
          ? "border-aiden/30 bg-aiden-light/30"
          : "border-lexa/30 bg-lexa-light/30",
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-xl",
                agent === "aiden" ? "bg-aiden/15" : "bg-lexa/15",
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5",
                  agent === "aiden" ? "text-aiden" : "text-lexa",
                )}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {config.name}
              </h3>
              <p className="text-sm text-muted-foreground">{config.subtitle}</p>
            </div>
          </div>
          {confidence != null && (
            <Badge variant="secondary" className="text-xs">
              {confidence}% confident
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Score Ring */}
        <div className="flex justify-center py-2">
          <ScoreRing score={score} size={140} strokeWidth={10} />
        </div>

        {/* Metrics */}
        <div className="space-y-4">
          <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Score Breakdown
          </h4>
          <BucketScores buckets={buckets} labels={config.bucketLabels} />
        </div>

        {/* Flags */}
        <FlagsList hardFlags={hardFlags} softFlags={softFlags} />

        {/* Rationale */}
        {rationale && (
          <div className="pt-4 border-t border-border">
            <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
              Analysis Summary
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {rationale}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
