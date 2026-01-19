'use client'

import { supabase } from '@/app/services/supabaseClient'
import { Button } from '@/components/ui/button'
import { useUser } from '@/context/UserDetailContext'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const QuestionList = ({ formData ,goToFinalStep}) => {

  const [loading, setloading] = useState(false)
  const [questionList, setQuestionList] = useState([])
  const user = useUser()

  useEffect(() => {
    if (formData) {
      GenerateQuestionList()
    }
  }, [formData])

  const GenerateQuestionList = async () => {
    setloading(true)

    try {
      const response = await axios.post('/api/ai-model', {
        ...formData
      })

      if (response.data?.code === 429) {
        console.error('AI Rate Limit:', response.data)
        setloading(false)
        return
      }

      // OpenRouter returns: { role, content }
      const rawContent = response?.data?.content

      if (!rawContent) {
        throw new Error("Empty AI response")
      }

      // ✅ Extract JSON array safely
      const jsonMatch = rawContent.match(/\[[\s\S]*\]/)

      if (!jsonMatch) {
        throw new Error("No JSON found in AI response")
      }

      const parsedQuestions = JSON.parse(jsonMatch[0])

      setQuestionList(parsedQuestions)

    } catch (error) {
      console.error('Request failed:', error)
    } finally {
      setloading(false)
    }
  }

  const interview_id = uuidv4()

  const onFinish = async () => {
    const { data, error } = await supabase
      .from('Interviews')
      .insert([
        { ...formData, questionList: questionList, userEmail: user?.email, interview_id: interview_id }
      ])
      .select()

      if(data){
        goToFinalStep(interview_id)
      }

    console.log("dataasssssss", data)
  }


  return (
    <div>
      {loading &&
        <div className='border rounded-md bg-white flex p-4 gap-4 mt-5 '>
          <Loader2Icon className='animate-spin' />
          <div>
            <h3 className='font-bold' >Generating Interview Questions</h3>
            <p className='text-sm'>Our AI is crafting personalised questions based on your job position.</p>
          </div>
        </div>
      }

      {!loading && questionList.length > 0 && (
        <div className="flex flex-col gap-3 mt-5">
          {questionList.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <p className="font-semibold">
                Q{index + 1}. {item.question}
              </p>

              {item.type && (
                <span className="text-xs text-gray-500">
                  Type: {item.type}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <Button onClick={() => onFinish()} >Finish</Button>
    </div>
  )
}

export default QuestionList