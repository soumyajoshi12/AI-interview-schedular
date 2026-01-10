"use client"
import React from 'react'
import Image from 'next/image'
import { useUser } from '@/context/UserDetailContext'

const WelcomeContainer = () => {
    const user = useUser();
    console.log("puser",user?.user)
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm flex items-center justify-between">
      
      {/* Text Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Welcome Back, Soumya!
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          AI-Driven Interviews, Hassle-Free Hiring
        </p>
      </div>

      <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
        {
            user?.user?.picture &&
            <Image
          src={user?.user?.picture}
          alt="User Avatar"
          width={48}
          height={48}
          className="object-cover"
        />}
      </div>

    </div>
  )
}

export default WelcomeContainer
