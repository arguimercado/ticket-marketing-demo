import Header from '@/components/layout/Header'
import React, { ReactNode } from 'react'

const RootLayout = ({children} : {children: ReactNode}) => {
  return (
    <div className='flex flex-col min-h-screen w-full bg-slate-50'>
      <Header />
      {children}
    </div>
  )
}

export default RootLayout