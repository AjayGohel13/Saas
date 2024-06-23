import React from 'react'
import { Loader2 } from 'lucide-react'
import { SignUp ,ClerkLoaded,ClerkLoading } from '@clerk/nextjs'
import Image from 'next/image'
const signUp = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 ">
      <div className='h-full bg-black hidden lg:flex items-center justify-center   '>
          <Image alt='logo image' src='/logo.jpeg' height={300} width={300} /> 
      </div>
      <div className="h-full lg:flex flex-col itce' justify-center px-4 ">
        <div className="text-center space-y-4 pt-16 ">
          <h1 className="font-bold text-3xl text-muted-foreground ">
            Welcome Back!
          </h1>
          <p className="text-base text-[#2E2A47] ">
            Log in or Create account to get back to your dashboard!
          </p>
          <div className='flex items-center justify-center mt-8'>
        <ClerkLoaded>
          <SignUp path='/sign-up' />
        </ClerkLoaded>
        <ClerkLoading>
          <Loader2 className='animate-spin text-muted-foreground '/>
        </ClerkLoading>
          </div>
        </div>
      </div>
    </div>
  )
}

export default signUp
