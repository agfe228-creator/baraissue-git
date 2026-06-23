import { officialGuideCards } from "@/lib/officialGuides";

export function OfficialGuideSection({ title = "행사 방문 전 확인 가이드" }: { title?: string }) {
  return (
    <section className="container-shell py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-bara-text">{title}</h2>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {officialGuideCards.map((item) => (
          <article key={item.title} className="soft-card rounded-xl p-5">
            <h3 className="text-lg font-black text-bara-text">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-700">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
