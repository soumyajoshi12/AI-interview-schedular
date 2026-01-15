'use client'

import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const QuestionList = ({formData}) => {

  const [loading, setloading] = useState(false)

    useEffect(()=>{
        if(formData){
            GenerateQuestionList()
        }
    },[formData])

    const GenerateQuestionList = async () => {
      setloading(true)
      try {
        const response = await axios.post('/api/ai-model',{
          ...formData
        })
        console.log(response)
        setloading(false)
      } catch (error) {
        console.log('error:',error)
      setloading(false)
      }
    }

  return (
    <div>
      {loading &&
      <div className='border rounded-md bg-white flex p-4 gap-4 mt-5 '>
        <Loader2Icon className='animate-spin'/>
        <div>
          <h3 className='font-bold' >Generating Interview Questions</h3>
          <p className='text-sm'>Our AI is crafting personalised questions based on your job position.</p>
        </div>
      </div>
      }
    </div>
  )
}

export default QuestionList