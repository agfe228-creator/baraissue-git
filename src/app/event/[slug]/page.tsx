import { AdBox } from "@/components/AdBox";
import { CategoryBadge, StatusBadge } from "@/components/Badge";
import { DetailTabs } from "@/components/DetailTabs";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ShareButton } from "@/components/ShareButton";
import { SITE_URL } from "@/lib/constants";
import { EventItem, formatDateRange } from "@/lib/events";
import { getRuntimeEvent, getRuntimeEvents } from "@/lib/runtimeEvents";
import { CalendarDays, Clock3, Database, Globe2, MapPin, Phone, Ticket, UserRound } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

export const runtime = "edge";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await getRuntimeEvent(slug);
  if (!event) return {};
  const verified = event.slug.startsWith("tourapi-");
  return {
    title: event.title,
    description: event.description,
    alternates: { canonical: `/event/${event.slug}` },
    robots: verified ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: event.title,
      description: event.description,
      url: `${SITE_URL}/event/${event.slug}`,
      type: "article"
    },
    twitter: {
      card: "summary",
      title: event.title,
      description: event.description
    }
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getRuntimeEvent(slug);
  if (!event) notFound();
  const allEvents = await getRuntimeEvents();
  const related = getRuntimeRelatedEvents(event, allEvents);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.venue,
      address: `${event.region} ${event.city}`
    },
    organizer: {
      "@type": "Organization",
      name: event.organizer,
      url: event.website
    },
    offers: {
      "@type": "Offer",
      price: event.admissionFee,
      url: event.website
    },
    description: event.description
  };

  return (
    <main className="container-shell py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="text-sm text-slate-500">
        <Link href="/">홈</Link> 〉 <Link href={`/${event.category === "축제" ? "festival" : event.category === "박람회" ? "fair" : event.category === "전시회" ? "exhibition" : "performance"}`}>{event.category}</Link> 〉 {event.title}
      </p>
      <section className="soft-card mt-4 rounded-xl p-5 md:p-7">
        {event.image ? (
          <div className="mb-6 overflow-hidden rounded-xl bg-slate-100">
            <img src={event.image} alt={`${event.title} 행사 이미지`} className="h-64 w-full object-cover md:h-80" />
          </div>
        ) : null}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <CategoryBadge label={event.category} />
              <span className="rounded-md bg-blue-100 px-2 py-1 text-xs font-bold text-bara-blue">{event.region}</span>
              <StatusBadge label={event.status} />
            </div>
            <h1 className="text-3xl font-black text-bara-text">{event.title}</h1>
          </div>
          <div className="flex gap-2">
            <FavoriteButton slug={event.slug} label />
            <ShareButton />
          </div>
        </div>
        <div className="mt-6 grid gap-3 rounded-xl border border-bara-line bg-slate-50 p-4 md:grid-cols-2">
          <Info icon={<CalendarDays size={16} />} label="기간" value={formatDateRange(event)} />
          <Info icon={<Ticket size={16} />} label="참가비" value={event.admissionFee} />
          <Info icon={<MapPin size={16} />} label="장소" value={`${event.venue}`} />
          {event.website ? (
            <Info icon={<Globe2 size={16} />} label="공식 정보" value={<a href={event.website} target="_blank" rel="noreferrer" className="text-bara-blue">공식 홈페이지 열기</a>} />
          ) : null}
          {event.organizer ? <Info icon={<UserRound size={16} />} label="주최" value={event.organizer} /> : null}
          <Info icon={<Phone size={16} />} label="문의" value={event.contact} />
          <Info icon={<Database size={16} />} label="정보 출처" value={<SourceValue event={event} />} />
          <Info icon={<Clock3 size={16} />} label="업데이트" value={event.updatedAt.replaceAll("-", ".")} />
        </div>
        <p className="mt-4 rounded-lg bg-blue-50 px-4 py-3 text-sm leading-6 text-slate-700">
          행사 일정, 장소, 참가비는 주최 측 사정에 따라 변경될 수 있습니다. 방문 전 문의처 또는 공식 안내를 한 번 더 확인해 주세요.
        </p>
      </section>
      <div className="mt-5">
        <DetailTabs event={event} related={related} />
      </div>
      <AdBox className="mt-5 min-h-32" />
    </main>
  );
}

function Info({ icon, label, value }: { icon: ReactNode; label: string; value: ReactNode }) {
  return (
    <div className="flex gap-3 text-sm">
      <span className="mt-0.5 text-slate-500">{icon}</span>
      <span className="w-20 shrink-0 font-bold text-slate-500">{label}</span>
      <span className="font-semibold text-bara-text">{value}</span>
    </div>
  );
}

function SourceValue({ event }: { event: EventItem }) {
  if (event.slug.startsWith("tourapi-")) {
    return (
      <span>
        한국관광공사 TourAPI 및 공개 행사 정보{" "}
        <a href="https://www.data.go.kr/data/15101578/openapi.do" target="_blank" rel="noreferrer" className="text-bara-blue">
          출처 보기
        </a>
      </span>
    );
  }

  return <span>공식 출처 확인 전 편집 검수 데이터</span>;
}

function getRuntimeRelatedEvents(event: EventItem, allEvents: EventItem[]) {
  return allEvents
    .filter((item) => item.slug !== event.slug && (item.category === event.category || item.region === event.region))
    .slice(0, 4);
}
