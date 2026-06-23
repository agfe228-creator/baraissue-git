import { ListPage } from "@/components/ListPage";
import { SearchBox } from "@/components/SearchBox";
import { getRuntimeEvents } from "@/lib/runtimeEvents";

export const runtime = "edge";

export const metadata = {
  title: "검색 결과",
  description: "축제바라 행사 검색 결과입니다.",
  robots: {
    index: false,
    follow: true
  }
};

// 검색 결과는 사용자 입력 q 조합이 무한히 만들어질 수 있어 noindex로 둡니다.
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q: rawQ } = await searchParams;
  const q = rawQ ?? "";
  const events = await getRuntimeEvents();
  return (
    <>
      <section className="container-shell pt-8">
        <SearchBox compact defaultValue={q} />
      </section>
      <ListPage title={q ? `"${q}" 검색 결과` : "서울 행사 모음"} description="행사명, 지역, 장소를 기준으로 검색한 결과입니다." baseEvents={events} fixedQuery={q ? { q } : {}} />
    </>
  );
}
