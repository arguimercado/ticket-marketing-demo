"use client";
import React from "react";
import { Id } from "../../../convex/_generated/dataModel";

import { cn } from "@/lib/utils";
import Image from "next/image";
import {
   CalendarDays,
   Check,
   CircleArrowRight,
   LoaderCircle,
   MapPin,
   Pencil,
   StarIcon,
   Ticket,
   XCircle,
} from "lucide-react";
import PinCard from "../commons/PinCard";
import { Button } from "../ui/button";
import { ROUTE } from "@/constants/router";

import EventPolicy from "@/lib/policies/event";
import { useEvent } from "@/hooks/useEvent";
import EventSoldOut from "./EventSoldOut";
import PurchaseTicket from "./PurchaseTicket";
 

const EventCard = ({ eventId }: { eventId: Id<"events"> }) => {
   
   const {
      event,
      availability,
      imageUrl,
      router,
      user,
      remainingTickets,
      userTicket,
      queuePosition,
   } = useEvent({ eventId });

   if (!event || !availability) return null;

   const policy = new EventPolicy(event, user, availability);

   const renderQueuePosition = () => {
      if (!queuePosition || queuePosition.status !== "waiting") return null;

      if (policy.isSoldOut()) {
         return <EventSoldOut />;
      }

      if (queuePosition.position === 2) {
         return (
            <div className="flex flex-col lg:flex-row items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-100">
               <div className="flex items-center">
                  <CircleArrowRight className="w-5 h-5 text-amber-500 mr-2" />
                  <span className="text-amber-700 font-medium">
                     You&apos;re next in line! (Queue position:{" "}
                     {queuePosition.position})
                  </span>
               </div>
               <div className="flex items-center">
                  <LoaderCircle className="w-4 h-4 mr-1 animate-spin text-amber-500" />
                  <span className="text-amber-600 text-sm">
                     Waiting for ticket
                  </span>
               </div>
            </div>
         );
      }

      return (
         <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center">
               <LoaderCircle className="w-4 h-4 mr-2 animate-spin text-blue-500" />
               <span className="text-blue-700">Queue position</span>
            </div>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
               #{queuePosition.position}
            </span>
         </div>
      );
   };

   const renderTicketStatus = () => {
     
      if (policy.isEventOwner()) {
         return (
            <Button
               variant={"info"}
               size={"sm"}
               onClick={() => router.push(ROUTE.SELLER_EVENT_EDIT(eventId))}
               className="w-full"
            >
               <Pencil className="w-4 h-4" />
               Edit Event
            </Button>
         );
      }

      if (userTicket) {
         return (
            <div className="mt-4 flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
               <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-green-700 font-medium">
                     You have ticket!
                  </span>
               </div>
               <Button
                  onClick={() => router.push(ROUTE.VIEW_TICKET(userTicket._id))}
                  variant={"success"}>
                  View your ticket
               </Button>
            </div>
         );
      }

      if (queuePosition) {
         return (
            <div className="mt-4">
               {queuePosition.status === "offered" && (
                  <PurchaseTicket eventId={eventId} />
               )}
               {renderQueuePosition()}
               {queuePosition.status === "expired" && (
                  <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                     <span className="text-red-700 font-medium flex items-center">
                        <XCircle className="w-5 h-5 mr-2" />
                        Offer expired
                     </span>
                  </div>
               )}
            </div>
         );
      }

      return(
         <Button
            variant={"success"}
            onClick={() => router.push(ROUTE.EVENT_BY_ID(eventId))}
            className="w-full"
         >
            Buy Ticket
         </Button>
      )
   };

   return (
      <div
         onClick={() => router.push(ROUTE.EVENT_BY_ID(eventId))}
         className="flex min-h-[220px] w-full"
      >
         <div
            className={cn(
               "bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer overflow-hidden relative w-full",
               policy.isPastEvent() ? "opacity-75 hover:opacity-100" : ""
            )}
         >
            <div className="flex flex-col">
               <div className="relative w-full h-48">
                  <Image
                     src={"https://images1.smtickets.com/images/portrait_27122024145310.jpg"}
                     alt={event.name}
                     fill
                     className="object-cover"
                     priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50" />
               </div>
               <div className={`p-6 ${imageUrl ? "relative" : ""}`}>
                  <div className="flex flex-col items-start">
                     {/* Event name and owner badge */}
                     <div>
                        <div className="flex flex-col items-start gap-2">
                           {policy.isEventOwner() && (
                              <span className="inline-flex items-center gap-1 bg-blue-600/90 text-white px-2 py-1 rounded-full text-xs font-medium">
                                 <StarIcon className="w-3 h-3" />
                                 Your Event
                              </span>
                           )}
                           <h2 className="text-base font-bold text-gray-900 line-clamp-1">
                              {event.name}
                           </h2>
                        </div>
                        {policy.isPastEvent() && (
                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mt-2">
                              Past Event
                           </span>
                        )}
                     </div>

                     {/* Price tag */}
                     <div className="flex flex-col items-end gap-2 ml-4 w-full justify-self-end">
                        <span
                           className={`px-4 py-1.5 font-semibold rounded-full ${
                              policy.isPastEvent()
                                 ? "bg-gray-50 text-gray-500"
                                 : "bg-green-50 text-green-700"
                           }`}
                        >
                           PHP {event.price.toFixed(2)}
                        </span>
                        {policy.isSoldOut() && (
                           <span className="px-4 py-1.5 bg-red-50 text-red-700 font-semibold rounded-full text-sm">
                              Sold Out
                           </span>
                        )}
                     </div>
                  </div>

                  {/* Event detail */}
                  <div className="mt-4 space-y-3 text-xs">
                     <PinCard Icon={MapPin} description={event.location} position={"left"} />
                     <PinCard
                        Icon={CalendarDays}
                        description={`${new Date(event.eventDate).toLocaleDateString()} ${policy.isPastEvent() ? "(ended)" : ""}`} position={"left"}                     />
                     <PinCard Icon={Ticket} position={"left"}>
                        <span>
                           {remainingTickets} / {availability.totalTickets}{" "}
                           available
                           {!policy.isPastEvent() &&
                              availability.activeOffer > 0 && (
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

                
                  <div onClick={(e) => e.stopPropagation()} className="mt-4">
                     {!policy.isPastEvent() && renderTicketStatus()}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default EventCard;
