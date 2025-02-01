import React, { ReactNode } from 'react'

const TextHeader = ({children} : {children: ReactNode}) => {
  return (
      <div className="flex flex-row items-center justify-between border-b border-gray-200 py-4 mb-8">
         {children}
      </div>
  )
}

export default TextHeader