export const metadata = {
  title: "전시회",
  description: "전국 전시회 정보 검수 안내",
  alternates: { canonical: "/exhibition" },
  robots: { index: false, follow: true },
  openGraph: { title: "전국 전시회 안내", description: "공식 출처가 확인된 전시회 정보를 순서대로 정리합니다." }
};

export default function ExhibitionPage() {
  return (
    <main className="container-shell py-8">
      <section className="soft-card rounded-xl p-5 md:p-7">
        <p className="mb-3 text-sm text-slate-500">홈 〉 전시회</p>
        <h1 className="text-3xl font-black text-bara-text">전국 전시회 안내</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700">
          전시회 정보는 미술관, 박물관, 전시장, 주최기관의 공식 안내를 기준으로 확인합니다. 전시명과 장소가 비슷한 자료가 많기 때문에
          축제바라는 공식 링크, 개최 기간, 관람 요금, 사진 촬영 안내가 확인되는 전시부터 공개합니다.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            ["관람 기준", "전시 기간, 휴관일, 회차 운영, 입장 마감 시간을 함께 확인합니다."],
            ["출처 확인", "전시장 공식 페이지와 주최기관 안내가 확인되는 정보를 우선합니다."],
            ["방문 팁", "예매 여부, 도슨트 운영, 사진 촬영 가능 구역을 확인한 뒤 방문하는 것이 좋습니다."]
          ].map(([title, body]) => (
            <article key={title} className="rounded-xl border border-bara-line bg-slate-50 p-4">
              <h2 className="font-black text-bara-text">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">{body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
