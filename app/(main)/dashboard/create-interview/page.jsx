"use client"

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import InterviewForm from './_components/InterviewForm'

const page = () => {
    const router = useRouter()
  return (
    <div className='p-7'>
        <div className='flex gap-4 mt-5 item-center bg-red'>
            <ArrowLeft className='cursor-pointer' onClick={()=>router.push('/dashboard')} />
            <h1 className='text-lg font-bold'>Create New Interview</h1>
        </div>
        <InterviewForm/>
    </div>
  )
}

export default page