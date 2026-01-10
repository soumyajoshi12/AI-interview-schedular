'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export const UserDetailsContext = createContext()

export const useUser = () => {
  const context = useContext(UserDetailsContext) 
  return context
}