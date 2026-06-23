import { ListPage } from "@/components/ListPage";
import { SITE_NAME, slugToRegion } from "@/lib/constants";
import { getRuntimeEvents } from "@/lib/runtimeEvents";
import type { Metadata } from "next";

export const runtime = "edge";

const regionGuides: Record<string, string> = {
  서울: "서울 행사는 대중교통 접근성이 좋은 편이지만 도심 혼잡도가 높아 행사장 주변 역, 버스 정류장, 도보 이동 시간을 함께 확인하는 것이 좋습니다. 주말에는 한강공원, 광장, 전시장 주변 주차가 빠르게 마감될 수 있어 대중교통 이용을 우선 고려해 보세요.",
  경기: "경기 지역은 도시 간 이동 거리가 넓어 행사장 주소와 대중교통 환승 시간을 함께 보는 것이 중요합니다. 가족 단위 방문이라면 주차장 위치, 행사장 입구, 주변 휴식 공간을 미리 확인하면 현장 이동이 훨씬 편해집니다.",
  인천: "인천 행사는 도심권, 송도권, 해안권에 따라 이동 동선이 크게 달라질 수 있습니다. 공항철도, 지하철, 버스 이용 가능 여부와 함께 해안가 행사라면 날씨와 바람, 야외 운영 여부를 확인하는 것이 좋습니다.",
  부산: "부산 행사는 해운대, 광안리, 원도심 등 관광 동선과 겹치는 경우가 많습니다. 바닷가 행사라면 기상 상황과 혼잡 시간대를 확인하고, 공연이나 축제 종료 후 대중교통 막차 시간도 함께 살펴보세요.",
  대구: "대구 행사는 도심 문화공간, 전시장, 야외광장에서 열리는 경우가 많아 실내외 체감 온도와 이동 동선을 함께 고려하면 좋습니다. 여름철 야외 행사는 그늘, 휴식 공간, 물품 보관 가능 여부를 미리 확인해 보세요.",
  광주: "광주 행사는 예술, 공연, 지역 문화 프로그램과 함께 열리는 경우가 많습니다. 전시장과 문화시설이 가까운 일정은 주변 식당, 카페, 대중교통 동선까지 함께 계획하면 하루 코스로 둘러보기 좋습니다.",
  대전: "대전 행사는 기차역, 터미널, 도심 문화시설 접근성을 기준으로 이동 계획을 세우기 좋습니다. 과학, 문화, 가족 체험 행사가 함께 열리는 경우가 있어 프로그램 시간표와 현장 접수 가능 여부를 미리 확인하는 것이 좋습니다.",
  울산: "울산 행사는 도심권, 산업문화 공간, 해안권 일정이 함께 섞일 수 있습니다. 행사장 위치에 따라 대중교통 배차와 자가용 이동 시간이 달라지므로 출발 전 주소, 주차, 주변 도로 상황을 확인해 주세요.",
  세종: "세종 행사는 가족 단위 방문객이 이용하기 좋은 공원, 광장, 공공시설 주변에서 열리는 경우가 많습니다. 대중교통 배차 간격과 주차장 위치를 미리 확인하면 아이와 함께 이동할 때 부담을 줄일 수 있습니다.",
  강원: "강원 지역 행사는 자연 관광지와 함께 방문하는 일정이 많아 날씨와 도로 상황 확인이 중요합니다. 산간·해안 지역은 이동 시간이 길어질 수 있으므로 행사 시작 시간과 주변 숙박, 주차 여건을 함께 살펴보세요.",
  충북: "충북 행사는 청주, 충주, 제천 등 도시권과 자연 관광지가 함께 이어지는 일정이 많습니다. 당일치기 방문이라면 행사장까지의 이동 시간, 주변 주차장, 인근 식사 장소를 미리 확인하는 것이 좋습니다.",
  충남: "충남 행사는 해안 관광지와 내륙 도시 행사가 함께 있어 지역별 이동 방식이 달라집니다. 보령, 공주, 천안 등 행사장은 대중교통과 자가용 접근성이 다를 수 있으니 공식 안내의 교통 정보를 함께 확인해 주세요.",
  전북: "전북 행사는 한옥마을, 문화유산, 지역 먹거리와 함께 둘러보기 좋은 일정이 많습니다. 전주, 군산, 익산 등 도시별로 행사장 주변 동선이 달라 방문 전 주차와 대중교통 접근성을 살펴보는 것이 좋습니다.",
  전남: "전남 행사는 지역 간 이동 시간이 길어질 수 있어 행사장 주소와 주변 교통편을 먼저 확인하는 것이 좋습니다. 해안·섬·농어촌 지역 행사는 날씨와 운영 시간 변동 가능성도 함께 확인해 주세요.",
  경북: "경북 행사는 역사 관광지, 지역 축제, 문화 행사가 함께 열리는 경우가 많습니다. 경주, 안동, 포항 등 지역별 이동 거리가 달라 행사 시간과 주변 관람 시간을 함께 고려하면 일정이 더 안정적입니다.",
  경남: "경남 행사는 창원, 진주, 통영 등 도심과 해안 관광지가 함께 연결되는 경우가 많습니다. 행사장 주변 주차 여건과 대중교통 이용 가능 여부를 확인하고, 야외 행사는 우천 시 운영 공지를 함께 살펴보세요.",
  제주: "제주 행사는 날씨와 렌터카 이동 여건의 영향을 많이 받습니다. 행사장까지의 이동 시간, 주차 공간, 우천 시 운영 여부를 확인하고, 관광지 동선과 함께 계획하면 시간을 더 효율적으로 쓸 수 있습니다."
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const region = slugToRegion(slug);
  return {
    title: `${region} 행사`,
    description: `${region}에서 열리는 축제, 박람회, 전시회, 공연 정보를 확인하세요.`,
    alternates: { canonical: `/region/${slug}` },
    robots: { index: true, follow: true },
    openGraph: { title: `${region} 행사 | ${SITE_NAME}`, description: `${region} 지역 행사 정보` }
  };
}

export default async function RegionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const region = slugToRegion(slug);
  const events = await getRuntimeEvents();
  return (
    <>
      <ListPage title={`${region} 행사 모음`} description={`${region}의 다양한 행사를 한눈에 확인해보세요.`} baseEvents={events} fixedQuery={{ region }} />
      <section className="container-shell pb-8">
        <article className="rounded-xl border border-bara-line bg-white p-5 text-sm leading-7 text-slate-700 shadow-sm">
          <h2 className="text-lg font-black text-bara-text">{region} 행사 방문 가이드</h2>
          <p className="mt-3">{regionGuides[region]}</p>
          <p className="mt-3">
            축제바라는 {region} 지역 행사를 주소 기준으로 분류하고, 일정·장소·문의처·공식 출처가 확인되는 정보를 우선 정리합니다.
            행사 운영 내용은 주최 측 사정에 따라 변경될 수 있으므로 방문 전 공식 안내와 문의처를 함께 확인하는 것을 권장합니다.
          </p>
        </article>
      </section>
    </>
  );
}
