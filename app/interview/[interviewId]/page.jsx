'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { supabase } from '@/app/services/supabaseClient'

const InterviewId = () => {

  const [interviewDetails, setInterviewDetails] = useState()
  const { interviewId } = useParams()
  console.log(interviewId)

  useEffect(() => {
    interviewId && GetInterviewDetails()
  }, [interviewId])

  const GetInterviewDetails = async () => {
    let { data: Interviews, error } = await supabase
      .from('Interviews')
      .select("jobPosition,jobDescription,duration,type,questionList")
      .eq('interview_id', interviewId)

    console.log(Interviews)
    setInterviewDetails(Interviews[0])
  }

  return (
    <div className='w-full flex flex-col items-center '>
      <div className='w-100 flex flex-col items-center gap-2 py-8'>
        <h1 className="text-xl font-extrabold tracking-widest
                       bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900
                       bg-clip-text text-transparent">
          SCHEDULE<span className="text-gray-400">-</span>INTERVIEW
        </h1>
        <p>AI Powered Interview Platform</p>
        <h2>{interviewDetails?.jobPosition}</h2>
        <Image
          src="/inter.jpg"
          alt="Interview illustration"
          width={400}
          height={250}
          className="rounded-lg"
        />
        <div className='mt-5'>
          <label>Enter Your full name</label>
          <Input placeholder="e.g.Soumya Joshi" />
          <div className='mt-4 bg-gray-300 p-2 rounded-md'>
            <h4 className='flex font-bold gap-2'><Info />Before You Login</h4>
            <ul className='ml-8 text-sm'>
              <li>stable internet connection</li>
              <li>Test camera and microphone</li>
              <li>Find a quite place</li>
            </ul>
          </div>
          <Button className='mt-5 w-full'>Join Interview</Button>
        </div>
      </div>
    </div>
  )
}

export default InterviewId