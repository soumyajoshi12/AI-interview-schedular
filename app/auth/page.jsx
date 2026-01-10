'use client';
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { supabase } from '../services/supabaseClient';

const Login = () => {

    const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })

    if (error) {
      console.error('Google login error:', error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-6">
      
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-widest 
                     bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900
                     bg-clip-text text-transparent">
        SCHEDULE<span className="text-gray-400">-</span>INTERVIEW
      </h1>

      <div className="flex flex-col items-center gap-1 text-center border p-4">
        <Image src="/login.png" alt="login" width={450} height={300} />

        <h2 className="text-xl md:text-1xl font-semibold text-gray-900">
          Welcome👋
        </h2>

        <p className="text-sm md:text-xs text-gray-600 max-w-sm">
          Sign in securely using Google authentication to schedule and manage
          your interviews effortlessly.
        </p>

        <Button onClick={handleGoogleLogin} className='m-4 w-full'>Login with google</Button>
      </div>

    </div>
  )
}

export default Login
