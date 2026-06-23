import { EventItem } from "../lib/events";

export type ExternalEventProvider = {
  name: string;
  fetchEvents: () => Promise<EventItem[]>;
};
