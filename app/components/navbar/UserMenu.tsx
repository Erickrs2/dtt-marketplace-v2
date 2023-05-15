'use client'

import React, { useCallback, useState } from 'react'
import {AiOutlineMenu} from 'react-icons/ai'
import MenuItem from './MenuItem'
import { CardanoWallet } from '@meshsdk/react';
import { useRouter } from 'next/navigation'

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback (() => {
      setIsOpen((value) => !value);
    },[]);

    const router = useRouter();

  return (
    <div className='relative '>
        <div className='flex flex-row items-center gap-3 '>
            <div
                onClick = {() => {}}
                className='
                    md:block
                    text-sm
                    py-3
                    px-4
                    rounded-full
                    cursor-pointer
                '
            >
               {/* Airbnb your home */}
               <CardanoWallet />
            </div>
            <div
                onClick= {toggleOpen}
                className='
                    p-4
                    border-[1px]
                    border-neutral-200
                    flex
                    flex-row
                    gap-3
                    rounded-full
                    cursor-pointer
                    hover:shadow-md
                    transition
                '
            >
                <AiOutlineMenu />
            </div>
            
        </div>
        {isOpen && (
            <div
                className='
                    absolute
                    rounded-xl
                    shadow-md
                    w-[40vw]
                    md:w-3/4
                    bg-white
                    overflow-hidden
                    right-0
                    top-22
                    text-sm
                '
            >
                <div className='flex flex-col cursor-pointer text-base'>
                    <>
                        <MenuItem
                            onClick={() => {router.push('/'); toggleOpen()}}
                            label='Buy NFTs'
                        />
                        <MenuItem
                            onClick={() => {router.push('/user'); toggleOpen()}}
                            label='List my NFTs'
                        />
                        <MenuItem
                            onClick={() => {router.push('https://digitaltwintech.com.br'); toggleOpen()}}
                            label='Mint NFTs'
                        />
                        
                    </>
                </div>
                
            </div>
        )}
    </div>
  )
}

export default UserMenu