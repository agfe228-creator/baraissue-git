export const metadata = {
  title: "공연",
  description: "전국 공연 정보 검수 안내",
  alternates: { canonical: "/performance" },
  robots: { index: false, follow: true },
  openGraph: { title: "전국 공연 안내", description: "공식 출처가 확인된 공연 정보를 순서대로 정리합니다." }
};

export default function PerformancePage() {
  return (
    <main className="container-shell py-8">
      <section className="soft-card rounded-xl p-5 md:p-7">
        <p className="mb-3 text-sm text-slate-500">홈 〉 공연</p>
        <h1 className="text-3xl font-black text-bara-text">전국 공연 안내</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700">
          공연 정보는 공연장, 예매처, 주최기관의 공식 안내를 기준으로 확인합니다. 좌석, 입장 시간, 예매 규정처럼 현장 이용에 직접 영향을 주는 정보가 많아
          출처가 명확한 공연부터 순서대로 공개합니다.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            ["예매 확인", "공식 예매처, 티켓 수령 방식, 취소 규정을 함께 확인합니다."],
            ["관람 안내", "공연 시작 시간, 지연 입장, 좌석 배치, 연령 제한을 확인합니다."],
            ["교통 정보", "공연장 주변 주차와 대중교통 혼잡도를 방문 전 함께 살펴봅니다."]
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
