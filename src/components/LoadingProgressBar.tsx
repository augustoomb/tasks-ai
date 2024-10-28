import { Progress } from "@/components/ui/progress";

interface LoadingProgressBarProps {
    isLoading: boolean;
    progress: number;
}

function LoadingProgressBar({ isLoading, progress }: LoadingProgressBarProps) {
    if (!isLoading) return null;
    return <Progress value={progress} className="w-full" />;
}

export default LoadingProgressBar;