'use client'

import React, { useState } from 'react'
import InterviewHeader from './_components/InterviewHeader'
import { InterviewDetailsContext } from '@/context/InterviewDetails'

const InterviewLayout = ({ children }) => {
  const [interviewDetail, setInterviewDetail] = useState()
  return (
    <InterviewDetailsContext.Provider value={{ interviewDetail, setInterviewDetail }}>
      <div>
        <InterviewHeader />
        {children}
      </div>
    </InterviewDetailsContext.Provider>
  )
}

export default InterviewLayout