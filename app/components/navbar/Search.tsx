'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import {BiSearch} from 'react-icons/bi'
import qs from 'query-string';

const Search = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [userQuery, setUserQuery] = useState<string>();
  const pathname = usePathname();
  const isUserPage = pathname === '/user';

  const handleClick = useCallback(() => {
    let currentQuery = {};
        
    const updatedQuery: any = {
      ...currentQuery,
      policy: userQuery
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });

    router.push(url);
        
  }, [ router]);

  if (isUserPage) {
    return (<div></div>);
  }

  return (
    <div
      className='
        border-[1px]
        w-full
        md:w-2/5
        py-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
        pr-5
      '
    >
      <div
        className='
          flex
          flex-row
          items-center
          justify-between
          w-full
          outline-none
        '
      >
              
        <input
          className="hidden
          sm:block
          text-sm
          font-semibold
          px-6
          flex-1
          text-center
          w-full
          flex-grow
          outline-none"
          placeholder="Search by Policy ID"
          onChange={(e) => setUserQuery(e.target.value)}
          value={userQuery}
        />
       
        <button
            onClick= {handleClick}
            className='
              p-2
              bg-rose-500
              rounded-full
              text-white
            '
          >
            <BiSearch size={18} />
        </button> 
          
        
        
      </div>  
      
    </div>
  )
}

export default Search