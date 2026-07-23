import { SITE_NAME } from "@/lib/constants";
import { Sparkle } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-14 border-t border-bara-line bg-white pb-20 pt-8 md:pb-8">
      <div className="container-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2 font-black">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-bara-blue text-white">
              <Sparkle size={18} />
            </span>
            {SITE_NAME}
          </Link>
          <p className="mt-2 text-sm text-bara-muted">전국의 다양한 행사를 한눈에 확인하세요.</p>
        </div>
        <nav className="flex flex-wrap gap-5 text-sm font-bold text-slate-600">
          <Link href="/about">소개</Link>
          <Link href="/posts">방문 가이드</Link>
          <Link href="/contact">문의</Link>
          <Link href="/source-policy">출처 및 운영정책</Link>
          <Link href="/privacy">개인정보처리방침</Link>
          <Link href="/terms">이용약관</Link>
        </nav>
      </div>
      <p className="container-shell mt-5 text-xs text-slate-400">© 2026 축제바라. All rights reserved.</p>
    </footer>
  );
}
