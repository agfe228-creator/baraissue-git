import { events } from "../lib/events";
import { ExternalEventProvider } from "./types";

export const fairProvider: ExternalEventProvider = {
  name: "fair-seed-provider",
  async fetchEvents() {
    return events.filter((event) => event.category === "박람회");
  }
};
