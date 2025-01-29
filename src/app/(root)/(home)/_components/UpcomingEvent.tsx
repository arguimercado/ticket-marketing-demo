import EventCard from "@/components/EventCard";
import { CalendarDays, Ticket } from "lucide-react";
import React from "react";

const UpcomingEvent = ({events} : {events: any[]}) => {
   
   const upcomingEvents = events?.filter((event) => event.eventDate > Date.now())
         .sort((a, b) => a.eventDate - b.eventDate);
   return (
      <>
      <div className="mb-10">
         <div className="flex items-center justify-between mb-8">
            <div>
               <h1 className="text-[18px] md:text-3xl  font-semibold text-gray-900">
                  Upcoming Event
               </h1>
               <p className="mt-2 text-xs md:text-base text-gray-600">
                  Discover & book for SM events
               </p>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
               <div className="flex items-center gap-2 text-gray-600">
                  <CalendarDays className="size-5" />
                  <span className="text-xs md:text-sm font-medium">
                     {upcomingEvents.length} Upcoming Events
                  </span>
               </div>
            </div>
         </div>
         <div>
            {upcomingEvents.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {upcomingEvents.map((event) => (
                     <EventCard key={event._id} eventId={event._id} />
                  ))}
               </div>
            ) : (
               <div className="bg-gray-50 rounded-lg p-12 text-center mb-12">
                  <Ticket className="size-12 mx-auto text-gray-900" />
                  <h3 className="text-lg">No upcoming events</h3>
               </div>
            )}
         </div>
      </div>
      </>
   );
};

export default UpcomingEvent;
