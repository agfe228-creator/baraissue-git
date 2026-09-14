import { ListPage } from "@/components/ListPage";
import { getRuntimeEvents } from "@/lib/runtimeEvents";
import type { Metadata } from "next";

export const runtime = "edge";

export async function generateMetadata({ params }: { params: Promise<{ month: string }> }): Promise<Metadata> {
  const { month } = await params;
  return {
    title: `${month}월 축제 찾기`,
    description: `${month}월에 열리는 전국 축제 정보를 사이트 안에서 확인하세요.`,
    alternates: { canonical: `/month/${month}` },
    robots: { index: false, follow: true }
  };
}

export default async function MonthPage({ params }: { params: Promise<{ month: string }> }) {
  const { month } = await params;
  const events = await getRuntimeEvents();
  return <ListPage title={`${month}월 축제 찾기`} description={`${month}월에 가볼 만한 전국 축제를 확인하세요.`} baseEvents={events} fixedQuery={{ month: `${month}월` }} />;
}
