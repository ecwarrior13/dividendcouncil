import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp } from "lucide-react";

interface TranscriptEntry {
  agent: string;
  phase: string;
  content: string;
}

interface DebateTranscriptProps {
  transcript: TranscriptEntry[];
}

export function DebateTranscript({ transcript }: DebateTranscriptProps) {
  const responses = transcript.filter((t) => t.phase === "respond");

  if (responses.length === 0) return null;

  return (
    <div className="space-y-4">
      {responses.map((entry, i) => {
        const isAiden = entry.agent.toLowerCase().includes("aiden");
        const Icon = isAiden ? Shield : TrendingUp;

        return (
          <div
            key={i}
            className={cn(
              "rounded-xl border p-5 transition-colors",
              isAiden
                ? "bg-aiden-light/50 border-aiden/20 hover:border-aiden/40"
                : "bg-lexa-light/50 border-lexa/20 hover:border-lexa/40",
            )}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-lg",
                  isAiden ? "bg-aiden/15" : "bg-lexa/15",
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4",
                    isAiden ? "text-aiden" : "text-lexa",
                  )}
                />
              </div>
              <div>
                <span className="font-medium text-foreground">
                  {entry.agent}
                </span>
                <Badge
                  variant="outline"
                  className={cn(
                    "ml-2 text-xs",
                    isAiden
                      ? "border-aiden/30 text-aiden"
                      : "border-lexa/30 text-lexa",
                  )}
                >
                  Response
                </Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {entry.content}
            </p>
          </div>
        );
      })}
    </div>
  );
}
