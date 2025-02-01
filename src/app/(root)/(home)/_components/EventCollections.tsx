import EventCard from "@/components/events/EventCard";
import { CalendarDays, Ticket } from "lucide-react";
import React from "react";

const EventCollection = ({events,labelNoEvent} : {events: any[],labelNoEvent: string}) => {
   
   
   return (
      <>
         {events.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                  {events.map((event) => (
                     <EventCard key={event._id} eventId={event._id} />
                  ))}
               </div>
            ) : (
               <div className="bg-gray-50 rounded-lg p-12 text-center mb-12">
                  <Ticket className="size-12 mx-auto text-gray-900" />
                  <h3 className="text-lg">{labelNoEvent}</h3>
               </div>
            )}
      </>
   );
};

export default EventCollection;
