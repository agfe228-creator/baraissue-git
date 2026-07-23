import { guidePosts, getGuidePost } from "@/lib/guidePosts";
import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const runtime = "edge";

export function generateStaticParams() {
  return guidePosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getGuidePost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/posts/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/posts/${post.slug}`,
      type: "article"
    }
  };
}

export default async function GuidePostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getGuidePost(slug);
  if (!post) notFound();

  const related = guidePosts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.updatedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: "축제바라"
    },
    publisher: {
      "@type": "Organization",
      name: "축제바라"
    },
    mainEntityOfPage: `${SITE_URL}/posts/${post.slug}`
  };

  return (
    <main className="container-shell py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="text-sm text-slate-500">
        <Link href="/">홈</Link> 〉 <Link href="/posts">축제 방문 가이드</Link> 〉 {post.title}
      </p>

      <article className="soft-card mt-4 rounded-xl p-6 leading-8 md:p-8">
        <div className="flex flex-wrap items-center gap-2 text-sm font-black text-slate-500">
          <span className="rounded-md bg-blue-100 px-2 py-1 text-bara-blue">{post.category}</span>
          <span>{post.readTime}</span>
          <span>업데이트 {post.updatedAt.replaceAll("-", ".")}</span>
        </div>
        <h1 className="mt-4 text-3xl font-black leading-tight text-bara-text md:text-4xl">{post.title}</h1>
        <p className="mt-5 rounded-xl bg-blue-50 p-4 text-slate-700">{post.summary}</p>

        <div className="mt-8 space-y-7">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-black text-bara-text">{section.heading}</h2>
              <p className="mt-3 text-slate-700">{section.body}</p>
            </section>
          ))}
        </div>

        <section className="mt-8 rounded-xl border border-bara-line bg-slate-50 p-5">
          <h2 className="text-xl font-black text-bara-text">방문 전 체크리스트</h2>
          <ul className="mt-3 grid gap-2 text-slate-700 md:grid-cols-2">
            {post.checklist.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="font-black text-bara-blue">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-xl border border-blue-100 bg-blue-50 p-5 text-sm leading-7 text-slate-700">
          <h2 className="text-lg font-black text-bara-text">축제바라 안내</h2>
          <p className="mt-2">
            이 글은 축제바라가 방문자 관점에서 직접 정리한 편집 가이드입니다. 개별 행사 일정과 장소, 요금은 변경될 수 있으므로
            실제 방문 전에는 행사 상세 페이지의 출처와 주최기관 공지를 함께 확인해 주세요.
          </p>
          <div className="mt-3 flex flex-wrap gap-3 font-bold text-bara-blue">
            <Link href="/festival">전국 축제 보기</Link>
            <Link href="/source-policy">출처 및 운영정책</Link>
            <Link href="/contact">수정 요청하기</Link>
          </div>
        </section>
      </article>

      <section className="mt-8">
        <h2 className="text-xl font-black text-bara-text">함께 읽기</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {related.map((item) => (
            <Link key={item.slug} href={`/posts/${item.slug}`} className="soft-card rounded-xl p-5">
              <p className="text-xs font-black text-bara-blue">{item.category}</p>
              <h3 className="mt-2 font-black text-bara-text">{item.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
