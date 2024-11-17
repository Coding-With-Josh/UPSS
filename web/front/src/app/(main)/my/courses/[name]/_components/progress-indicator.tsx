import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  value: number;
}

export const ProgressIndicator = ({ value }: ProgressIndicatorProps) => {
  return (
    <div className="flex items-center gap-2">
      {/* Circle progress for small/medium screens */}
      <div className="lg:hidden relative size-8">
        <svg className="size-full">
          <circle
            className="text-muted-foreground/20"
            strokeWidth="5"
            stroke="currentColor"
            fill="transparent"
            r="14"
            cx="16"
            cy="16"
          />
          <circle
            className="text-primary"
            strokeWidth="5"
            strokeDasharray={88}
            strokeDashoffset={88 - (88 * value) / 100}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="14"
            cx="16"
            cy="16"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium">
          {value}%
        </span>
      </div>

      {/* Linear progress for large screens */}
      <div className="hidden lg:flex items-center gap-2">
        <Progress value={value} className="w-[100px]" />
        <span className="text-sm text-muted-foreground">{value}% Complete</span>
      </div>
    </div>
  );
};
