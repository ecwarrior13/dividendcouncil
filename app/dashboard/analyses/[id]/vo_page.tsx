import { createServiceClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgentScorecard } from "@/components/analysis/agent-scorecard";
import { DebateTranscript } from "@/components/analysis/debate-transcript";
import {
  ArrowLeft,
  Calendar,
  MessageSquare,
  Shield,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

// Mock data for demonstration
const mockAnalysis = {
  id: "1",
  ticker: "AAPL",
  sector_profile: "Technology",
  stock_profile: "premium fit",
  safety_fit: "high",
  growth_fit: "moderate",
  created_at: new Date().toISOString(),
  joint_rationale:
    "Apple demonstrates exceptional financial strength with consistent dividend growth and a robust cash position. The company maintains strong competitive advantages through its ecosystem lock-in and brand loyalty. While growth expectations are moderate given its mature market position, the safety profile remains excellent for income-focused investors. Both agents agree this represents a core holding opportunity for dividend growth portfolios.",
  aiden_score: 82,
  aiden_confidence: 88,
  aiden_buckets: {
    dividend_coverage: 85,
    financial_strength: 90,
    business_quality: 78,
    reliability_signals: 72,
  },
  aiden_hard_flags: null,
  aiden_soft_flags: ["Dividend yield below sector average"],
  aiden_rationale:
    "Strong balance sheet with exceptional cash reserves provides excellent dividend coverage. The payout ratio remains conservative, allowing for continued dividend growth.",
  lexa_score: 71,
  lexa_confidence: 82,
  lexa_buckets: {
    dividend_growth_power: 75,
    growth_support: 68,
    opportunity_valuation: 65,
    safety_floor: 78,
  },
  lexa_hard_flags: null,
  lexa_soft_flags: [
    "Premium valuation limits near-term upside",
    "Services growth deceleration",
  ],
  lexa_rationale:
    "Solid growth prospects driven by services expansion, though hardware segments face maturation. Valuation remains elevated relative to growth trajectory.",
  debate_transcript: [
    {
      agent: "Aiden (Safety)",
      phase: "respond",
      content:
        "I maintain that Apple's exceptional cash position and conservative payout ratio make it an ideal safety-first holding. The company has consistently raised dividends for over a decade while maintaining financial flexibility. However, I acknowledge Lexa's point about valuation—investors should consider dollar-cost averaging rather than lump-sum entry at current prices.",
    },
    {
      agent: "Lexa (Growth)",
      phase: "respond",
      content:
        "While I agree with Aiden on the fundamental quality of Apple's business, I want to emphasize that growth investors should have tempered expectations. The Services segment remains the key driver, but we're seeing deceleration. The stock's premium multiple requires continued execution excellence. For pure growth seekers, there may be better opportunities elsewhere, but for dividend growth investors, this remains a solid choice.",
    },
  ],
};

const profileVariant: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  "premium fit": "default",
  "defensive compounder": "default",
  "safety focus": "default",
  "growth focus": "secondary",
  "moderate fit": "secondary",
  "speculative grower": "outline",
  caution: "outline",
  "weak fit": "destructive",
};

const fitConfig: Record<string, { color: string; bgColor: string }> = {
  high: { color: "text-success", bgColor: "bg-success/10" },
  moderate: { color: "text-warning", bgColor: "bg-warning/10" },
  low: { color: "text-danger", bgColor: "bg-danger/10" },
};

export default async function AnalysisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sb = createServiceClient();

  const { data: analysis } = await sb
    .from("dn_stock_analyses")
    .select("*")
    .eq("id", id)
    .single();

  if (!analysis) {
    return <div className="text-muted-foreground">Analysis not found.</div>;
  }
  const transcript = analysis.debate_transcript as Array<{
    agent: string;
    phase: string;
    content: string;
  }>;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Header Section */}
        <header className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                  {analysis.ticker}
                </h1>
                {analysis.sector_profile && (
                  <Badge variant="outline" className="text-xs">
                    {analysis.sector_profile}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Analyzed{" "}
                  {new Date(analysis.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Profile badges */}
            <div className="flex flex-wrap items-center gap-2">
              {analysis.stock_profile && (
                <Badge
                  variant={profileVariant[analysis.stock_profile] ?? "outline"}
                  className="text-sm px-3 py-1"
                >
                  {analysis.stock_profile.toUpperCase()}
                </Badge>
              )}
              {analysis.safety_fit && (
                <div
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${fitConfig[analysis.safety_fit]?.bgColor}`}
                >
                  <Shield
                    className={`h-3.5 w-3.5 ${fitConfig[analysis.safety_fit]?.color}`}
                  />
                  <span className={fitConfig[analysis.safety_fit]?.color}>
                    Safety: {analysis.safety_fit}
                  </span>
                </div>
              )}
              {analysis.growth_fit && (
                <div
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${fitConfig[analysis.growth_fit]?.bgColor}`}
                >
                  <TrendingUp
                    className={`h-3.5 w-3.5 ${fitConfig[analysis.growth_fit]?.color}`}
                  />
                  <span className={fitConfig[analysis.growth_fit]?.color}>
                    Growth: {analysis.growth_fit}
                  </span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Joint Assessment */}
        {analysis.joint_rationale && (
          <Card className="mb-10 border shadow-sm bg-gradient-to-r from-aiden-light/50 via-card to-lexa-light/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/15">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">
                  Joint Assessment
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {analysis.joint_rationale}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Tabbed Content */}
        <Tabs defaultValue="scorecards" className="space-y-6">
          <TabsList className="bg-muted/50 border border-border">
            <TabsTrigger
              value="scorecards"
              className="data-[state=active]:bg-card"
            >
              <Shield className="h-4 w-4 mr-2" />
              Agent Scorecards
            </TabsTrigger>
            <TabsTrigger value="debate" className="data-[state=active]:bg-card">
              <MessageSquare className="h-4 w-4 mr-2" />
              Debate Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scorecards">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AgentScorecard
                agent="aiden"
                score={analysis.aiden_score}
                confidence={analysis.aiden_confidence}
                buckets={
                  analysis.aiden_buckets as Record<string, number> | null
                }
                hardFlags={analysis.aiden_hard_flags as string[] | null}
                softFlags={analysis.aiden_soft_flags as string[] | null}
                rationale={analysis.aiden_rationale}
              />
              <AgentScorecard
                agent="lexa"
                score={analysis.lexa_score}
                confidence={analysis.lexa_confidence}
                buckets={analysis.lexa_buckets as Record<string, number> | null}
                hardFlags={analysis.lexa_hard_flags as string[] | null}
                softFlags={analysis.lexa_soft_flags as string[] | null}
                rationale={analysis.lexa_rationale}
              />
            </div>
          </TabsContent>

          <TabsContent value="debate">
            <Card className="border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Agent Debate
                  </h2>
                </div>
                <DebateTranscript transcript={transcript} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
