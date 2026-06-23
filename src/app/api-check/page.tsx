import { fetchTourApiDebug } from "@/providers/tourApiProvider";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "API 확인",
  robots: { index: false, follow: false }
};

export default async function ApiCheckPage() {
  const debug = await fetchTourApiDebug();

  return (
    <main className="container-shell py-10">
      <section className="soft-card rounded-xl p-6">
        <h1 className="text-3xl font-black text-bara-text">TourAPI 연결 확인</h1>
        <div className="mt-6 grid gap-3 text-sm leading-7 text-slate-700">
          <p>
            <strong>API 키 상태:</strong> {debug.hasKey ? "읽힘" : "없음"}
          </p>
          <p>
            <strong>가져온 행사 수:</strong> {debug.itemCount.toLocaleString()}개
          </p>
          {"message" in debug && debug.message ? (
            <p>
              <strong>메시지:</strong> {debug.message}
            </p>
          ) : null}
          {"sampleTitles" in debug && debug.sampleTitles?.length ? (
            <div>
              <strong>샘플 행사:</strong>
              <ul className="mt-2 list-disc pl-5">
                {debug.sampleTitles.map((title) => (
                  <li key={title}>{title}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
