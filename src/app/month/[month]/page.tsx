import { ListPage } from "@/components/ListPage";
import { getRuntimeEvents } from "@/lib/runtimeEvents";
import type { Metadata } from "next";

export const runtime = "edge";

export async function generateMetadata({ params }: { params: Promise<{ month: string }> }): Promise<Metadata> {
  const { month } = await params;
  return {
    title: `${month}월 행사`,
    description: `${month}월에 열리는 전국 축제, 박람회, 전시회, 공연 정보를 확인하세요.`,
    alternates: { canonical: `/month/${month}` }
  };
}

export default async function MonthPage({ params }: { params: Promise<{ month: string }> }) {
  const { month } = await params;
  const events = await getRuntimeEvents();
  return <ListPage title={`${month}월 행사 모음`} description={`${month}월에 가볼 만한 전국 행사를 확인하세요.`} baseEvents={events} fixedQuery={{ month: `${month}월` }} />;
}
