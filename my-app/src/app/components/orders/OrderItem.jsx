'use client'
import Image from 'next/image'
import React from 'react'

function OrderItem(props) {
    const {picture, title, price, id, quantity, totalPrice} = props
  return (
    <div className='flex rounded border max-w-[559px] max-h-[160px] w-full h-full mb-[23px] border-[#ECEEF0]'>
        <div className='flex items-center w-full max-w-[125px] h-[122px] mt-[18px] mb-[19.19px] ml-4'>
            <Image
                src={picture}
                alt={title}
                width={125}
                height={122}
            />
        </div>
        <div className='flex justify-between w-full'>
            <div className='flex flex-col ml-5 mt-[25px]' >
                <p className='text-sm leading-[26px] text-[#101010] w-[270px] max-w-[270px] truncate ...'>{title}</p>
                <div className='flex mt-[10px]'>
                    <p className='text-[15px] leading-[22.03px] text-dark_2'>Items:<span className='text-dark_1 font-medium ml-[20px]'>{quantity}</span></p>
                </div>
            </div>
            <div className='flex border-l-[1px] border-[#ECEEF0] h-[103px] mr-[25px] mt-[19px]'></div>
        </div>
        <div className=' flex flex-col justify-center mr-[18px] left-0'>
            <p className='text-[15px] leading-[22.03px] text-dark_1'>Price:</p>
            <p className='text-lg leading-[26.44px] font-bold tracking-[0.5px] mt-[7px] min-w-[77px]'>${totalPrice}</p>
        </div>
    </div>
  )
}

export default OrderItem