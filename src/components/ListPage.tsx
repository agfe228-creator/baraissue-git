import { ListPageClient } from "@/components/ListPageClient";
import { EventItem } from "@/lib/events";
import { Suspense } from "react";

export function ListPage(props: {
  title: string;
  description: string;
  baseEvents: EventItem[];
  fixedQuery?: Record<string, string>;
}) {
  return (
    <Suspense fallback={<main className="container-shell py-8"><div className="soft-card rounded-xl p-8">행사 목록을 불러오는 중입니다.</div></main>}>
      <ListPageClient {...props} />
    </Suspense>
  );
}
