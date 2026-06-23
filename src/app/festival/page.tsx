import { ListPage } from "@/components/ListPage";
import { isVerifiedEvent } from "@/lib/events";
import { getRuntimeEvents } from "@/lib/runtimeEvents";

export const metadata = {
  title: "축제",
  description: "전국 축제 일정을 지역과 월별로 확인하세요.",
  alternates: { canonical: "/festival" },
  openGraph: { title: "전국 축제 모음", description: "전국 축제 일정을 지역과 월별로 확인하세요." }
};

export default async function FestivalPage() {
  const events = await getRuntimeEvents();
  return <ListPage title="전국 축제 모음" description="공식 출처가 확인된 전국 축제 정보를 우선 정리합니다." baseEvents={events.filter(isVerifiedEvent)} fixedQuery={{ category: "축제" }} />;
}
