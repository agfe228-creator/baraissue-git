import { events } from "../lib/events";
import { ExternalEventProvider } from "./types";

export const exhibitionProvider: ExternalEventProvider = {
  name: "exhibition-seed-provider",
  async fetchEvents() {
    return events.filter((event) => event.category === "전시회");
  }
};
