import Link from "next/link";

export const metadata = { title: "행사 안내 글", description: "축제바라 행사 안내 글 모음", alternates: { canonical: "/posts" } };

export default function PostsPage() {
  return (
    <main className="container-shell py-10">
      <article className="soft-card rounded-xl p-6 leading-8">
        <h1 className="text-3xl font-black">행사 안내 글</h1>
        <p className="mt-5">
          축제바라는 전국 축제와 지역 행사 정보를 중심으로 운영되는 행사 정보 포털입니다. 현재는 행사 상세 페이지, 지역별 목록,
          월별 목록을 우선 제공하며, 별도 블로그 글은 공식 출처와 내용 검수가 끝난 주제부터 순서대로 공개할 예정입니다.
        </p>
        <p className="mt-4">
          행사 안내 글은 단순 홍보 문구보다 실제 방문에 필요한 정보를 다루는 방향으로 작성합니다. 예를 들어 가족 방문 시 확인할 점,
          대중교통과 주차 동선, 우천 시 운영 여부, 사전 예약 필요 여부, 주변 편의시설, 행사장 혼잡 시간대 같은 내용을 중심으로 정리합니다.
        </p>
        <p className="mt-4">
          축제바라는 한국관광공사 TourAPI, 공공데이터포털, 주최기관과 지자체의 공개 안내를 기준으로 정보를 확인합니다. 출처가 불명확하거나
          행사명과 장소, 날짜가 서로 맞지 않는 정보는 공개하지 않으며, 이미 공개된 내용도 공식 안내와 다르면 수정합니다.
        </p>
        <p className="mt-4">
          현재 전국 행사 일정은 축제 페이지와 지역별 페이지에서 확인할 수 있습니다. 행사 제보나 수정 요청은 문의 페이지를 통해 행사명,
          지역, 공식 안내 링크를 함께 보내주시면 검토 후 반영합니다.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 font-bold text-bara-blue">
          <Link href="/festival">전국 축제 보기</Link>
          <Link href="/region/seoul">지역별 행사 보기</Link>
          <Link href="/source-policy">출처 및 운영정책</Link>
          <Link href="/contact">행사 제보하기</Link>
        </div>
      </article>
    </main>
  );
}
