import React, { ReactNode } from 'react'
import Navbar from '../navbar/admin_navbar'
type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className='grid h-screen grid-cols-5'>
      <Navbar className='col-span-1' />
      <main className='col-span-4 flex items-start justify-center'>
        {/* for alert */}
        {children}
      </main>
    </div>
  )
}