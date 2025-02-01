
"use client";

import TextHeader from "@/components/layout/TextHeader";
import { useParams } from "next/navigation";
import React from "react";
import { Id } from "../../../../../convex/_generated/dataModel";
import Spinner from "@/components/commons/Spinner";
import PinCard from "@/components/commons/PinCard";
import { Calendar, Coins, MapPin, Ticket } from "lucide-react";
import { formatDate } from "date-fns";
import { useEvent, usePurchaseTicket } from "@/hooks/useEvent";
import EventSoldOut from "@/components/events/EventSoldOut";
import { Button } from "@/components/ui/button";
import EventPolicy from "@/lib/policies/event";
import Image from "next/image";
import Link from "next/link";

const EventPage = () => {

   const {id} = useParams();
   const {event,remainingTickets,availability,user} = useEvent({eventId: id as Id<"events">});
   const {purchaseTicket} = usePurchaseTicket();

   const [loading,isLoading] = React.useState(false);

   const policy = new EventPolicy(event, user, availability);

   if(!event) {
      return <Spinner />
   }

   const renderPurchaseButton = () => {
      if(policy.isSoldOut()) {
         return <EventSoldOut />
      }

      return (
         <Button variant={"success"} onClick={purchaseTicket} >
            PurchaseTicket
         </Button>
      )
   }
   
   return (
      <div className="w-full lg:max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 py-12">
         <div className="w-full flex flex-row items-center justify-between border-b border-gray-200 py-4 mb-8">
            {!user && (
               <p className="text-base text-slate-500 font-semibold">
                  Please <Link className="text-sky-400 cursor-pointer" href="/signin">Login</Link> to purchase tickets
               </p>)}
         </div>
         <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-1/2">
               <Image
                  src="https://images1.smtickets.com/images/portrait_27122024145310.jpg" 
                  alt={event.name}
                  width={500}
                  height={500}
                  className="rounded-md" 
               />
            </div>
            <div className="flex-1 flex flex-col gap-4">
               <TextHeader>
                 <h3 className="text-2xl font-semibold text-slate-600">{event.name}</h3> 
               </TextHeader>
               <p className="text-base">{event.description}</p>
               <div className="mt-8">
                  <div className="flex flex-col bg-slate-100 w-full rounded-md px-12 py-6 gap-4">
                     <div className="flex flex-row items-center justify-between ">
                        <PinCard Icon={Calendar} position="top" description={formatDate(event.eventDate,"MMMM dd, yyyy")} />
                        <PinCard Icon={MapPin} position="top" description={event.location} />
                     </div>
                     <div className="flex flex-row items-center justify-between mt-8">
                        <PinCard Icon={Coins} position="top">
                           <span className="text-base font-semibold">{event.price} PHP</span>
                        </PinCard>
                        <PinCard Icon={Ticket} position="top">
                        {remainingTickets} / {availability.totalTickets}{" "}
                           available
                        </PinCard>
                     </div>
                  </div>
                     {event.lowerPrice > 0 && (
                        <div className="flex flex-row justify-between bg-slate-100 w-full rounded-md px-12 py-6 gap-4 mt-4">
                           <p className="w-[60%]">Standing</p>
                           <div className="flex flex-col items-end">
                              <p className="text-base font-semibold">{event.lowerPrice} PHP</p>
                              <PinCard Icon={Ticket} position="left">
                                 <span className="text-sm">
                                    {remainingTickets} / {availability.totalTickets}{" "}
                                       available

                                 </span>
                              </PinCard>
                           </div>
                        </div>
                     )}
                     {event.lowerPrice > 0 && (
                        <div className="flex flex-row justify-between bg-slate-100 w-full rounded-md px-12 py-6 gap-4 mt-4">
                           <p className="w-[60%]">Lower Box Premium</p>
                           <div className="flex flex-col items-end">
                              <p className="text-base font-semibold">{event.upperPrice} PHP</p>
                              <PinCard Icon={Ticket} position="left">
                                 <span className="text-sm">
                                    {remainingTickets} / {availability.totalTickets}{" "}
                                       available

                                 </span>
                              </PinCard>
                           </div>
                        </div>
                     )}
                     {event.lowerPrice > 0 && (
                        <div className="flex flex-row justify-between bg-slate-100 w-full rounded-md px-12 py-6 gap-4 mt-4">
                           <p className="w-[60%]">VIP Price</p>
                           <div className="flex flex-col items-end">
                              <p className="text-base font-semibold">{event.vipPrice} PHP</p>
                              <PinCard Icon={Ticket} position="left">
                                 <span className="text-sm">
                                    {remainingTickets} / {availability.totalTickets}{" "}
                                       available

                                 </span>
                              </PinCard>
                           </div>
                        </div>
                     )}
                  <div className="flex flex-col bg-sky-100 w-full rounded-md px-12 py-6 gap-4 mt-4">
                     <p className="text-base  text-sky-500 font-semibold">Guidelines for Online Ticket Purchase</p>
                     <p className="text-base text-sky-400">To protect all users from fraud and unintended misuse of credit cards, please note that the following should ALL bear the SAME NAME when buying tickets online:</p>
                  </div>
                  <div className="flex flex-row justify-end mt-8">
                     {user && renderPurchaseButton()}
                  </div>
               </div>
            </div>

         </div>
      </div>
   );
};

export default EventPage;
