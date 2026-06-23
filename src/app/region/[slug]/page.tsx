import { ListPage } from "@/components/ListPage";
import { SITE_NAME, slugToRegion } from "@/lib/constants";
import { getRuntimeEvents } from "@/lib/runtimeEvents";
import type { Metadata } from "next";

export const runtime = "edge";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const region = slugToRegion(slug);
  return {
    title: `${region} 행사`,
    description: `${region}에서 열리는 축제, 박람회, 전시회, 공연 정보를 확인하세요.`,
    alternates: { canonical: `/region/${slug}` },
    robots: { index: false, follow: true },
    openGraph: { title: `${region} 행사 | ${SITE_NAME}`, description: `${region} 지역 행사 정보` }
  };
}

export default async function RegionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const region = slugToRegion(slug);
  const events = await getRuntimeEvents();
  return <ListPage title={`${region} 행사 모음`} description={`${region}의 다양한 행사를 한눈에 확인해보세요.`} baseEvents={events} fixedQuery={{ region }} />;
}
