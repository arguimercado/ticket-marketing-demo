"use client";
import React from "react";
import { Id } from "../../convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useStorageUrl } from "@/lib/useStorageUrl";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { CalendarDays, MapPin, StarIcon, Ticket } from "lucide-react";
import PinCard from "./commons/PinCard";

const EventCard = ({ eventId }: { eventId: Id<"events"> }) => {
   const { user } = useUser();
   const { router } = useRouter();
   
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

   if (!event || !availability) return null;

   const isPastEvent = event.eventDate < Date.now();
   const isEventOwner = user?.id === event.userId;

   return (
      <Link href={`/event/${eventId}`} className="flex min-h-[220px] w-full">
         <div
            className={cn(
               "bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer overflow-hidden relative",
               isPastEvent ? "opacity-75 hover:opacity-100" : ""
            )}
         >
            <div className="flex flex-col">
               {imageUrl && (
                  <div className="relative w-full h-48">
                     <Image
                        src={imageUrl}
                        alt={event.name}
                        fill
                        className="object-cover"
                        priority
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/50" />
                  </div>
               )}
               <div className={`p-6 ${imageUrl ? "relative" : ""}`}>
                  <div className="flex flex-col items-start">
                     {/* Event name and owner badge */}
                     <div>
                        <div className="flex flex-col items-start gap-2">
                           {isEventOwner && (
                              <span className="inline-flex items-center gap-1 bg-blue-600/90 text-white px-2 py-1 rounded-full text-xs font-medium">
                                 <StarIcon className="w-3 h-3" />
                                 Your Event
                              </span>
                           )}
                           <h2 className="text-lg font-bold text-gray-900">
                              {event.name}
                           </h2>
                        </div>
                        {isPastEvent && (
                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mt-2">
                              Past Event
                           </span>
                        )}
                     </div>

                     {/* Price tag */}
                     <div className="flex flex-col items-end gap-2 ml-4 w-full justify-self-end">
                        <span
                           className={`px-4 py-1.5 font-semibold rounded-full ${
                              isPastEvent
                                 ? "bg-gray-50 text-gray-500"
                                 : "bg-green-50 text-green-700"
                           }`}
                        >
                           PHP {event.price.toFixed(2)}
                        </span>
                        {availability.purchaseCount >=
                           availability.totalTickets && (
                           <span className="px-4 py-1.5 bg-red-50 text-red-700 font-semibold rounded-full text-sm">
                              Sold Out
                           </span>
                        )}
                     </div>
                  </div>

                  {/* Event detail */}
                  <div className="mt-4 space-y-3 text-xs">
                     <PinCard Icon={MapPin} description={event.location} />
                     <PinCard
                        Icon={CalendarDays}
                        description={`${new Date(event.eventDate).toLocaleDateString()} ${isPastEvent ? "(ended)" : ""}`}
                     />
                     <PinCard Icon={Ticket}>
                        <span>
                           {availability.totalTickets -
                              availability.purchaseCount}{" "}
                           / {availability.totalTickets} available
                           {!isPastEvent && availability.activeOffer > 0 && (
                              <span className="text-amber-600 text-sm ml-2">
                                 ({availability.activeOffer}{" "}
                                 {availability.activeOffer === 1
                                    ? "person"
                                    : "people"}{" "}
                                 trying to buy)
                              </span>
                           )}
                        </span>
                     </PinCard>
                     
                  </div>

                  <p className="mt-4 text-gray-600 text-sm line-clamp-2">
                     {event.description}
                  </p>
               </div>
            </div>
         </div>
      </Link>
   );
};

export default EventCard;
