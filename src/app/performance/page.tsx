import { ListPage } from "@/components/ListPage";
import { getRuntimeEvents } from "@/lib/runtimeEvents";

export const metadata = {
  title: "공연",
  description: "뮤지컬, 연극, 콘서트, 국악 공연 정보를 확인하세요.",
  alternates: { canonical: "/performance" },
  robots: { index: false, follow: true },
  openGraph: { title: "전국 공연 모음", description: "뮤지컬, 연극, 콘서트, 국악 공연 정보를 확인하세요." }
};

export default async function PerformancePage() {
  const events = await getRuntimeEvents();
  return <ListPage title="전국 공연 모음" description="뮤지컬, 연극, 콘서트, 국악 공연 정보를 확인하세요." baseEvents={events} fixedQuery={{ category: "공연" }} />;
}
