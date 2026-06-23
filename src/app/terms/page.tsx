export const metadata = { title: "이용약관", description: "축제바라 이용약관", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <main className="container-shell py-10">
      <article className="soft-card rounded-xl p-6 leading-8">
        <h1 className="text-3xl font-black">이용약관</h1>
        <p className="mt-5">
          축제바라는 전국 행사 정보를 쉽게 확인할 수 있도록 공개 정보를 정리해 제공하는 서비스입니다. 본 약관은 축제바라를 이용하는 과정에서
          정보 제공 범위, 외부 링크, 이용자 협조 사항, 책임 범위를 안내하기 위해 마련되었습니다.
        </p>
        <h2 className="mt-6 text-xl font-black">정보 제공 목적</h2>
        <p>
          사이트의 콘텐츠는 방문 계획을 돕기 위한 참고 정보이며, 예매나 참가 신청을 직접 대행하지 않습니다. 행사명, 기간, 장소, 참가비,
          교통과 주차 안내는 이용자가 일정을 비교하고 방문 여부를 판단할 수 있도록 정리한 정보입니다.
        </p>
        <h2 className="mt-6 text-xl font-black">정보 변경 가능성</h2>
        <p>
          행사 일정, 장소, 참가비, 운영 내용은 주최기관 사정, 기상 상황, 현장 안전 관리, 예약 상황에 따라 변경될 수 있습니다.
          이용자는 최종 방문 전 공식 홈페이지, 주최기관 공지, 문의처를 통해 최신 정보를 확인해야 합니다.
        </p>
        <h2 className="mt-6 text-xl font-black">외부 링크</h2>
        <p>
          사이트에는 공식 홈페이지, 공공기관 안내 페이지, 공공데이터 출처 등 외부 링크가 포함될 수 있습니다. 외부 사이트의 운영과 콘텐츠,
          개인정보 처리, 결제와 예매 절차에 대해서는 해당 운영 주체의 정책이 적용됩니다.
        </p>
        <h2 className="mt-6 text-xl font-black">콘텐츠 이용</h2>
        <p>
          축제바라가 정리한 문장, 구성, 편집 정보는 사이트 이용자의 탐색 편의를 위해 제공됩니다. 무단 복제, 대량 수집, 자동화된 스크래핑,
          서비스 운영을 방해하는 행위는 제한될 수 있습니다.
        </p>
        <h2 className="mt-6 text-xl font-black">이용자 협조</h2>
        <p>
          이용자는 잘못된 정보, 폐쇄된 링크, 부적절한 콘텐츠를 발견하면 문의 페이지를 통해 수정을 요청할 수 있습니다. 행사 제보나 수정 요청을 보낼 때는
          행사명, 지역, 개최 기간, 공식 안내 링크를 함께 제공하면 더 정확하게 검토할 수 있습니다.
        </p>
        <h2 className="mt-6 text-xl font-black">책임 제한</h2>
        <p>
          축제바라는 공개 정보와 편집 기준을 바탕으로 정보를 정리하지만 모든 행사 정보를 실시간으로 보장하지는 않습니다. 이용자는 최종 방문 전 공식 안내를 확인해야 하며,
          외부 정보 변경, 행사 취소, 현장 운영 변경으로 인한 손해에 대해 사이트는 법령이 정한 범위 내에서 책임을 제한합니다.
        </p>
      </article>
    </main>
  );
}