import { categoryColor } from "@/lib/events";

export function CategoryBadge({ label }: { label: string }) {
  return (
    <span className="rounded-md px-2 py-1 text-xs font-bold text-white" style={{ backgroundColor: categoryColor(label) }}>
      {label}
    </span>
  );
}

export function StatusBadge({ label }: { label: string }) {
  const color = label === "진행중" ? "#22C55E" : label === "예정" ? "#3B82F6" : "#94A3B8";
  return (
    <span className="rounded-md px-2 py-1 text-xs font-bold text-white" style={{ backgroundColor: color }}>
      {label}
    </span>
  );
}
