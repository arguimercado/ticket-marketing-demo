"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { off } from "process";
import { getTimeRemaining } from "@/lib/utils";
import { Ticket } from "lucide-react";
import { Button } from "./ui/button";

const usePuchaseTicket = (eventId: Id<"events">) => {
   const router = useRouter();
   const { user } = useUser();

   const queuePosition = useQuery(api.waitingList.getQueuePosition, {
      eventId,
      userId: user?.id ?? "",
   });

   const [timeRemaining, setTimeRemaining] = React.useState<string>("");
   const [isLoading, setIsLoading] = React.useState<boolean>(false);

   const offerExpiresAt = queuePosition?.offerExpiresAt ?? 0;
   const isExpired = offerExpiresAt < Date.now();

   useEffect(() => {
      if (isExpired) {
         setTimeRemaining("Expired");
         return;
      }

      const interval = setInterval(() => {
         setTimeRemaining(getTimeRemaining(offerExpiresAt));
      }, 1000);

      return () => clearInterval(interval);
   }, [offerExpiresAt, isExpired]);

   const handlePurchase = () => {};

   return {
      queuePosition,
      timeRemaining,
      isLoading,
      isExpired,
      router,
      user,
      handlePurchase
   };
};

const PurchaseTicket = ({ eventId }: { eventId: Id<"events"> }) => {
   const { queuePosition, timeRemaining, isLoading, isExpired,handlePurchase, router, user } =
      usePuchaseTicket(eventId);

   if (!user || !queuePosition || queuePosition.status !== "offered")
      return null;

   return (
      <div className="bg-white p-6 rounded-xl shadow-lg border border-amber-200">
         <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
               <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                     <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                        <Ticket className="w-6 h-6 text-amber-600" />
                     </div>
                     <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                           Ticket Reserved
                        </h3>
                        <p className="text-sm text-gray-500">
                           Expires in {timeRemaining}
                        </p>
                     </div>
                  </div>

                  <div className="text-sm text-gray-600 leading-relaxed">
                     A ticket has been reserved for you. Complete your purchase
                     before the timer expires to secure your spot at this event.
                  </div>
               </div>
            </div>

            <Button
               onClick={handlePurchase}
               disabled={isExpired || isLoading}
               className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-lg font-bold shadow-md hover:from-amber-600 hover:to-amber-700 transform hover:scale-[1.02] transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:hover:scale-100 text-lg"
            >
               {isLoading
                  ? "Redirecting to checkout..."
                  : "Purchase Your Ticket Now →"}
            </Button>

            <div className="mt-4">
               {/* <ReleaseTicket
                  eventId={eventId}
                  waitingListId={queuePosition._id}
               /> */}
            </div>
         </div>
      </div>
   );
};

export default PurchaseTicket;
