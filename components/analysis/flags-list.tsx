import { cn } from "@/lib/utils";
import { AlertTriangle, XCircle } from "lucide-react";

interface FlagsListProps {
  hardFlags: string[] | null;
  softFlags: string[] | null;
}

export function FlagsList({ hardFlags, softFlags }: FlagsListProps) {
  if (!hardFlags?.length && !softFlags?.length) return null;

  return (
    <div className="space-y-2 mt-4">
      {hardFlags?.map((f, i) => (
        <div
          key={i}
          className={cn(
            "flex items-start gap-2 text-sm rounded-lg px-3 py-2",
            "bg-red-500/10 border border-red-500/20 text-red-400",
          )}
        >
          <XCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <span>{f}</span>
        </div>
      ))}
      {softFlags?.map((f, i) => (
        <div
          key={i}
          className={cn(
            "flex items-start gap-2 text-sm rounded-lg px-3 py-2",
            "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400",
          )}
        >
          <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
          <span>{f}</span>
        </div>
      ))}
    </div>
  );
}
