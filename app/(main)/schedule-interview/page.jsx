'use client'

import { supabase } from '@/app/services/supabaseClient'
import { useUser } from '@/context/UserDetailContext'
import React, { useEffect, useState } from 'react'

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
    <div>ScheduleInterview</div>
  )
}

export default ScheduleInterview