import { query } from "./_generated/server";
import { v } from "convex/values";
import { TICKET_STATUS, WAITING_LIST_STATUS } from "./constant";

export const getById = query({
   args: { eventId: v.id("events") },
   handler: async (ctx, { eventId }) => {

      return await ctx.db.get(eventId);


   }
})

export const get = query({
   args: {},
   handler: async (ctx) => {
      return await ctx.db
         .query("events")
         .filter((q) => q.eq(q.field("is_cancelled"), undefined))
         .collect();
   }
});

export const getEventAvailability = query({
   args: { eventId: v.id("events") },
   handler: async (ctx, { eventId }) => {

      const event = await ctx.db.get(eventId);
      if (!event) throw new Error("Event not found");

      const purchaseCount = await ctx.db
         .query("tickets")
         .withIndex("by_event", (q) => q.eq("eventId", eventId))
         .collect()
         .then(
            (tickets) => tickets.filter((t) => 
               t.status === TICKET_STATUS.VALID ||
               t.status === TICKET_STATUS.USED).length
         )
      
      const now = Date.now();
      const activeOffer = await ctx.db
         .query("waitingList")
         .withIndex("by_event_status", 
            (q) => q.eq("eventId", eventId).eq("status", WAITING_LIST_STATUS.OFFERED))
         .collect()
         .then(
            (entries) => entries.filter((e) => (e.offerExpiresAt ?? 0) > now).length
         );
      
      const totalReserved = purchaseCount + activeOffer;

      return {
         isSoldOut: totalReserved > event.totalTickets,
         totalTickets: event.totalTickets,
         purchaseCount,
         activeOffer,
         remainingTickets: Math.max(0, event.totalTickets - totalReserved)
      };
   }
});