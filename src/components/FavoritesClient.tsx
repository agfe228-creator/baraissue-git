"use client";

import { ListPageClient } from "@/components/ListPageClient";
import { getFavoriteSlugs } from "@/components/FavoriteButton";
import { EventItem } from "@/lib/events";
import { Suspense, useEffect, useState } from "react";

export function FavoritesClient({ events }: { events: EventItem[] }) {
  const [favoriteEvents, setFavoriteEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    function sync() {
      const slugs = getFavoriteSlugs();
      setFavoriteEvents(events.filter((event) => slugs.includes(event.slug)));
    }
    sync();
    window.addEventListener("favorites-changed", sync);
    return () => window.removeEventListener("favorites-changed", sync);
  }, [events]);

  return (
    <Suspense fallback={<main className="container-shell py-8"><div className="soft-card rounded-xl p-8">관심 행사를 불러오는 중입니다.</div></main>}>
      <ListPageClient title="관심 행사" description="하트로 저장한 행사를 모아볼 수 있습니다." baseEvents={favoriteEvents} />
    </Suspense>
  );
}
