import { Check, Clock } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className='bg-green-600 w-fit p-4 rounded-full'><Check/></div>
        <h1 className='font-bold text-lg'>Interview Completed!</h1>
        <p className='text-xs text-gray-500'>Thankyou for participating in the AI-driven interview with Schedule Interview</p>
        <Image src='/completed.avif' alt='completed' width={300} height={300} />
        <div className='border rounded p-4'>
            <h1 className='font-bold text-lg'>What's next?</h1>
            <p className='text-xs text-gray-500 mt-3'>The recruiter will review your interview responses and will contact you regarding the next steps. </p>
            <p className='text-xs text-gray-500 flex gap-1 item-center justify-center'><Clock className="w-4 h-4"/>Response within 2-3 business days</p>
        </div>
    </div>
  )
}

export default page