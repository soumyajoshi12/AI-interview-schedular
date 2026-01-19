import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Check, Plus } from 'lucide-react'
import React from 'react'

const InterviewLink = ({interviewId}) => {
    console.log("int",interviewId)

  return (
    <div className='p-5 flex flex-col items-center justify-center w-full'>
        <div className='gap-3 flex flex-col items-center justify-center w-full'>
            <div className="bg-green-800 w-fit rounded-full p-4">
          <Check className="text-white w-8 h-8" />
        </div>
        <h1 className='text-lg font-bold'>Your AI Interview is Ready!</h1>
        <p className='text-sm fond-bold text-gray-700'>Share this link with your candidates to start the interview process</p>
        </div>
        <div className='mt-5 bg-white rounded-md p-5 w-full'>
            <div className='flex justify-between'>
                <h2 className='text-sm font-bold'>Interview Link</h2>
                <div className='text-xs bg-gray-200 px-3 py-1 rounded-full'>Valid for 30 days</div>
            </div>
            <div className='flex mt-3 gap-2'>
                <Input defaultValue={GetInterviewLink()} placeholder="Enter email..."/>
                <Button>Copy Link</Button>
            </div>
        </div>
        <div className='mt-5 bg-white rounded-md p-5 w-full'>
            <h2 className='text-sm font-bold'>Share via</h2>
            <div className='flex justify-between mt-2 gap-3'>
                <Button variant='outline' className='flex-1'>Email</Button>
                <Button variant='outline' className='flex-1'>Slack</Button>
                <Button variant='outline' className='flex-1'>Whatsapp</Button>
            </div>
        </div>
        <div className='mt-5 flex justify-between w-full gap-4'>
            <Button variant='outline' className='flex-1'><ArrowLeft/>Back to dashboard</Button>
            <Button className='flex-1'><Plus/>Create new interview</Button>
        </div>
    </div>
  )
}

export default InterviewLink