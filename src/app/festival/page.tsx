import { ListPage } from "@/components/ListPage";
import { getRuntimeEvents } from "@/lib/runtimeEvents";

export const metadata = {
  title: "축제",
  description: "전국 축제 일정을 지역과 월별로 확인하세요.",
  alternates: { canonical: "/festival" },
  openGraph: { title: "전국 축제 모음", description: "전국 축제 일정을 지역과 월별로 확인하세요." }
};

export default async function FestivalPage() {
  const events = await getRuntimeEvents();
  return <ListPage title="전국 축제 모음" description="계절별, 지역별로 열리는 축제 정보를 확인해보세요." baseEvents={events} fixedQuery={{ category: "축제" }} />;
}
