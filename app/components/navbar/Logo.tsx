'use client'

import Image from 'next/image'
import {useRouter} from 'next/navigation'
import React from 'react'

const Logo = () => {
  const router = useRouter();      

  return (
    <Image 
      onClick={() => router.push('/')}
      alt='Logo'
      className='hidden md:block cursor-pointer' 
      height='45'
      width='45'
      src='/images/logo.png'
    />
  )
}

export default Logo