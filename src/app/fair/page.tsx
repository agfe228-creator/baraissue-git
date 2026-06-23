import { ListPage } from "@/components/ListPage";
import { getRuntimeEvents } from "@/lib/runtimeEvents";

export const metadata = {
  title: "박람회",
  description: "산업, 교육, 취업, 라이프스타일 박람회 정보를 확인하세요.",
  alternates: { canonical: "/fair" },
  robots: { index: false, follow: true },
  openGraph: { title: "전국 박람회 모음", description: "산업, 교육, 취업, 라이프스타일 박람회 정보를 확인하세요." }
};

export default async function FairPage() {
  const events = await getRuntimeEvents();
  return <ListPage title="전국 박람회 모음" description="산업, 교육, 취업, 라이프스타일 박람회를 한눈에 확인하세요." baseEvents={events} fixedQuery={{ category: "박람회" }} />;
}
