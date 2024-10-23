'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { usePathname, useSearchParams } from 'next/navigation'

function layout({children}) {
  const userData = useSelector((state) => state.auth.userData)

  // when after order click on "View orders", in setting page is orders but button in edit, same for reload page, maybe make setting dynamical route
    const pathname = usePathname()
    const searchParams = useSearchParams()
    console.log(pathname, searchParams)
    useEffect(() => {
      if (pathname === '/settings/orders'){
        setActive('orders')
      } else if(pathname === '/settings/favourites') {
        setActive('favourites')
      } else {
        setActive('edit')
      }
    }, [pathname, searchParams])

    const [isActive, setActive] = useState('')

    let {fullName} = userData
    
    let avatarInitials = fullName?.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')
    const activeStyle = 'bg-orange_main text-white after:"" after:w-0 after:h-0 after:border-[10px] after:border-t-orange_main after:border-r-transparent after:border-l-transparent after:border-b-transparent after:bottom-[0px] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:translate-y-full'
  return (
    <div className='className="w-full h-full max-w-[904px] min-h-full bg-white border border-[#E4E4E4] drop-shadow-md m-auto flex flex-col justify-center items-center'>
        <div className='h-[88px] w-[88px] max-w-[88px] max-h-[88px] rounded-[100%] mt-[62px] bg-select-border flex items-center justify-center'>
            <div className='text-[#101010] py-2 px-3 text-2xl leading-6 text-center'>{avatarInitials || 'TK'}</div>
        </div>
        <p className='text-[#101010] text-[22px] mt-2 leading-[32.31px]'>{fullName || "Tony Kest"}</p>
        <div className='flex text-center mt-[22px]'>
          <div  className={`border-2 border-r-0 flex justify-center items-center border-[#DEDEE0] h-[74.11px] relative w-[163px] ${isActive == 'edit' ? activeStyle : 'bg-white text-black'}`}>
            <Link href='/settings/edit_account' onClick={() => setActive('edit')}>
              Edit account
            </Link>
          </div>
          <div  className={`border-2 border-r-0 flex justify-center items-center border-[#DEDEE0] h-[74.11px] relative w-[163px] ${isActive == 'orders' ? activeStyle : 'bg-white text-black'} `}>
            <Link href='/settings/orders' onClick={() => setActive('orders')}>
              Orders History
            </Link>
          </div>
          <div  className={`border-2 flex justify-center items-center border-[#DEDEE0] h-[74.11px] relative w-[163px] ${isActive == 'favourites' ? activeStyle : 'bg-white text-black'} `}>
            <Link href='/settings/favourites' onClick={() => setActive('favourites')}>
              Favourites
            </Link>
          </div>
        </div>
        {children}
    </div>
  )
}

export default layout
