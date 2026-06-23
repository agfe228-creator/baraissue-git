import { EventItem, getStatusFromDates } from "../lib/events";
import { regionToSlug } from "../lib/constants";

type TourApiItem = {
  contentid?: string;
  contenttypeid?: string;
  title?: string;
  addr1?: string;
  addr2?: string;
  eventstartdate?: string;
  eventenddate?: string;
  tel?: string;
  homepage?: string;
  eventhomepage?: string;
  firstimage?: string;
  firstimage2?: string;
  sponsor1?: string;
  sponsor2?: string;
  sponsor1tel?: string;
  overview?: string;
};

const endpoint = "https://apis.data.go.kr/B551011/KorService2/searchFestival2";
const detailEndpoint = "https://apis.data.go.kr/B551011/KorService2/detailCommon2";
const detailIntroEndpoint = "https://apis.data.go.kr/B551011/KorService2/detailIntro2";

const regionNames = [
  "서울",
  "경기",
  "인천",
  "부산",
  "대구",
  "광주",
  "대전",
  "울산",
  "세종",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주"
];

const categoryGuide: Record<EventItem["category"], string> = {
  축제: "계절 프로그램, 현장 체험, 먹거리와 공연을 함께 확인하면 방문 동선을 세우기 쉽습니다. 야외 행사는 날씨와 혼잡도에 따라 운영 방식이 달라질 수 있어 당일 공지를 함께 확인하는 편이 좋습니다.",
  박람회: "사전 등록 여부, 입장 마감 시간, 참가 기업과 부스 위치를 미리 살피면 관람 시간을 효율적으로 쓸 수 있습니다. 상담이나 체험이 필요한 경우 관심 구역을 먼저 정해 두는 것이 좋습니다.",
  전시회: "관람 소요 시간, 사진 촬영 가능 구역, 도슨트 운영 여부를 함께 확인하면 더 편하게 둘러볼 수 있습니다. 인기 전시는 주말 대기가 길어질 수 있어 예매 가능 여부도 살펴보세요.",
  공연: "공연 시작 시간, 입장 규정, 티켓 수령 방식, 좌석 위치를 미리 확인하면 관람 불편을 줄일 수 있습니다. 공연장 주변 교통과 주차 할인 여부도 함께 확인하는 것이 좋습니다."
};

export async function fetchTourApiEvents(category: EventItem["category"]): Promise<EventItem[]> {
  const serviceKey = await getTourApiServiceKey();
  if (!serviceKey) return [];

  const items = await fetchTourApiList(serviceKey);

  const detailedItems = await Promise.all(items.slice(0, 80).map((item) => fetchTourApiDetail(item)));

  return detailedItems.map((item, index) => {
    const title = item.title?.trim() || `${category} 행사 ${index + 1}`;
    const region = detectRegion(item.addr1 || "");
    const startDate = normalizeDate(item.eventstartdate) || "2026-01-01";
    const endDate = normalizeDate(item.eventenddate) || startDate;
    const slug = `tourapi-${item.contentid || index}-${slugify(title)}`;
    const venue = [item.addr1, item.addr2].filter(Boolean).join(" ") || `${region} 행사장`;

    return {
      id: 10000 + index,
      slug,
      title,
      category,
      region,
      city: detectCity(item.addr1 || ""),
      venue,
      startDate,
      endDate,
      organizer: stripHtml(item.sponsor1) || stripHtml(item.sponsor2) || "공식 안내 확인",
      website: cleanHomepage(item.eventhomepage) || cleanHomepage(item.homepage),
      image: item.firstimage || item.firstimage2 || "",
      description: buildDescription({
        title,
        category,
        region,
        venue,
        overview: item.overview
      }),
      admissionFee: "공식 안내 확인",
      parkingInfo: "주차 정보는 공식 안내 또는 행사장 문의처를 확인해 주세요.",
      transportInfo: "대중교통 및 행사장 교통 안내는 공식 안내를 확인해 주세요.",
      faq: "일정과 운영 내용은 주최 측 사정에 따라 변경될 수 있습니다.",
      contact: stripHtml(item.sponsor1tel) || item.tel || "공식 안내 확인",
      status: getStatusFromDates(startDate, endDate),
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10)
    };
  });
}

export async function hasTourApiServiceKey() {
  return Boolean(await getTourApiServiceKey());
}

export async function fetchTourApiDebug() {
  const serviceKey = await getTourApiServiceKey();
  if (!serviceKey) return { hasKey: false, itemCount: 0, message: "TourAPI key is missing." };

  try {
    const items = await fetchTourApiList(serviceKey);
    return {
      hasKey: true,
      itemCount: items.length,
      sampleTitles: items.slice(0, 5).map((item) => item.title || item.contentid || "제목 없음")
    };
  } catch (error) {
    return {
      hasKey: true,
      itemCount: 0,
      message: error instanceof Error ? error.message : "TourAPI request failed."
    };
  }
}

async function fetchTourApiList(serviceKey: string): Promise<TourApiItem[]> {
  const startDates = getStartDateCandidates();

  for (const startDate of startDates) {
    const url = new URL(endpoint);
    url.searchParams.set("serviceKey", serviceKey);
    url.searchParams.set("MobileOS", "ETC");
    url.searchParams.set("MobileApp", "BaraIssue");
    url.searchParams.set("_type", "json");
    url.searchParams.set("eventStartDate", startDate);
    url.searchParams.set("numOfRows", "200");
    url.searchParams.set("pageNo", "1");
    url.searchParams.set("arrange", "O");

    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`TourAPI request failed: ${response.status}`);
    }

    const payload = await response.json();
    const rawItems = payload?.response?.body?.items?.item;
    const items: TourApiItem[] = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : [];
    if (items.length) return items;
  }

  return [];
}

async function fetchTourApiDetail(item: TourApiItem): Promise<TourApiItem> {
  const serviceKey = await getTourApiServiceKey();
  if (!serviceKey || !item.contentid) return item;

  const url = new URL(detailEndpoint);
  url.searchParams.set("serviceKey", serviceKey);
  url.searchParams.set("MobileOS", "ETC");
  url.searchParams.set("MobileApp", "BaraIssue");
  url.searchParams.set("_type", "json");
  url.searchParams.set("contentId", item.contentid);
  url.searchParams.set("defaultYN", "Y");
  url.searchParams.set("overviewYN", "Y");

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) return item;
    const payload = await response.json();
    const detail = payload?.response?.body?.items?.item;
    const firstDetail = Array.isArray(detail) ? detail[0] : detail;
    const intro = await fetchTourApiIntro(item);
    return { ...item, ...firstDetail, ...intro };
  } catch {
    return item;
  }
}

async function fetchTourApiIntro(item: TourApiItem): Promise<TourApiItem> {
  const serviceKey = await getTourApiServiceKey();
  if (!serviceKey || !item.contentid) return {};

  const url = new URL(detailIntroEndpoint);
  url.searchParams.set("serviceKey", serviceKey);
  url.searchParams.set("MobileOS", "ETC");
  url.searchParams.set("MobileApp", "BaraIssue");
  url.searchParams.set("_type", "json");
  url.searchParams.set("contentId", item.contentid);
  url.searchParams.set("contentTypeId", item.contenttypeid || "15");

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) return {};
    const payload = await response.json();
    const detail = payload?.response?.body?.items?.item;
    return Array.isArray(detail) ? detail[0] || {} : detail || {};
  } catch {
    return {};
  }
}

async function getTourApiServiceKey() {
  return getTourApiServiceKeyFromProcess();
}

function getTourApiServiceKeyFromProcess() {
  return getTourApiServiceKeyFromEnv(process.env as Record<string, string | undefined>);
}

function getTourApiServiceKeyFromEnv(env: Record<string, string | undefined>) {
  return (
    env.TOUR_API_SERVICE_KEY ||
    env.TOURAPI_SERVICE_KEY ||
    env.TOUR_API_KEY ||
    env.PUBLIC_DATA_SERVICE_KEY ||
    env.NEXT_PUBLIC_TOUR_API_SERVICE_KEY ||
    ""
  ).trim();
}

function getStartDateCandidates() {
  const today = new Date();
  const currentYear = today.getUTCFullYear();
  return [
    today.toISOString().slice(0, 10).replaceAll("-", ""),
    `${currentYear}0101`,
    `${currentYear - 1}0101`,
    `${currentYear - 2}0101`,
    "20240101"
  ];
}

function normalizeDate(value?: string) {
  if (!value || value.length !== 8) return "";
  return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
}

function detectRegion(address: string) {
  return regionNames.find((region) => address.includes(region)) || "서울";
}

function detectCity(address: string) {
  return address.split(" ")[1] || regionToSlug(detectRegion(address));
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");
}

function stripHtml(value?: string) {
  return value?.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() || "";
}

function cleanHomepage(value?: string) {
  if (!value) return "";
  const hrefMatch = value.match(/href=["'](https?:\/\/[^"']+)["']/i);
  if (hrefMatch?.[1]) return hrefMatch[1];
  const text = stripHtml(value);
  const match = text.match(/https?:\/\/[^\s"]+/);
  return match?.[0] || "";
}

function buildDescription({
  title,
  category,
  region,
  venue,
  overview
}: {
  title: string;
  category: EventItem["category"];
  region: string;
  venue: string;
  overview?: string;
}) {
  const cleanOverview = stripHtml(overview);
  if (cleanOverview.length > 80) return cleanOverview;

  return `${title}은 ${venue}에서 확인할 수 있는 ${region} 지역 ${category} 일정입니다. ${categoryGuide[category]} 축제바라는 공개 행사 정보를 바탕으로 기간, 장소, 문의처, 방문 전 확인 사항을 정리해 제공합니다.`;
}
