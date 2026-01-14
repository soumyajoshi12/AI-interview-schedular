"use client"

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import InterviewForm from './_components/InterviewForm'
import { Progress } from '@/components/ui/progress'
import QuestionList from '../_components/QuestionList'

const page = () => {
    const [progress, setProgress] = useState(1)
    const [formData, setformData] = useState();
    const router = useRouter()

    const onHandleInputChange = (field, value) => {
        setformData(prev => ({
            ...prev,
            [field]: value
        }))

        console.log("formData :", formData)
    }

    useEffect(() => {
        console.log("Updated formData:", formData)
    }, [formData])

    const GotoNext = () => {
        if(!formData?.jobPosition || !formData?.jobDescription || !formData?.duration || !formData?.type){
            return ;
        }
        setProgress(progress+1)
    }

    return (
        <div className='p-7'>
            <div className='flex gap-4 mt-5 item-center bg-red'>
                <ArrowLeft className='cursor-pointer' onClick={() => router.push('/dashboard')} />
                <h1 className='text-lg font-bold'>Create New Interview</h1>
            </div>
            <Progress value={progress * 33.33} className="w-full mt-5" />
            {progress === 1 && (
                <InterviewForm
                    onHandleInputChange={onHandleInputChange}
                    GotoNext = {GotoNext}
                />
            )}

            {progress === 2 && (
                <QuestionList
                    formData={formData}
                />
            )}
        </div>
    )
}

export default page