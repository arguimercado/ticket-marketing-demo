import { Ticket } from "lucide-react";
import React from "react";

const SoldOut = () => {
   return (
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
         <div className="flex items-center">
            <Ticket className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-gray-600">Event is sold out</span>
         </div>
      </div>
   );
};

export default SoldOut;
