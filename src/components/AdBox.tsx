export function AdBox({ className = "" }: { className?: string }) {
  if (process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS !== "true") {
    return null;
  }

  return (
    <div className={`flex min-h-20 items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-500 ${className}`}>
      광고 영역
    </div>
  );
}
