import { cn } from "@/shared/libs/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-4",
  lg: "h-12 w-12 border-4",
};

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-primary border-t-transparent",
        sizeClasses[size],
        className
      )}
    />
  );
}

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export function LoadingOverlay({ isLoading, children }: LoadingOverlayProps) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}

/**
 * 전체 화면을 차지하는 로딩 표시 컴포넌트
 * 인증 확인, 초기 데이터 로딩 등에 사용
 */
export function FullPageLoading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoadingSpinner size="md" />
    </div>
  );
}

