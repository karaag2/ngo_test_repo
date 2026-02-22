import React from 'react'
import Hero from '@/src/components/sections/hero'
import Cause from '@/src/components/sections/cause'

const page = () => {
  return (
    <div className='min-h-full inset-0'>
      <Hero />
      <Cause/>
      <div className="h-screen bg-red-500"></div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
    </div>
  )
}

export default page