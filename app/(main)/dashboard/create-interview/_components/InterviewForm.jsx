"use client"

import { JOB_TYPES } from '@/app/services/Constants'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'


const InterviewForm = ({ onHandleInputChange, GotoNext }) => {

    const [selectedTypes, setSelectedTypes] = useState([])

    useEffect(() => {
        if (selectedTypes.length > 0) {
            onHandleInputChange('type', selectedTypes)
        }
    }, [selectedTypes])


    return (
        <div className='mt-5 flex flex-col gap-5 bg-white p-4 rounded-lg'>
            <div className='flex flex-col gap-2'>
                <h3 className='text-sm font-semibold'>Job Position</h3>
                <Input type='text' placeholder="eg. Frontend Engineer" onChange={(e) =>
                    onHandleInputChange('jobPosition', e.target.value)
                } />
            </div>
            <div className='flex flex-col gap-2'>
                <h3 className='text-sm font-semibold'>Job Description</h3>
                <Textarea placeholder="Enter your job description.." onChange={(e) =>
                    onHandleInputChange('jobDescription', e.target.value)
                } />
            </div>
            <div className='flex flex-col gap-2'>
                <h3 className='text-sm font-semibold'>Job Duration</h3>
                <Select onValueChange={(value) => onHandleInputChange('duration', value)}>
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
            <div className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold">Job Types</h3>

                <div className="flex gap-3 flex-wrap mt-2">
                    {JOB_TYPES.map(({ type, icon: Icon }, index) => {
                        const isSelected = selectedTypes.includes(type)

                        return (
                            <div
                                key={index}
                                onClick={() =>
                                    setSelectedTypes(prev =>
                                        prev.includes(type)
                                            ? prev.filter(t => t !== type)
                                            : [...prev, type]
                                    )
                                }
                                className={`
            flex items-center gap-2 cursor-pointer
            px-4 py-2 rounded-2xl border
            transition-all
            ${isSelected
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white border-gray-300 hover:bg-secondary'}
          `}
                            >
                                <Icon className="h-4 w-4" />
                                <span className="text-sm">{type}</span>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='flex justify-end mt-5'>

                <Button className='w-[180px]' onClick={() => GotoNext()}>Generate Questions</Button>
            </div>
        </div>
    )
}

export default InterviewForm