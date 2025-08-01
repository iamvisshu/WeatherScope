import { Loader2 } from "lucide-react";

export function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <div className="w-24 h-24 flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-primary animate-spin" />
      </div>
      <p className="text-muted-foreground">Fetching latest weather...</p>
    </div>
  );
}
