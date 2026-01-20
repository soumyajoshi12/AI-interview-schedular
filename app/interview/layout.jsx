import React from 'react'
import InterviewHeader from './_components/InterviewHeader'

const InterviewLayout = ({children}) => {
  return (
    <div>
      <InterviewHeader/>
        {children}
    </div>
  )
}

export default InterviewLayout