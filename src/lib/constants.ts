import {
  CalendarDays,
  Heart,
  Images,
  MapPin,
  Megaphone,
  Mic2,
  Search,
  Tent,
  Ticket,
  Warehouse
} from "lucide-react";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://baraissue.com";
export const SITE_NAME = "축제바라";

export const categories = [
  { key: "festival", label: "축제", color: "#F97316", href: "/festival", icon: Tent },
  { key: "fair", label: "박람회", color: "#16A34A", href: "/fair", icon: Warehouse },
  { key: "exhibition", label: "전시회", color: "#8B5CF6", href: "/exhibition", icon: Images },
  { key: "performance", label: "공연", color: "#EC4899", href: "/performance", icon: Mic2 }
] as const;

export const statuses = [
  { label: "진행중", color: "#22C55E" },
  { label: "예정", color: "#3B82F6" },
  { label: "종료", color: "#94A3B8" }
] as const;

export const regions = [
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

export const months = Array.from({ length: 12 }, (_, index) => `${index + 1}월`);

export const navItems = [
  { label: "축제", href: "/festival" },
  { label: "지역별", href: "/region/seoul" },
  { label: "월별", href: "/month/6" },
  { label: "출처정책", href: "/source-policy" }
];

export const mobileTabs = [
  { label: "홈", href: "/", icon: CalendarDays },
  { label: "검색", href: "/search", icon: Search },
  { label: "찜", href: "/favorites", icon: Heart },
  { label: "메뉴", href: "#menu", icon: Megaphone }
];

export const regionSlugMap = Object.fromEntries(
  regions.map((region) => [region, regionToSlug(region)])
);

export function regionToSlug(region: string) {
  const map: Record<string, string> = {
    서울: "seoul",
    경기: "gyeonggi",
    인천: "incheon",
    부산: "busan",
    대구: "daegu",
    광주: "gwangju",
    대전: "daejeon",
    울산: "ulsan",
    세종: "sejong",
    강원: "gangwon",
    충북: "chungbuk",
    충남: "chungnam",
    전북: "jeonbuk",
    전남: "jeonnam",
    경북: "gyeongbuk",
    경남: "gyeongnam",
    제주: "jeju"
  };
  return map[region] ?? region;
}

export function slugToRegion(slug: string) {
  return regions.find((region) => regionToSlug(region) === slug) ?? "서울";
}

export function categoryByLabel(label: string) {
  return categories.find((category) => category.label === label) ?? categories[0];
}

export function categoryByKey(key: string) {
  return categories.find((category) => category.key === key) ?? categories[0];
}

export const quickKeywords = ["서울 축제", "인천 축제", "무료 행사", "가족 나들이", "2026 축제"];

export const statIcons = [CalendarDays, MapPin, Ticket];