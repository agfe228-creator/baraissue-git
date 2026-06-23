import { EventItem } from "./events";
import { festivalProvider } from "../providers/festivalProvider";
import { hasTourApiServiceKey } from "../providers/tourApiProvider";

let cachedEvents: { expiresAt: number; items: EventItem[] } | null = null;
const cacheMs = 10 * 60 * 1000;

export async function getRuntimeEvents(): Promise<EventItem[]> {
  if (cachedEvents && cachedEvents.expiresAt > Date.now()) {
    return cachedEvents.items;
  }

  const providerEvents = await getProviderEvents();
  cachedEvents = { expiresAt: Date.now() + cacheMs, items: providerEvents };
  return providerEvents;
}

export async function getRuntimeEvent(slug: string): Promise<EventItem | undefined> {
  const allEvents = await getRuntimeEvents();
  let normalizedSlug = slug;
  try {
    normalizedSlug = decodeURIComponent(slug);
  } catch {
    normalizedSlug = slug;
  }
  return allEvents.find((event) => event.slug === normalizedSlug);
}

async function getProviderEvents() {
  if (!(await hasTourApiServiceKey())) return [];

  try {
    const loaded = await festivalProvider.fetchEvents();
    return loaded.filter((event) => event.slug.startsWith("tourapi-"));
  } catch {
    return [];
  }
}
