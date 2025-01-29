import EventCard from '@/components/EventCard';
import { Ticket } from 'lucide-react';
import React from 'react'


const PastEvent = ({events} : {events: any[]}) => {
   
   const pastEvents = events?.filter((event) => event.eventDate <= Date.now())
   .sort((a, b) => b.eventDate - a.eventDate);
   return (
      <>
         <div className="mb-10">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h1 className="text-[18px] md:text-3xl  font-semibold text-gray-900">
                     Past Event
                  </h1>
               </div>
            </div>
            <div>
               {pastEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                     {pastEvents.map((event) => (
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

export default PastEvent