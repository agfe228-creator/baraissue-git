import { events } from "../lib/events";
import { ExternalEventProvider } from "./types";
import { fetchTourApiEvents } from "./tourApiProvider";

export const festivalProvider: ExternalEventProvider = {
  name: "festival-seed-provider",
  async fetchEvents() {
    const tourApiEvents = await fetchTourApiEvents("축제");
    if (tourApiEvents.length) return tourApiEvents;
    return events.filter((event) => event.category === "축제");
  }
};
