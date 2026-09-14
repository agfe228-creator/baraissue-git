import { AdBox } from "@/components/AdBox";
import { EventCard } from "@/components/EventCard";
import { OfficialGuideSection } from "@/components/OfficialGuideSection";
import { SearchBox } from "@/components/SearchBox";
import { quickKeywords, regions, regionToSlug, statIcons } from "@/lib/constants";
import { isVerifiedEvent, sortForPublicDisplay } from "@/lib/events";
import { guidePosts } from "@/lib/guidePosts";
import { getRuntimeEvents } from "@/lib/runtimeEvents";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const events = await getRuntimeEvents();
  const publicEvents = sortForPublicDisplay(events);
  const verifiedEvents = publicEvents.filter(isVerifiedEvent);
  const displayEvents = verifiedEvents.filter((event) => event.image || event.website).slice(0, 12);
  const featuredEvents = displayEvents.filter((event) => event.status !== "종료").slice(0, 4);
  const stats = [
    ["직접 작성 가이드", `${guidePosts.length}개`],
    ["공식 축제 정보", verifiedEvents.length ? `${verifiedEvents.length.toLocaleString()}개` : "검수중"],
    ["지역 탐색", "17개"]
  ];

  return (
    <main>
      <section className="border-b border-bara-line bg-gradient-to-br from-blue-50 via-white to-slate-50">
        <div className="container-shell grid gap-8 py-12 md:grid-cols-[1fr_240px] md:py-16">
          <div>
            <p className="mb-3 text-sm font-black text-bara-blue">전국 축제 방문 가이드</p>
            <h1 className="text-4xl font-black leading-tight text-bara-text md:text-5xl">
              축제 가기 전,
              <br />
              <span className="text-bara-blue">일정과 준비를 함께 확인하세요</span>
            </h1>
            <p className="mt-5 max-w-2xl leading-7 text-slate-700">
              축제바라는 전국 축제 일정뿐 아니라 가족 나들이, 교통, 주차, 우천 운영, 요금 확인처럼 실제 방문 전에 필요한 정보를 직접 정리합니다. 공개 데이터는 출처를 확인하고, 방문 판단에 도움이 되는 가이드와 함께 제공합니다.
            </p>
            <div className="mt-8 max-w-3xl">
              <SearchBox />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
              <span className="font-bold text-slate-500">추천 검색</span>
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
                    <p className="text-xl font-black">{value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-shell py-10">
        <SectionTitle title="축제 방문 가이드" href="/posts" />
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {guidePosts.slice(0, 6).map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="soft-card rounded-xl p-5 transition hover:-translate-y-0.5 hover:border-blue-200">
              <p className="text-xs font-black text-bara-blue">{post.category} · {post.readTime}</p>
              <h2 className="mt-2 text-lg font-black text-bara-text">{post.title}</h2>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-700">{post.summary}</p>
              <p className="mt-4 text-sm font-black text-bara-blue">가이드 읽기 〉</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-shell py-4">
        <SectionTitle title="공식 출처 축제 정보" href="/festival" />
        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-5 text-sm leading-7 text-slate-700">
          축제 일정은 한국관광공사 TourAPI와 지자체 공개 안내를 참고해 정리합니다. 목록은 방문 계획을 세우기 위한 참고 정보이며, 최종 운영 여부와 요금은 주최기관의 최신 공지를 함께 확인하는 것을 권장합니다.
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {featuredEvents.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
        {!featuredEvents.length ? (
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700">
            공식 출처가 확인된 최신 축제 정보를 불러오는 중입니다. 그동안 방문 가이드에서 일정 확인 기준과 준비 사항을 먼저 확인할 수 있습니다.
          </div>
        ) : null}
        <AdBox className="mt-5" />
      </section>

      <OfficialGuideSection title="행사 방문 전 확인 가이드" />

      <section className="container-shell py-8">
        <SectionTitle title="정보 출처와 운영 기준" href="/source-policy" />
        <div className="mt-4 rounded-xl border border-bara-line bg-white p-5 text-sm leading-7 text-slate-700 shadow-sm">
          <p>
            축제바라는 한국관광공사 TourAPI, 공공데이터포털, 주최기관과 지자체의 공개 안내를 바탕으로 행사 정보를 정리합니다.
            행사 주소를 기준으로 지역을 분류하고, 일정·장소·문의처·이미지·공식 안내가 확인되는 정보를 우선 노출합니다.
            직접 작성한 방문 가이드는 특정 행사를 과장해 홍보하기보다 실제 방문자가 확인해야 할 기준을 중심으로 제공합니다.
          </p>
          <div className="mt-3 flex flex-wrap gap-3 font-bold text-bara-blue">
            <a href="https://www.data.go.kr/data/15101578/openapi.do" target="_blank" rel="noreferrer">한국관광공사 TourAPI</a>
            <a href="https://www.data.go.kr/" target="_blank" rel="noreferrer">공공데이터포털</a>
            <Link href="/source-policy">출처 및 운영정책</Link>
          </div>
        </div>
      </section>

      <section className="container-shell py-8">
        <SectionTitle title="지역별 축제 찾기" href="/region/seoul" />
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
