import { AdBox } from "@/components/AdBox";
import { EventCard } from "@/components/EventCard";
import { SearchBox } from "@/components/SearchBox";
import { categories, quickKeywords, regions, regionToSlug, statIcons } from "@/lib/constants";
import { isVerifiedEvent, sortForPublicDisplay } from "@/lib/events";
import { getRuntimeEvents } from "@/lib/runtimeEvents";
import Link from "next/link";

export default async function HomePage() {
  const events = await getRuntimeEvents();
  const publicEvents = sortForPublicDisplay(events);
  const verifiedEvents = publicEvents.filter(isVerifiedEvent);
  const displayEvents = verifiedEvents.length ? verifiedEvents : [];
  const featuredEvents = displayEvents.filter((event) => event.status !== "종료").slice(0, 8);
  const latestEvents = displayEvents.slice(0, 8);
  const stats = [
    ["공식 출처 행사", verifiedEvents.length],
    ["진행중 행사", displayEvents.filter((event) => event.status === "진행중").length],
    ["예정 행사", displayEvents.filter((event) => event.status === "예정").length]
  ];

  return (
    <main>
      <section className="border-b border-bara-line bg-gradient-to-br from-blue-50 via-white to-slate-50">
        <div className="container-shell grid gap-8 py-12 md:grid-cols-[1fr_240px] md:py-16">
          <div>
            <h1 className="text-4xl font-black leading-tight text-bara-text md:text-5xl">
              이번 주 가볼 만한
              <br />
              <span className="text-bara-blue">전국 행사</span>
            </h1>
            <p className="mt-5 max-w-xl leading-7 text-slate-700">
              공공데이터와 공개 안내를 바탕으로 전국 축제, 박람회, 전시회, 공연 일정을 정리합니다.
            </p>
            <div className="mt-8 max-w-3xl">
              <SearchBox />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
              <span className="font-bold text-slate-500">인기 검색어</span>
              {quickKeywords.map((keyword) => (
                <Link key={keyword} href={`/search?q=${encodeURIComponent(keyword)}`} className="rounded-full border border-bara-line bg-white px-4 py-2 font-bold shadow-sm">
                  {keyword}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid gap-3">
            {stats.map(([label, value], index) => {
              const Icon = statIcons[index];
              return (
                <div key={label} className="soft-card flex items-center gap-3 rounded-xl p-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-bara-blue">
                    <Icon size={21} />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-500">{label}</p>
                    <p className="text-xl font-black">{Number(value).toLocaleString()}개</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-shell py-10">
        <SectionTitle title="카테고리 바로가기" href="/festival" />
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;
            const count = verifiedEvents.filter((event) => event.category === category.label).length;
            return (
              <Link key={category.key} href={category.href} className="soft-card rounded-xl p-6 text-center transition hover:-translate-y-0.5">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-white" style={{ backgroundColor: category.color }}>
                  <Icon size={28} />
                </span>
                <h2 className="mt-4 text-lg font-black">{category.label}</h2>
                <p className="mt-2 text-sm text-bara-muted">다양한 {category.label} 정보를 확인</p>
                <p className="mt-3 text-sm font-black text-bara-blue">{count ? `${count.toLocaleString()}개 행사` : "정보 수집중"}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container-shell py-4">
        <SectionTitle title="이번 주 인기 행사" href="/search?q=이번 주 행사" />
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {featuredEvents.slice(0, 4).map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
        {!featuredEvents.length ? (
          <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-5 text-sm leading-6 text-slate-700">
            현재 공식 출처 행사 정보를 다시 수집하고 있습니다. 카테고리와 지역별 목록에서 공개 정보를 확인해 주세요.
          </div>
        ) : null}
        <AdBox className="mt-5" />
      </section>

      <section className="container-shell py-8">
        <SectionTitle title="최신 등록 행사" href="/search" />
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {latestEvents.slice(0, 4).map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
        {!latestEvents.length ? (
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700">
            공식 출처가 확인된 최신 행사를 우선 노출합니다. 정보가 부족한 행사는 검색 노출보다 검수와 보강을 먼저 진행합니다.
          </div>
        ) : null}
      </section>

      <section className="container-shell py-8">
        <SectionTitle title="지역별 바로가기" href="/region/seoul" />
        <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-12">
          {regions.map((region) => (
            <Link key={region} href={`/region/${regionToSlug(region)}`} className="rounded-xl border border-bara-line bg-white py-3 text-center text-sm font-black shadow-sm hover:text-bara-blue">
              {region}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function SectionTitle({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-black text-bara-text">{title}</h2>
      <Link href={href} className="text-sm font-bold text-slate-500">
        더보기 〉
      </Link>
    </div>
  );
}
