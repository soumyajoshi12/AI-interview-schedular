'use client'

import { InterviewDetailsContext } from '@/context/InterviewDetails'
import { Mic, Phone, Timer } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import Vapi from '@vapi-ai/web';
import AlertDialogBox from './_components/AlertDialogBox'

const page = () => {
    const { interviewDetail } = useContext(InterviewDetailsContext)
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_APIKEY);

    console.log("interviewDetails", interviewDetail)

    useEffect(() => {
        interviewDetail && startCall()
    }, [interviewDetail])

    const startCall = () => {
        const questionLists = interviewDetail?.interviewDetails?.questionList
            ?.map(item => item?.question)
            .join(', ')


        const assistantOptions = {
            name: "AI Recruiter",

            firstMessage:
                "Hi" + interviewDetail?.userName + ", how are you? Ready for your interview on" + interviewDetail?.interviewDetails?.jobPosition + "?",

            transcriber: {
                provider: "deepgram",
                model: "nova-2",
                language: "en-US",
            },

            voice: {
                provider: "playht",
                voiceId: "jennifer",
            },

            model: {
                provider: "openai",
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: `
Your job is to ask candidates provided interview questions, assess their responses.

You are an AI voice assistant conducting interviews.

Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your` + interviewDetail?.interviewDetails?.jobPosition + `interview. Let's get started with a few questions!"

Ask one question at a time and wait for the candidate's response before proceeding.
Keep the questions clear and concise.

Below are the questions, ask one by one:
Questions: `+ questionLists + `

If the candidate struggles, offer hints or rephrase the question without giving away the answer.
Example: "Need a hint? Think about how React tracks component updates!"

Provide brief, encouraging feedback after each answer.
Example: "Nice! That's a solid answer."

Keep the conversation natural and engaging—use casual phrases like:
"Alright, next up..." or "Let's tackle a tricky one!"
"Hmm, not quite! Want to try again?"

After 5–7 questions, wrap up the interview smoothly by summarizing their performance.
Example: "That was great! You handled some tough questions well. Keep sharpening your skills!"

End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"

Key Guidelines:
- Be friendly, engaging, and witty
- Keep responses short and natural, like a real conversation
- Adapt based on the candidate's confidence level
- Ensure the interview remains focused on React
        `.trim(),
                    },
                ],
            },
        };

        vapi.start(assistantOptions)

    }

    const stopInterview = () => {
        vapi.stop()
    }

    return (
        <div className='py-10 px-20'>
            <div className='flex w-full justify-between'>
                <h2 className='text-lg font-bold'>AI Interview session</h2>
                <span className='flex gap-2'><Timer />00:00</span>
            </div>
            <div className='grid grid-cols-2 flex gap-8 mt-5'>
                <div className='bg-gray-100 rounded-lg p-40 flex flex-col gap-2 items-center justify-center'><Image src='/login.png' alt='imgAI' width={100} height={100} className='w-[70px] h-[70px] rounded-full object-fit' />
                    <h2>AI Recruiter</h2>
                </div>
                <div className='bg-gray-100 rounded-lg p-40 flex-col flex items-center justify-center'><div className='text-lg flex items-center justify-center text-white bg-gray-900 w-[70px] h-[70px] rounded-full'>{interviewDetail?.userName[0]}</div><h2>{interviewDetail?.userName}</h2></div>
            </div>
            <div className='flex gap-15 mt-5 w-full justify-center'>
                <div className='w-[50px] h-[50px] bg-gray-800 text-white rounded-full flex items-center justify-center' ><Mic /></div>
                <AlertDialogBox stopInterview={() => stopInterview()}>

                    <div className='w-[50px] h-[50px] bg-red-800 text-white rounded-full flex items-center justify-center' ><Phone /></div>
                </AlertDialogBox>
            </div>
            <div className='flex flex-col items-center mt-3'>

                <h2 className='text-gray-400'>Interview In Progress...</h2>
            </div>
        </div>
    )
}

export default page