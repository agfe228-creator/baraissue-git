"use client";

import { AdBox } from "@/components/AdBox";
import { EventCard } from "@/components/EventCard";
import { categories, months, regions } from "@/lib/constants";
import { EventItem } from "@/lib/events";
import { filterEvents, paginate } from "@/lib/filter";
import { LayoutGrid, List } from "lucide-react";
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

  function goPage(value: number) {
    const next = new URLSearchParams(params.toString());
    next.set("page", String(value));
    router.push(`${pathname}?${next.toString()}`);
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

        {page.items.length ? (
          <div className={`mt-5 grid gap-4 ${view === "grid" ? "md:grid-cols-3" : "grid-cols-1"}`}>
            {page.items.map((event) => (
              <EventCard key={event.slug} event={event} list={view === "list"} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-dashed border-bara-line bg-slate-50 p-10 text-center">
            <p className="font-black">조건에 맞는 행사가 없습니다.</p>
            <p className="mt-2 text-sm text-bara-muted">필터를 줄이거나 다른 검색어로 다시 확인해 주세요.</p>
          </div>
        )}

        <AdBox className="mt-5" />

        <div className="mt-5 flex items-center justify-center gap-2">
          {Array.from({ length: Math.min(page.totalPages, 5) }, (_, index) => index + 1).map((num) => (
            <button key={num} onClick={() => goPage(num)} className={`h-9 w-9 rounded-lg text-sm font-bold ${page.currentPage === num ? "bg-bara-blue text-white" : "border border-bara-line bg-white"}`}>
              {num}
            </button>
          ))}
          {page.totalPages > 5 ? <span className="px-2 text-sm">...</span> : null}
          {page.totalPages > 5 ? (
            <button onClick={() => goPage(page.totalPages)} className="h-9 rounded-lg border border-bara-line bg-white px-3 text-sm font-bold">
              {page.totalPages}
            </button>
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
