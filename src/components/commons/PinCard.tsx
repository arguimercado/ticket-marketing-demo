import { CalendarDays, LucideIcon } from 'lucide-react'
import React, { ReactNode } from 'react'

const PinCard = ({Icon,description,children} : {Icon: LucideIcon, description?: string, children?: ReactNode}) => {
  return (
   <div className="flex items-center text-gray-600">
      <Icon className="w-4 h-4 mr-2" />
      {children ? (children) : (
         <span>
            {description}
         </span>
      )}
   </div>
  )
}

export default PinCard