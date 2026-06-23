"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function SearchBox({ compact = false, defaultValue = "" }: { compact?: boolean; defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = value.trim();
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  }

  return (
    <form onSubmit={submit} className={`flex overflow-hidden rounded-xl border border-bara-line bg-white shadow-soft ${compact ? "h-12" : "h-16"}`}>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="행사명, 지역, 장소를 검색해보세요"
        className="focus-ring min-w-0 flex-1 px-5 text-sm text-bara-text placeholder:text-bara-muted"
        aria-label="행사 검색"
      />
      <button aria-label="검색" className="focus-ring flex w-14 items-center justify-center bg-bara-blue text-white transition hover:bg-blue-700">
        <Search size={21} />
      </button>
    </form>
  );
}
