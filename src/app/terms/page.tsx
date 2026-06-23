export const metadata = { title: "이용약관", description: "축제바라 이용약관", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <main className="container-shell py-10">
      <article className="soft-card rounded-xl p-6 leading-8">
        <h1 className="text-3xl font-black">이용약관</h1>
        <p className="mt-5">축제바라는 전국 행사 정보를 쉽게 확인할 수 있도록 공개 정보를 정리해 제공하는 서비스입니다.</p>
        <h2 className="mt-6 text-xl font-black">정보 제공 목적</h2>
        <p>사이트의 콘텐츠는 방문 계획을 돕기 위한 참고 정보이며, 예매나 참가 신청을 직접 대행하지 않습니다.</p>
        <h2 className="mt-6 text-xl font-black">정보 변경 가능성</h2>
        <p>행사 일정, 장소, 참가비, 운영 내용은 주최기관 사정에 따라 변경될 수 있습니다.</p>
        <h2 className="mt-6 text-xl font-black">외부 링크</h2>
        <p>사이트에는 공식 홈페이지 또는 공공기관 안내 페이지 등 외부 링크가 포함될 수 있습니다. 외부 사이트의 운영과 콘텐츠에 대해서는 해당 운영 주체의 정책이 적용됩니다.</p>
        <h2 className="mt-6 text-xl font-black">이용자 협조</h2>
        <p>이용자는 잘못된 정보, 폐쇄된 링크, 부적절한 콘텐츠를 발견하면 문의 페이지를 통해 수정을 요청할 수 있습니다.</p>
        <h2 className="mt-6 text-xl font-black">책임 제한</h2>
        <p>이용자는 최종 방문 전 공식 홈페이지 또는 문의처를 통해 최신 정보를 확인해야 하며, 외부 정보 변경으로 인한 손해에 대해 사이트는 책임을 지지 않습니다.</p>
      </article>
    </main>
  );
}
