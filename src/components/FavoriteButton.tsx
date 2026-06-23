"use client";

import { Heart } from "lucide-react";
import { MouseEvent, useEffect, useState } from "react";

const key = "baraissue:favorites";

function readFavorites() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(key) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function getFavoriteSlugs() {
  return readFavorites();
}

export function FavoriteButton({ slug, label = false }: { slug: string; label?: boolean }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(readFavorites().includes(slug));
  }, [slug]);

  function toggle(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    const favorites = readFavorites();
    const next = favorites.includes(slug) ? favorites.filter((item) => item !== slug) : [...favorites, slug];
    localStorage.setItem(key, JSON.stringify(next));
    setActive(next.includes(slug));
    window.dispatchEvent(new Event("favorites-changed"));
  }

  return (
    <button
      onClick={toggle}
      aria-label={active ? "관심 행사 해제" : "관심 행사 저장"}
      className={`focus-ring inline-flex h-9 items-center justify-center gap-1 rounded-lg border px-3 text-sm font-semibold transition ${
        active ? "border-rose-200 bg-rose-50 text-rose-500" : "border-bara-line bg-white text-slate-500 hover:text-rose-500"
      }`}
    >
      <Heart size={17} fill={active ? "currentColor" : "none"} />
      {label ? "찜" : null}
    </button>
  );
}
