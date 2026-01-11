import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'


const InterviewForm = () => {
    return (
        <div className='mt-4 flex flex-col gap-5 bg-white p-4 rounded-lg'>
            <div className='flex flex-col gap-2'>
                <h3 className='text-sm font-semibold'>Job Position</h3>
                <Input type='text' placeholder="eg. Frontend Engineer" />
            </div>
            <div className='flex flex-col gap-2'>
                <h3 className='text-sm font-semibold'>Job Description</h3>
                <Textarea placeholder="Enter your job description.." />
            </div>
            <div className='flex flex-col gap-2'>
                <h3 className='text-sm font-semibold'>Job Duration</h3>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent className='w-full'>
                        <SelectItem value="15 Min">15 Min</SelectItem>
                        <SelectItem value="30 Min">30 Min</SelectItem>
                        <SelectItem value="45 Min">45 Min</SelectItem>
                        <SelectItem value="60 Min">60 Min</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default InterviewForm