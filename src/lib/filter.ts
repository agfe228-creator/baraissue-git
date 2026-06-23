import { EventItem, events } from "@/lib/events";

export type EventQuery = {
  category?: string;
  region?: string;
  month?: string;
  status?: string;
  q?: string;
  sort?: string;
  page?: string;
};

export function filterEvents(query: EventQuery, source: EventItem[] = events) {
  let result = [...source];

  if (query.category && query.category !== "전체") {
    result = result.filter((event) => event.category === query.category);
  }

  if (query.region && query.region !== "전체") {
    result = result.filter((event) => event.region === query.region);
  }

  if (query.month && query.month !== "전체") {
    const month = query.month.replace("월", "").padStart(2, "0");
    result = result.filter((event) => event.startDate.slice(5, 7) === month);
  }

  if (query.status && query.status !== "전체") {
    result = result.filter((event) => event.status === query.status);
  }

  if (query.q) {
    const keyword = query.q.trim().toLowerCase();
    result = result.filter((event) =>
      [event.title, event.region, event.city, event.venue, event.category, event.description].join(" ").toLowerCase().includes(keyword)
    );
  }

  if (query.sort === "start") {
    result.sort((a, b) => a.startDate.localeCompare(b.startDate));
  } else {
    result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  return result;
}

export function paginate<T>(items: T[], page = 1, perPage = 6) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  return {
    items: items.slice((currentPage - 1) * perPage, currentPage * perPage),
    currentPage,
    totalPages
  };
}
