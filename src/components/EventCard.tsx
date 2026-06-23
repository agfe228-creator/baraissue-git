import { BadgeCheck, CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";
import { CategoryBadge, StatusBadge } from "@/components/Badge";
import { FavoriteButton } from "@/components/FavoriteButton";
import { EventItem, formatDateRange } from "@/lib/events";

export function EventCard({ event, list = false }: { event: EventItem; list?: boolean }) {
  return (
    <Link
      href={`/event/${event.slug}`}
      className={`soft-card group flex h-full rounded-xl p-4 transition hover:-translate-y-0.5 hover:border-blue-200 ${list ? "flex-col gap-3 sm:flex-row sm:items-center" : "flex-col"}`}
    >
      <div className="min-w-0 flex-1">
        {event.image ? (
          <div className="mb-4 h-32 overflow-hidden rounded-lg bg-slate-100">
            <img src={event.image} alt={`${event.title} 행사 이미지`} className="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" />
          </div>
        ) : null}
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex gap-2">
            <CategoryBadge label={event.category} />
            <StatusBadge label={event.status} />
          </div>
          <FavoriteButton slug={event.slug} />
        </div>
        <h3 className="line-clamp-2 text-base font-black text-bara-text group-hover:text-bara-blue">{event.title}</h3>
        <div className="mt-3 space-y-2 text-sm text-slate-600">
          <p className="flex items-center gap-2">
            <CalendarDays size={15} />
            {formatDateRange(event)}
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={15} />
            {event.region} · {event.venue}
          </p>
          <p className="flex items-center gap-2 font-bold text-bara-text">
            <BadgeCheck size={15} />
            {event.admissionFee}
          </p>
        </div>
      </div>
      <span className="mt-4 inline-flex h-9 items-center justify-center rounded-lg border border-bara-line px-3 text-sm font-bold text-bara-text transition group-hover:border-bara-blue group-hover:text-bara-blue">
        자세히 보기
      </span>
    </Link>
  );
}
