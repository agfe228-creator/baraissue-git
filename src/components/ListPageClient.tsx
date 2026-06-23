"use client";

import { AdBox } from "@/components/AdBox";
import { EventCard } from "@/components/EventCard";
import { categories, months, regions } from "@/lib/constants";
import { EventItem } from "@/lib/events";
import { filterEvents, paginate } from "@/lib/filter";
import { LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export function ListPageClient({
  title,
  description,
  baseEvents,
  fixedQuery = {}
}: {
  title: string;
  description: string;
  baseEvents: EventItem[];
  fixedQuery?: Record<string, string>;
}) {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [view, setView] = useState<"grid" | "list">("grid");

  const query = {
    category: fixedQuery.category ?? params.get("category") ?? "전체",
    region: fixedQuery.region ?? params.get("region") ?? "전체",
    month: fixedQuery.month ?? params.get("month") ?? "전체",
    status: params.get("status") ?? "전체",
    sort: params.get("sort") ?? "latest",
    q: fixedQuery.q ?? params.get("q") ?? "",
    page: params.get("page") ?? "1"
  };

  const filtered = useMemo(() => filterEvents(query, baseEvents), [baseEvents, query.category, query.region, query.month, query.status, query.sort, query.q]);
  const page = paginate(filtered, Number(query.page) || 1, 6);

  function update(name: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value === "전체" || !value) next.delete(name);
    else next.set(name, value);
    next.delete("page");
    router.push(`${pathname}${next.toString() ? `?${next.toString()}` : ""}`);
  }

  function pageHref(value: number) {
    const next = new URLSearchParams(params.toString());
    next.set("page", String(value));
    return `${pathname}?${next.toString()}`;
  }

  return (
    <main className="container-shell py-8">
      <section className="soft-card rounded-xl p-5 md:p-7">
        <p className="mb-3 text-sm text-slate-500">홈 〉 행사 모음</p>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-black text-bara-text">{title}</h1>
            <p className="mt-2 text-sm text-bara-muted">{description}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setView("grid")} aria-label="그리드 보기" className={`rounded-lg border p-2 ${view === "grid" ? "border-bara-blue text-bara-blue" : "border-bara-line"}`}>
              <LayoutGrid size={18} />
            </button>
            <button onClick={() => setView("list")} aria-label="목록 보기" className={`rounded-lg border p-2 ${view === "list" ? "border-bara-blue text-bara-blue" : "border-bara-line"}`}>
              <List size={18} />
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
          <Select label="카테고리" value={query.category} disabled={Boolean(fixedQuery.category)} options={["전체", ...categories.map((item) => item.label)]} onChange={(value) => update("category", value)} />
          <Select label="지역" value={query.region} disabled={Boolean(fixedQuery.region)} options={["전체", ...regions]} onChange={(value) => update("region", value)} />
          <Select label="월" value={query.month} disabled={Boolean(fixedQuery.month)} options={["전체", ...months]} onChange={(value) => update("month", value)} />
          <Select label="상태" value={query.status} options={["전체", "진행중", "예정", "종료"]} onChange={(value) => update("status", value)} />
          <Select label="정렬" value={query.sort} options={["latest", "start"]} labels={{ latest: "최신순", start: "시작일순" }} onChange={(value) => update("sort", value)} />
        </div>

        <p className="mt-6 text-sm text-slate-600">총 {filtered.length.toLocaleString()}개의 행사가 있습니다.</p>

        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-slate-700">
          축제바라는 행사 기간, 지역, 장소, 참가비, 진행 상태를 기준으로 정보를 정리합니다. 공개 정보는 수시로 변경될 수 있으니 방문 전 문의처와 공식 안내를 함께 확인해 주세요.
        </div>

        <div className="mt-4 rounded-xl border border-bara-line bg-white p-4 text-sm leading-7 text-slate-700">
          <p className="font-black text-bara-text">정보 출처와 검수 기준</p>
          <p className="mt-2">
            이 목록은 한국관광공사 TourAPI, 공공데이터포털 공개 자료, 주최기관과 지자체의 공개 안내를 바탕으로 정리합니다.
            지역 표기는 행사 주소를 기준으로 분류하며, 일정과 운영 내용은 주최 측 사정에 따라 바뀔 수 있습니다.
            축제바라는 출처가 확인된 행사부터 공개하고, 주소·기간·문의처가 불분명한 정보는 공개 전 보류합니다.
          </p>
          <div className="mt-2 flex flex-wrap gap-3 font-bold text-bara-blue">
            <a href="https://www.data.go.kr/data/15101578/openapi.do" target="_blank" rel="noreferrer">한국관광공사 TourAPI</a>
            <a href="https://www.data.go.kr/" target="_blank" rel="noreferrer">공공데이터포털</a>
            <Link href="/source-policy">출처 및 운영정책</Link>
          </div>
        </div>

        {page.items.length ? (
          <div className={`mt-5 grid gap-4 ${view === "grid" ? "md:grid-cols-3" : "grid-cols-1"}`}>
            {page.items.map((event) => (
              <EventCard key={event.slug} event={event} list={view === "list"} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-dashed border-bara-line bg-slate-50 p-10 text-center">
            <p className="font-black">현재 조건에 맞는 공식 출처 행사를 정리 중입니다.</p>
            <p className="mt-2 text-sm text-bara-muted">공개 자료가 확인되는 행사부터 순서대로 반영합니다.</p>
          </div>
        )}

        <AdBox className="mt-5" />

        <div className="mt-5 flex items-center justify-center gap-2">
          {Array.from({ length: Math.min(page.totalPages, 5) }, (_, index) => index + 1).map((num) => (
            <a key={num} href={pageHref(num)} className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold ${page.currentPage === num ? "bg-bara-blue text-white" : "border border-bara-line bg-white"}`}>
              {num}
            </a>
          ))}
          {page.totalPages > 5 ? <span className="px-2 text-sm">...</span> : null}
          {page.totalPages > 5 ? (
            <a href={pageHref(page.totalPages)} className="flex h-9 items-center justify-center rounded-lg border border-bara-line bg-white px-3 text-sm font-bold">
              {page.totalPages}
            </a>
          ) : null}
        </div>
      </section>
    </main>
  );
}

function Select({
  label,
  value,
  options,
  labels,
  disabled,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  labels?: Record<string, string>;
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className="text-xs font-bold text-slate-500">
      {label}
      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 h-10 w-full rounded-lg border border-bara-line bg-white px-3 text-sm font-bold text-bara-text disabled:bg-slate-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {labels?.[option] ?? option}
          </option>
        ))}
      </select>
    </label>
  );
}
