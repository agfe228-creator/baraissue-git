import { events } from "../lib/events";
import { ExternalEventProvider } from "./types";

export const performanceProvider: ExternalEventProvider = {
  name: "performance-seed-provider",
  async fetchEvents() {
    return events.filter((event) => event.category === "공연");
  }
};
