'use client'

import React, { createContext, useContext } from 'react'

export const InterviewDetailsContext = createContext()

export const useInterview = () => {
  const context = useContext(InterviewDetailsContext) 
  return context
}