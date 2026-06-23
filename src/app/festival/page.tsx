import { ListPage } from "@/components/ListPage";
import { OfficialGuideSection } from "@/components/OfficialGuideSection";
import { isVerifiedEvent } from "@/lib/events";
import { getRuntimeEvents } from "@/lib/runtimeEvents";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const events = await getRuntimeEvents();
  const hasVerifiedEvents = events.some(isVerifiedEvent);
  return {
    title: "축제",
    description: "전국 축제 일정을 지역과 월별로 확인하세요.",
    alternates: { canonical: "/festival" },
    robots: hasVerifiedEvents ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: { title: "전국 축제 모음", description: "전국 축제 일정을 지역과 월별로 확인하세요." }
  };
}

export default async function FestivalPage() {
  const events = await getRuntimeEvents();
  const verifiedEvents = events.filter(isVerifiedEvent);
  if (!verifiedEvents.length) {
    return (
      <>
        <main className="container-shell py-8">
          <section className="soft-card rounded-xl p-5 md:p-7">
            <p className="mb-3 text-sm text-slate-500">홈 〉 축제</p>
            <h1 className="text-3xl font-black text-bara-text">전국 축제 안내</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700">
              축제바라는 공식 출처가 확인된 축제 정보를 우선 정리합니다. 일정, 장소, 요금, 교통 정보는 주최 측 사정에 따라 달라질 수 있어 공개 자료와 공식 안내를 확인한 뒤 순서대로 반영합니다.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                ["일정", "행사 시작일과 종료일, 우천 시 운영 여부, 휴무일을 확인합니다."],
                ["장소", "행사장 주소, 대중교통 접근성, 임시 주차장 운영 여부를 함께 확인합니다."],
                ["요금", "무료 입장 여부, 일부 유료 체험, 사전 예약 필요 여부를 구분해 안내합니다."]
              ].map(([title, body]) => (
                <article key={title} className="rounded-xl border border-bara-line bg-slate-50 p-4">
                  <h2 className="font-black text-bara-text">{title} 확인</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{body}</p>
                </article>
              ))}
            </div>
          </section>
        </main>
        <OfficialGuideSection title="축제 방문 전 체크리스트" />
      </>
    );
  }
  return (
    <>
      <ListPage title="전국 축제 모음" description="공식 출처가 확인된 전국 축제 정보를 우선 정리합니다." baseEvents={verifiedEvents} fixedQuery={{ category: "축제" }} />
      <OfficialGuideSection title="축제 방문 전 체크리스트" />
    </>
  );
}
