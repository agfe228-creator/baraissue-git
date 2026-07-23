import { guidePosts } from "@/lib/guidePosts";
import Link from "next/link";

export const metadata = {
  title: "축제 방문 가이드",
  description: "가족 나들이, 교통, 주차, 우천 대처, 공식 출처 확인까지 축제 방문 전에 읽기 좋은 안내 글 모음입니다.",
  alternates: { canonical: "/posts" }
};

export default function PostsPage() {
  return (
    <main className="container-shell py-10">
      <section className="rounded-xl border border-blue-100 bg-blue-50 p-6 leading-8">
        <p className="text-sm font-black text-bara-blue">축제바라 편집 가이드</p>
        <h1 className="mt-2 text-3xl font-black text-bara-text">축제 방문 전에 읽어두면 좋은 글</h1>
        <p className="mt-4 max-w-3xl text-slate-700">
          축제바라는 행사명과 날짜만 나열하지 않고, 실제 방문자가 준비 과정에서 자주 놓치는 교통, 주차, 우천 운영, 아이 동반 안전,
          공식 출처 확인 방법을 별도 가이드로 정리합니다. 아래 글은 공개 행사 정보를 바탕으로 방문 판단에 도움이 되는 기준을 축제바라가 직접 편집한 안내입니다.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {guidePosts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`} className="soft-card rounded-xl p-5 transition hover:-translate-y-0.5 hover:border-blue-200">
            <div className="flex flex-wrap items-center gap-2 text-xs font-black text-slate-500">
              <span className="rounded-md bg-blue-100 px-2 py-1 text-bara-blue">{post.category}</span>
              <span>{post.readTime}</span>
              <span>{post.updatedAt.replaceAll("-", ".")}</span>
            </div>
            <h2 className="mt-3 text-xl font-black text-bara-text">{post.title}</h2>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-700">{post.summary}</p>
            <p className="mt-4 text-sm font-black text-bara-blue">자세히 읽기 〉</p>
          </Link>
        ))}
      </section>

      <section className="mt-8 rounded-xl border border-bara-line bg-white p-5 text-sm leading-7 text-slate-700 shadow-sm">
        <h2 className="text-lg font-black text-bara-text">운영 기준</h2>
        <p className="mt-2">
          가이드 글은 특정 행사를 과장해 홍보하기보다, 방문자가 직접 일정을 고를 때 필요한 확인 기준을 중심으로 작성합니다.
          행사 일정과 장소는 주최 측 사정에 따라 달라질 수 있으므로, 실제 방문 전에는 행사 상세 페이지의 출처와 주최기관 공지를 함께 확인해 주세요.
        </p>
        <div className="mt-3 flex flex-wrap gap-3 font-bold text-bara-blue">
          <Link href="/festival">전국 축제 보기</Link>
          <Link href="/source-policy">출처 및 운영정책</Link>
          <Link href="/contact">수정 요청하기</Link>
        </div>
      </section>
    </main>
  );
}
