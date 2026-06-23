import { ListPage } from "@/components/ListPage";
import { getRuntimeEvents } from "@/lib/runtimeEvents";

export const metadata = {
  title: "전시회",
  description: "예술, 문화, 디자인 전시회 일정을 확인하세요.",
  alternates: { canonical: "/exhibition" },
  openGraph: { title: "전국 전시회 모음", description: "예술, 문화, 디자인 전시회 일정을 확인하세요." }
};

export default async function ExhibitionPage() {
  const events = await getRuntimeEvents();
  return <ListPage title="전국 전시회 모음" description="예술, 문화, 디자인 전시회 일정을 둘러보세요." baseEvents={events} fixedQuery={{ category: "전시회" }} />;
}
