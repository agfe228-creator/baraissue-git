"use client";

import { navItems, SITE_NAME } from "@/lib/constants";
import { Menu, Search, Sparkle, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SearchBox } from "@/components/SearchBox";

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-bara-line bg-white/92 backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between">
        <Link href="/" className="focus-ring flex items-center gap-2 rounded-lg font-black text-bara-text">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-bara-blue text-white">
            <Sparkle size={18} />
          </span>
          {SITE_NAME}
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-bold text-bara-text md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-bara-blue">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setSearchOpen((value) => !value)} aria-label="검색창 열기" className="focus-ring rounded-lg p-2 transition hover:bg-slate-100">
            <Search size={22} />
          </button>
          <button onClick={() => setOpen((value) => !value)} aria-label="메뉴 열기" className="focus-ring rounded-lg p-2 transition hover:bg-slate-100">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {searchOpen ? (
        <div className="border-t border-bara-line bg-white">
          <div className="container-shell py-4">
            <SearchBox compact />
          </div>
        </div>
      ) : null}
      {open ? (
        <div id="mobile-menu" className="border-t border-bara-line bg-white">
          <div className="container-shell grid grid-cols-2 gap-2 py-4 md:grid-cols-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl border border-bara-line px-4 py-3 text-sm font-bold"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/about" onClick={() => setOpen(false)} className="rounded-xl border border-bara-line px-4 py-3 text-sm font-bold">
              소개
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="rounded-xl border border-bara-line px-4 py-3 text-sm font-bold">
              문의
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
