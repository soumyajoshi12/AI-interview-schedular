"use client"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const LatestInterviewList = () => {
  const [interviews, setInterviews] = useState([])
  const router = useRouter()

  return (
    <div className='mt-5'>
      <h2 className='text-lg font-semibold mb-3'>
        Previously Created Interviews
      </h2>

      {/* If array is empty */}
      {interviews.length === 0 ? (
        <div className='w-full border border-dashed rounded-lg p-6 text-center'>
          <p className='text-gray-500 mb-3'>
            No interviews created yet
          </p>
          <Button className='px-4 py-2 text-white rounded' onClick = {() => router.push('/dashboard/create-interview')}>
           <Plus/> Create New Interview
          </Button>
        </div>
      ) : (
        /* If interviews exist */
        <div className='space-y-3'>
          {interviews.map((interview, index) => (
            <div
              key={index}
              className='w-full border rounded-lg p-4'
            >
              <h3 className='font-medium'>
                {interview.title}
              </h3>
              <p className='text-sm text-gray-500'>
                {interview.date}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LatestInterviewList
