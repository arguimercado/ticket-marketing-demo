import { use } from "react";
import { Id } from "../../convex/_generated/dataModel";

export const ROUTE = {
   EVENT_BY_ID: (eventId: Id<"events">) => `/event/${eventId}`,
   SELLER_EVENT_EDIT: (eventId: Id<"events">) => `/seller/events/${eventId}/edit`,
   VIEW_TICKET: (userId: Id<"tickets">) => `/tickets/${userId}`,
} as const;