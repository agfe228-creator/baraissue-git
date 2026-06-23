export const metadata = { title: "소개", description: "축제바라 서비스 소개", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return (
    <main className="container-shell py-10">
      <article className="soft-card rounded-xl p-6 leading-8">
        <h1 className="text-3xl font-black">축제바라 소개</h1>
        <p className="mt-5">
          축제바라는 전국의 축제, 박람회, 전시회, 공연 정보를 한 곳에서 확인할 수 있도록 만든 행사 정보 포털입니다.
          지역과 월, 카테고리별로 행사를 찾고 관심 행사를 저장해 나들이 계획을 쉽게 세울 수 있도록 돕습니다.
        </p>
        <p className="mt-4">
          행사 정보는 주최기관 공지와 공개 자료를 바탕으로 정리되며, 실제 방문 전에는 공식 홈페이지와 문의처를 통해 변경 사항을 확인하는 것을 권장합니다.
        </p>
        <h2 className="mt-6 text-xl font-black">운영 방향</h2>
        <p className="mt-3">
          축제바라는 단순한 링크 모음이 아니라 지역, 기간, 참가비, 장소, 상태 정보를 한 화면에서 비교할 수 있도록 정리합니다.
          검색 이용자가 원하는 행사를 빠르게 찾고, 방문 전 확인해야 할 핵심 정보를 놓치지 않도록 꾸준히 개선합니다.
        </p>
        <h2 className="mt-6 text-xl font-black">정보 출처와 업데이트</h2>
        <p className="mt-3">
          일부 행사는 한국관광공사 TourAPI 및 공개 행사 정보를 참고하며, 박람회·전시회·공연 정보는 자체 편집 데이터와 추후 추가 API 연동을 통해 보강합니다.
          잘못된 정보나 수정이 필요한 내용은 문의 페이지를 통해 알려주시면 확인 후 반영합니다.
        </p>
      </article>
    </main>
  );
}
