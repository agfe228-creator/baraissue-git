import Link from "next/link";

export const metadata = { title: "행사 안내 글", description: "축제바라 행사 안내 글 모음", alternates: { canonical: "/posts" } };

export default function PostsPage() {
  return (
    <main className="container-shell py-10">
      <article className="soft-card rounded-xl p-6 leading-8">
        <h1 className="text-3xl font-black">행사 안내 글</h1>
        <p className="mt-5">
          축제바라는 현재 행사 상세 페이지와 지역·월별 목록을 중심으로 정보를 제공합니다. 별도 블로그 글은 공식 출처와 내용 검수가 끝난 뒤 순서대로 공개할 예정입니다.
        </p>
        <p className="mt-4">
          전국 행사 일정은 축제 페이지와 지역별 페이지에서 확인할 수 있습니다.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 font-bold text-bara-blue">
          <Link href="/festival">전국 축제 보기</Link>
          <Link href="/region/seoul">지역별 행사 보기</Link>
          <Link href="/source-policy">출처 및 운영정책</Link>
        </div>
      </article>
    </main>
  );
}
