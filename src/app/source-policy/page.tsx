export const metadata = { title: "출처 및 운영정책", description: "축제바라 행사 정보 출처와 검수 기준", alternates: { canonical: "/source-policy" } };

export default function SourcePolicyPage() {
  return (
    <main className="container-shell py-10">
      <article className="soft-card rounded-xl p-6 leading-8">
        <h1 className="text-3xl font-black">출처 및 운영정책</h1>
        <p className="mt-5">
          축제바라는 전국 축제, 박람회, 전시회, 공연 정보를 이용자가 쉽게 비교할 수 있도록 정리하는 행사 정보 포털입니다.
          행사 정보는 공개 자료와 공식 안내를 기준으로 확인하며, 출처가 불명확하거나 주소와 일정이 맞지 않는 정보는 공개 전 보류합니다.
        </p>
        <h2 className="mt-6 text-xl font-black">주요 정보 출처</h2>
        <p className="mt-3">
          사이트는 한국관광공사 TourAPI, 공공데이터포털, 지방자치단체 행사 안내, 주최기관 공지, 행사 공식 홈페이지 등 공개적으로 확인 가능한 자료를 우선 활용합니다.
          상세 페이지에는 가능한 경우 행사 이미지, 기간, 장소, 문의처, 주최 정보, 공식 링크를 함께 표시합니다.
        </p>
        <ul className="mt-3 list-disc pl-5 text-sm leading-7 text-slate-700">
          <li><a className="font-bold text-bara-blue" href="https://www.data.go.kr/data/15101578/openapi.do" target="_blank" rel="noreferrer">한국관광공사 TourAPI</a></li>
          <li><a className="font-bold text-bara-blue" href="https://www.data.go.kr/" target="_blank" rel="noreferrer">공공데이터포털</a></li>
        </ul>
        <h2 className="mt-6 text-xl font-black">지역과 날짜 분류 기준</h2>
        <p className="mt-3">
          지역은 행사 주소를 기준으로 분류합니다. 예를 들어 주소가 전라남도이면 전남, 경상북도이면 경북, 충청남도이면 충남으로 정리합니다.
          날짜는 공개 데이터의 시작일과 종료일을 기준으로 표시하며, 행사 상태는 현재 날짜와 비교해 예정, 진행중, 종료로 구분합니다.
        </p>
        <h2 className="mt-6 text-xl font-black">검수와 수정 기준</h2>
        <p className="mt-3">
          행사명, 장소, 기간, 문의처가 서로 맞지 않거나 공식 출처가 약한 정보는 목록 노출을 제한할 수 있습니다. 이미 공개된 정보라도 주최기관 공지와 다르거나
          행사 취소, 장소 변경, 일정 변경이 확인되면 수정합니다. 잘못된 정보는 문의 페이지를 통해 행사명과 공식 안내 링크를 보내주시면 확인 후 반영합니다.
        </p>
        <h2 className="mt-6 text-xl font-black">이용자 안내</h2>
        <p className="mt-3">
          행사는 날씨, 안전 관리, 현장 상황, 주최 측 사정에 따라 운영 내용이 달라질 수 있습니다. 축제바라는 공개 정보를 보기 쉽게 정리하지만,
          예매, 환불, 운영 시간, 현장 접수 가능 여부는 최종 방문 전 공식 홈페이지나 문의처를 통해 다시 확인하는 것을 권장합니다.
        </p>
      </article>
    </main>
  );
}
