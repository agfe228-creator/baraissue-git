import Link from "next/link";

export const metadata = { title: "운영정책", description: "축제바라 운영정책 안내", alternates: { canonical: "/policy" } };

export default function PolicyPage() {
  return (
    <main className="container-shell py-10">
      <article className="soft-card rounded-xl p-6 leading-8">
        <h1 className="text-3xl font-black">운영정책</h1>
        <p className="mt-5">
          축제바라는 전국 행사 정보를 공개 출처와 운영 기준에 따라 정리합니다. 행사 정보의 출처, 검수 방식, 수정 요청 기준은
          출처 및 운영정책 페이지에서 자세히 안내합니다.
        </p>
        <p className="mt-4">
          개인정보 처리와 광고 쿠키 안내는 개인정보처리방침에서 확인할 수 있습니다.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 font-bold text-bara-blue">
          <Link href="/source-policy">출처 및 운영정책</Link>
          <Link href="/privacy">개인정보처리방침</Link>
          <Link href="/terms">이용약관</Link>
        </div>
      </article>
    </main>
  );
}
