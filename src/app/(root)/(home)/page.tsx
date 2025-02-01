"use client";
import Spinner from "@/components/commons/Spinner";
import EventCard from "@/components/events/EventCard";
import { useEvents } from "@/hooks/useEvent";

export default function Home() {

   const {eventsByLocation} = useEvents();

   if (!eventsByLocation) {
      return (
         <div className="min-h-[400px] flex items-center justify-center">
            <Spinner />
         </div>
      );
   }
  
   return (
      <div className="w-full lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         {Object.keys(eventsByLocation).map((location) => (
            <div key={location} className="flex flex-col gap-4">
               <div className="flex flex-row items-center justify-between border-b border-gray-200 py-4 mb-8">
                  <h1 className="text-2xl md:text-3xl  font-semibold text-gray-900">
                     {location}
                  </h1>
               </div>
               <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                  {eventsByLocation[location].map((event) => (
                      <EventCard key={event._id} eventId={event._id} />
                  ))}
               </div>
            </div>
         ))}
      </div>
   );
}
