"use client";
import { useUser } from "@clerk/nextjs";
import { Id } from "../../convex/_generated/dataModel";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useStorageUrl } from "@/lib/useStorageUrl";
import { useRouter } from "next/navigation";


const useEvents = () => {

   const events = useQuery(api.events.get, {});

    //group the events by location
    const eventsByLocation = events?.reduce((acc, event) => {
      const location = event.location;
      if (!acc[location]) {
         acc[location] = [];
      }
      acc[location].push(event);
      return acc;
   }, {} as Record<string, typeof events>);

   return { eventsByLocation,events };
}

const useEvent = ({ eventId }: { eventId: Id<"events"> }) => {
   
   const { user } = useUser();
   const router = useRouter();

   const event = useQuery(api.events.getById, { eventId });
   const availability = useQuery(api.events.getEventAvailability, { eventId });

   const userTicket = useQuery(api.tickets.getUserTicketForEvent, {
      eventId,
      userId: user?.id ?? "",
   });

   const queuePosition = useQuery(api.waitingList.getQueuePosition, {
      eventId,
      userId: user?.id ?? "",
   });

   const imageUrl = useStorageUrl(event?.imageStorageId);

   const remainingTickets =
      availability?.totalTickets - availability?.purchaseCount;

   return {
      event,
      availability,
      userTicket,
      queuePosition,
      imageUrl,
      router,
      user,
      remainingTickets,
   };
};

export const usePurchaseTicket = () => {

   const purchaseTicket = () => {};

   return {purchaseTicket}
}

export { useEvent, useEvents };