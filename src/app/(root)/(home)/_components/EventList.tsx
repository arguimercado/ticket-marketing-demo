"use client";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../../convex/_generated/api";
import Spinner from "../../../../components/Spinner";
import EventCollection from "./EventCollections";
import PastEvent from "./PastEvent";

const EventList = () => {
   const events = useQuery(api.events.get, {});
   
   if(!events) {
      return (
         <div className="min-h-[400px] flex items-center justify-center">
            <Spinner />
         </div>
      )
   }

  
   
   return (
      <div className="max-w-7xl m-auto px-4 sm:px-6 lg:px-8 py-12">
         <EventCollection events={events} />
         <PastEvent events={events} />  
      </div>
   );
};

export default EventList;


