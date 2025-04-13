import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'

function Dashboard() {
  return (
    <div className='p-10'>
        <h2 className='text-2xl font-bold'>Dashboard</h2>
        <h2 className='text-gray-500'>Create and start your AI Mockup interview</h2>
    <div className='grid grid-cols-1 md:grid-cols-3 my-5
    hover:scale-105 transition-all duration-300 focus-within:scale-105'>
        <AddNewInterview></AddNewInterview>
    </div>
    </div>
  )
}

export default Dashboard