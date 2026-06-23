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

export async function fetchTourApiEvents(category: EventItem["category"]): Promise<EventItem[]> {
  const serviceKey = process.env.TOUR_API_SERVICE_KEY;
  if (!serviceKey) return [];

  const url = new URL(endpoint);
  url.searchParams.set("serviceKey", serviceKey);
  url.searchParams.set("MobileOS", "ETC");
  url.searchParams.set("MobileApp", "BaraIssue");
  url.searchParams.set("_type", "json");
  url.searchParams.set("eventStartDate", "20260101");
  url.searchParams.set("numOfRows", "100");
  url.searchParams.set("pageNo", "1");
  url.searchParams.set("arrange", "A");

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`TourAPI request failed: ${response.status}`);
  }

  const payload = await response.json();
  const rawItems = payload?.response?.body?.items?.item;
  const items: TourApiItem[] = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : [];

  const detailedItems = await Promise.all(items.map((item) => fetchTourApiDetail(item)));

  return detailedItems.map((item, index) => {
    const title = item.title?.trim() || `${category} 행사 ${index + 1}`;
    const region = detectRegion(item.addr1 || "");
    const startDate = normalizeDate(item.eventstartdate) || "2026-01-01";
    const endDate = normalizeDate(item.eventenddate) || startDate;
    const slug = `tourapi-${item.contentid || index}-${slugify(title)}`;

    return {
      id: 10000 + index,
      slug,
      title,
      category,
      region,
      city: detectCity(item.addr1 || ""),
      venue: [item.addr1, item.addr2].filter(Boolean).join(" ") || `${region} 행사장`,
      startDate,
      endDate,
      organizer: stripHtml(item.sponsor1) || stripHtml(item.sponsor2) || "",
      website: cleanHomepage(item.eventhomepage) || cleanHomepage(item.homepage),
      description: stripHtml(item.overview) || `${title} 행사 정보입니다. 방문 전 공식 안내를 확인해 주세요.`,
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

async function fetchTourApiDetail(item: TourApiItem): Promise<TourApiItem> {
  const serviceKey = process.env.TOUR_API_SERVICE_KEY;
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
    const response = await fetch(url);
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
  const serviceKey = process.env.TOUR_API_SERVICE_KEY;
  if (!serviceKey || !item.contentid) return {};

  const url = new URL(detailIntroEndpoint);
  url.searchParams.set("serviceKey", serviceKey);
  url.searchParams.set("MobileOS", "ETC");
  url.searchParams.set("MobileApp", "BaraIssue");
  url.searchParams.set("_type", "json");
  url.searchParams.set("contentId", item.contentid);
  url.searchParams.set("contentTypeId", item.contenttypeid || "15");

  try {
    const response = await fetch(url);
    if (!response.ok) return {};
    const payload = await response.json();
    const detail = payload?.response?.body?.items?.item;
    return Array.isArray(detail) ? detail[0] || {} : detail || {};
  } catch {
    return {};
  }
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
