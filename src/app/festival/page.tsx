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
  return (
    <>
      <ListPage title="전국 축제 모음" description="공식 출처가 확인된 전국 축제 정보를 우선 정리합니다." baseEvents={events.filter(isVerifiedEvent)} fixedQuery={{ category: "축제" }} />
      <OfficialGuideSection title="축제 방문 전 체크리스트" />
    </>
  );
}
