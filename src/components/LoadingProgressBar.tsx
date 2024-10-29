import { Progress } from "@/components/ui/progress";

interface LoadingProgressBarProps {
    isLoading: boolean;
    progress: number;
}

export default function LoadingProgressBar({ isLoading, progress }: LoadingProgressBarProps) {
    if (!isLoading) return null;
    return <Progress data-testid="loading-progress-bar" value={progress} className="w-full" />;
}
