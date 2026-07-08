'use client'

import { supabase } from '@/app/services/supabaseClient'
import { Button } from '@/components/ui/button'
import { useUser } from '@/context/UserDetailContext'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard'

const ScheduleInterview = () => {
   const [interviews, setInterviews] = useState([])
        const { user } = useUser()

  const GetInterviewList = async () => {
        let { data: Interviews, error } = await supabase
          .from('Interviews')
          .select('jobPosition,duration,interview_id,interview-feedback(userEmail)')
          .eq('userEmail',user?.email)
          .order('id',{ascending:false})
  
          console.log("interviewwwwwwwwwwwww",Interviews)
          setInterviews(Interviews)
      } 

      useEffect(() => {
            user && GetInterviewList()
          }, [user])

  return (
    <div className='mt-5'>
      <h2 className='font-semibold text-lg mb-5'>
        Scheduled Interview List
      </h2>
      {interviews.length === 0 ? (
          <div className='w-full border border-dashed rounded-lg p-6 text-center'>
            <p className='text-gray-500 mb-3'>
              No interviews created yet
            </p>
            <Button className='px-4 py-2 text-white rounded' onClick={() => router.push('/dashboard/create-interview')}>
              <Plus /> Create New Interview
            </Button>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {interviews.map((interview, index) => (
              <InterviewCard interview={interview} key={index} viewDetail={true}/>
            ))}
          </div>
        )}
    </div>
  )
}

export default ScheduleInterview