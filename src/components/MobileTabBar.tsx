"use client";

import { mobileTabs } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

export function MobileTabBar() {
  const pathname = usePathname();

  function openMenu(event: MouseEvent<HTMLAnchorElement>) {
    if (event.currentTarget.getAttribute("href") === "#menu") {
      event.preventDefault();
      document.querySelector<HTMLButtonElement>('button[aria-label="메뉴 열기"]')?.click();
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-bara-line bg-white md:hidden">
      <div className="grid h-16 grid-cols-4">
        {mobileTabs.map((tab) => {
          const Icon = tab.icon;
          const active = tab.href !== "#menu" && pathname === tab.href;
          return (
            <Link
              key={tab.label}
              href={tab.href}
              onClick={openMenu}
              className={`flex flex-col items-center justify-center gap-1 text-xs font-bold ${active ? "text-bara-blue" : "text-slate-600"}`}
            >
              <Icon size={19} />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
