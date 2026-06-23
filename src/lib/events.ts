import { categoryByLabel, categories, regions } from "./constants";

export type EventItem = {
  id: number;
  slug: string;
  title: string;
  category: "축제" | "박람회" | "전시회" | "공연";
  region: string;
  city: string;
  venue: string;
  startDate: string;
  endDate: string;
  organizer: string;
  website: string;
  image?: string;
  description: string;
  admissionFee: string;
  parkingInfo: string;
  transportInfo: string;
  faq: string;
  contact: string;
  status: "진행중" | "예정" | "종료";
  createdAt: string;
  updatedAt: string;
};

const cityByRegion: Record<string, string[]> = {
  서울: ["중구", "마포구", "송파구", "영등포구"],
  경기: ["수원", "고양", "성남", "가평"],
  인천: ["중구", "연수구", "강화"],
  부산: ["해운대", "수영", "기장"],
  대구: ["중구", "수성구", "달서구"],
  광주: ["동구", "서구", "광산구"],
  대전: ["유성구", "서구", "중구"],
  울산: ["남구", "중구", "울주"],
  세종: ["한솔동", "도담동", "조치원"],
  강원: ["강릉", "춘천", "속초"],
  충북: ["청주", "충주", "제천"],
  충남: ["천안", "공주", "보령"],
  전북: ["전주", "군산", "익산"],
  전남: ["여수", "목포", "순천"],
  경북: ["경주", "포항", "안동"],
  경남: ["창원", "진주", "통영"],
  제주: ["제주시", "서귀포", "애월"]
};

const titleSeeds: Record<EventItem["category"], string[]> = {
  축제: ["한강 여름축제", "빛의 거리 축제", "바다 음악축제", "로컬 푸드 페스타", "가족 나들이 축제"],
  박람회: ["스마트테크 코리아", "교육 진로 박람회", "여행 라이프 페어", "창업 비즈니스 엑스포", "친환경 산업전"],
  전시회: ["모네 빛을 그리다", "서울 재즈 페스티벌 전시", "미디어 아트 특별전", "공예 디자인 위크", "사진의 계절전"],
  공연: ["뮤지컬 맘마미아", "연극 쉬어매드니스", "클래식 오픈 콘서트", "국악 토요마당", "인디 뮤직 나이트"]
};

const venues = ["컨벤션센터", "시민회관", "문화예술회관", "야외광장", "아트홀", "전시장", "한강공원"];

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function dateFor(index: number, offset: number) {
  const month = (index % 12) + 1;
  const day = ((index * 3 + offset) % 24) + 1;
  return `2026-${pad(month)}-${pad(day)}`;
}

function endDateFor(startDate: string, index: number) {
  const date = new Date(`${startDate}T00:00:00`);
  date.setDate(date.getDate() + 3 + (index % 8));
  return date.toISOString().slice(0, 10);
}

function makeSlug(categoryKey: string, index: number, title: string) {
  return `${categoryKey}-${index + 1}-${title.replace(/\s+/g, "-").toLowerCase()}`;
}

const categorySeedCounts: Record<string, number> = {
  festival: 48,
  fair: 28,
  exhibition: 32,
  performance: 28
};

const titleSuffixes = [
  "봄 시즌",
  "여름 특별전",
  "가을 기획",
  "겨울 마켓",
  "주말 나들이",
  "가족 체험",
  "로컬 브랜드",
  "문화 산책"
];

export const events: EventItem[] = categories.flatMap((category, categoryIndex) => {
  const label = category.label as EventItem["category"];
  const count = categorySeedCounts[category.key] ?? 100;
  return Array.from({ length: count }, (_, index) => {
    const id = categoryIndex * 1000 + index + 1;
    const region = regions[(index + categoryIndex * 3) % regions.length];
    const city = cityByRegion[region][index % cityByRegion[region].length];
    const baseTitle = titleSeeds[label][index % titleSeeds[label].length];
    const suffix = titleSuffixes[Math.floor(index / titleSeeds[label].length) % titleSuffixes.length];
    const title = index < 5 ? baseTitle : `${region} ${baseTitle} ${suffix}`;
    const startDate = dateFor(index + categoryIndex, 10);
    const endDate = endDateFor(startDate, index);
    const free = index % 4 === 0;

    const slug = makeSlug(category.key, index, title);

    return {
      id,
      slug,
      title,
      category: label,
      region,
      city,
      venue: `${region}${city} ${venues[index % venues.length]}`,
      startDate,
      endDate,
      organizer: `${region}문화재단`,
      website: "",
      description: `${title}은 ${region}에서 열리는 ${label} 행사입니다. 방문객은 행사 기간, 장소, 참가비, 교통 편의성을 함께 확인해 일정에 맞는 나들이 계획을 세울 수 있습니다. 축제바라는 지역 공개 정보와 편집 기준을 바탕으로 핵심 정보를 보기 쉽게 정리합니다.`,
      admissionFee: free ? "무료" : `${(index % 9 + 1) * 5000}원~`,
      parkingInfo: "행사장 주변 공영주차장 이용을 권장하며, 주말에는 대중교통 이용이 편리합니다.",
      transportInfo: "가까운 지하철역 또는 버스터미널에서 행사장 셔틀 및 도보 이동이 가능합니다.",
      faq: "운영 시간과 세부 프로그램은 주최 측 사정에 따라 변경될 수 있으니 방문 전 공식 안내를 확인해 주세요.",
      contact: `02-${pad((index % 89) + 10)}34-${pad((index % 90) + 10)}78`,
      status: getStatusFromDates(startDate, endDate),
      createdAt: `2026-${pad(((index + 1) % 12) + 1)}-01`,
      updatedAt: `2026-${pad(((index + 2) % 12) + 1)}-10`
    };
  });
});

export const featuredEvents = events.slice(0, 8);
export const latestEvents = [...events].sort((a, b) => b.id - a.id).slice(0, 8);

export function getEvent(slug: string) {
  let normalizedSlug = slug;
  try {
    normalizedSlug = decodeURIComponent(slug);
  } catch {
    normalizedSlug = slug;
  }

  return events.find((event) => event.slug === normalizedSlug);
}

export function getStatusFromDates(startDate: string, endDate: string): EventItem["status"] {
  const today = new Date().toISOString().slice(0, 10);
  if (today < startDate) return "예정";
  if (today > endDate) return "종료";
  return "진행중";
}

export function isVerifiedEvent(event: EventItem) {
  return event.slug.startsWith("tourapi-");
}

export function hasOfficialInfo(event: EventItem) {
  return Boolean(event.website || event.image || isVerifiedEvent(event));
}

export function sortForPublicDisplay(source: EventItem[]) {
  return [...source].sort((a, b) => {
    const verifiedGap = Number(isVerifiedEvent(b)) - Number(isVerifiedEvent(a));
    if (verifiedGap) return verifiedGap;

    const activeGap = statusWeight(b.status) - statusWeight(a.status);
    if (activeGap) return activeGap;

    return a.startDate.localeCompare(b.startDate);
  });
}

function statusWeight(status: EventItem["status"]) {
  if (status === "진행중") return 3;
  if (status === "예정") return 2;
  return 1;
}

export function getRelatedEvents(event: EventItem) {
  return events
    .filter((item) => item.slug !== event.slug && (item.category === event.category || item.region === event.region))
    .slice(0, 4);
}

export function formatDateRange(event: EventItem) {
  return `${event.startDate.replaceAll("-", ".")} ~ ${event.endDate.replaceAll("-", ".")}`;
}

export function categoryColor(label: string) {
  return categoryByLabel(label).color;
}
