import { FavoritesClient } from "@/components/FavoritesClient";
import { getRuntimeEvents } from "@/lib/runtimeEvents";

export const metadata = {
  title: "관심 행사",
  description: "저장한 관심 행사를 확인하세요.",
  alternates: { canonical: "/favorites" },
  robots: { index: false, follow: true }
};

export default async function FavoritesPage() {
  const events = await getRuntimeEvents();
  return <FavoritesClient events={events} />;
}
