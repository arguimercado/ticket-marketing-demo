import { LucideIcon } from 'lucide-react'
import React, { ReactNode } from 'react'

interface PinCardProps {
   Icon: LucideIcon
   description?: string
   children?: ReactNode
   position: 'left' | 'top'
}

const PinCard = ({Icon,description,children,position = 'left'} :PinCardProps) => {
  return (
    position === 'left' ? (
      <div className="flex items-center text-gray-600">
         <Icon className="w-4 h-4 mr-2" />
         {children ? (children) : (
            <span>
               {description}
            </span>
         )}
      </div>
    ) : (
      <div className="flex flex-col items-center text-gray-600 gap-2">
         <Icon className="w-5 h-5" />
         {children ? (children) : (
            <span>
               {description}
            </span>
         )}
      </div>
    )
  )
}

export default PinCard