export const metadata = {
  title: "박람회",
  description: "전국 박람회 정보 검수 안내",
  alternates: { canonical: "/fair" },
  robots: { index: false, follow: true },
  openGraph: { title: "전국 박람회 안내", description: "공식 출처가 확인된 박람회 정보를 순서대로 정리합니다." }
};

export default function FairPage() {
  return (
    <main className="container-shell py-8">
      <section className="soft-card rounded-xl p-5 md:p-7">
        <p className="mb-3 text-sm text-slate-500">홈 〉 박람회</p>
        <h1 className="text-3xl font-black text-bara-text">전국 박람회 안내</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700">
          박람회 정보는 행사별 공식 홈페이지, 주최기관 공지, 공공기관 안내처럼 출처가 확인되는 자료를 기준으로 정리합니다.
          현재는 애드센스 심사와 사이트 품질 관리를 위해 공식 출처가 부족한 박람회 상세 글은 공개 목록에서 제외하고 있습니다.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            ["공식 출처", "주최기관, 전시장, 지자체 공지 등 확인 가능한 링크를 우선합니다."],
            ["방문 정보", "입장료, 사전 등록, 운영 시간, 부스 위치처럼 실제 방문에 필요한 정보를 확인합니다."],
            ["검수 기준", "행사명과 장소가 명확하지 않거나 출처가 약한 정보는 공개 전 보류합니다."]
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
