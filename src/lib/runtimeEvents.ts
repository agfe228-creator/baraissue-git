import { EventItem, events, getStatusFromDates } from "./events";
import { exhibitionProvider } from "../providers/exhibitionProvider";
import { fairProvider } from "../providers/fairProvider";
import { festivalProvider } from "../providers/festivalProvider";
import { performanceProvider } from "../providers/performanceProvider";
import { hasTourApiServiceKey } from "../providers/tourApiProvider";

type DbEvent = Omit<EventItem, "startDate" | "endDate" | "createdAt" | "updatedAt"> & {
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

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

function normalizeDbEvent(event: DbEvent): EventItem {
  const startDate = toDateString(event.startDate);
  const endDate = toDateString(event.endDate);

  return {
    ...event,
    category: event.category as EventItem["category"],
    status: getStatusFromDates(startDate, endDate),
    startDate,
    endDate,
    createdAt: toDateString(event.createdAt),
    updatedAt: toDateString(event.updatedAt)
  };
}

function toDateString(value: Date) {
  return value.toISOString().slice(0, 10);
}

async function getProviderEvents() {
  if (!hasTourApiServiceKey()) return events;

  try {
    const providers = [festivalProvider, fairProvider, exhibitionProvider, performanceProvider];
    const loaded = await Promise.all(providers.map((provider) => provider.fetchEvents()));
    const merged = new Map<string, EventItem>();
    for (const group of loaded) {
      for (const event of group) merged.set(event.slug, event);
    }
    return merged.size ? [...merged.values()] : events;
  } catch {
    return events;
  }
}
