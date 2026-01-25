'use client'

import { InterviewDetailsContext } from '@/context/InterviewDetails'
import { Mic, Phone, Timer } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Vapi from '@vapi-ai/web'
import AlertDialogBox from './_components/AlertDialogBox'

const Page = () => {
  const { interviewDetail } = useContext(InterviewDetailsContext)

  const vapiRef = useRef(null)
  const [callActive, setCallActive] = useState(false)
  const [seconds, setSeconds] = useState(0)

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (!callActive) return

    const timer = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [callActive])

  const formatTime = () => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0')
    const secs = String(seconds % 60).padStart(2, '0')
    return `${mins}:${secs}`
  }

  /* ---------------- VAPI SETUP ---------------- */
  useEffect(() => {
    vapiRef.current = new Vapi(
      process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY
    )

    vapiRef.current.on('call-start', () => {
      console.log('Interview started')
      setCallActive(true)
      setSeconds(0)
    })

    vapiRef.current.on('call-end', () => {
      console.log('Interview ended')
      setCallActive(false)
    })

    vapiRef.current.on('error', (e) => {
      console.error('Vapi error:', e)
      setCallActive(false)
    })

    return () => {
      vapiRef.current?.stop()
    }
  }, [])

const startInterview = async () => {
  try {
    await vapiRef.current.start({
      assistant: {
        id: '3644cd7c-2fdd-4d5e-bc59-35bb990c2adc'
      }
    })
  } catch (err) {
    console.error('Start failed:', err)
  }
}



  const stopInterview = () => {
    vapiRef.current.stop()
  }

  /* ---------------- UI ---------------- */
  return (
    <div className='py-10 px-20'>
      <div className='flex w-full justify-between'>
        <h2 className='text-lg font-bold'>AI Interview Session</h2>
        <span className='flex gap-2'><Timer />{formatTime()}</span>
      </div>

      <div className='grid grid-cols-2 gap-8 mt-5'>
        <div className='bg-gray-100 rounded-lg p-40 flex flex-col items-center'>
          <Image
            src='/login.png'
            alt='AI'
            width={70}
            height={70}
            className='rounded-full'
          />
          <h2 className='mt-2'>AI Recruiter</h2>
        </div>

        <div className='bg-gray-100 rounded-lg p-40 flex flex-col items-center'>
          <div className='text-lg bg-gray-900 text-white w-[70px] h-[70px] rounded-full flex items-center justify-center'>
            {interviewDetail?.userName?.[0]}
          </div>
          <h2 className='mt-2'>{interviewDetail?.userName}</h2>
        </div>
      </div>

      <div className='flex gap-6 mt-5 justify-center'>
        {!callActive ? (
          <button
            onClick={startInterview}
            className='w-[50px] h-[50px] bg-green-700 text-white rounded-full flex items-center justify-center'
          >
            <Mic />
          </button>
        ) : (
          <AlertDialogBox stopInterview={stopInterview}>
            <div className='w-[50px] h-[50px] bg-red-700 text-white rounded-full flex items-center justify-center cursor-pointer'>
              <Phone />
            </div>
          </AlertDialogBox>
        )}
      </div>

      <div className='flex flex-col items-center mt-3'>
        <h2 className='text-gray-400'>
          {callActive ? 'Interview in Progress...' : 'Click mic to start interview'}
        </h2>
      </div>
    </div>
  )
}

export default Page
