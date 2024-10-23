'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import TrashIcon from '../../../../public/trashIcon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { removeItemFromCart } from '../../state/slice/CartSlice'

function CartItem(props) {
    const dispatch = useDispatch()

    const {picture, title, price, id, quantity, totalPrice} = props
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const [quantityIn, setQuantity] =useState(quantity)
    let [totalPriceIn, setTotal] =useState(totalPrice)

    const handleDeleteFromCart = (id) => {
        dispatch(removeItemFromCart({ id, isLoggedIn }));
    }

    useEffect(() => {
        setTotal(price * quantityIn);
    }, [price, quantityIn]);

    const increase = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };
    
    const decrease = () => {
        if (quantityIn > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

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
                <div className='flex mt-7 '>
                    <TrashIcon onClick={() => handleDeleteFromCart(id)} className='cursor-pointer w-full h-full max-w-[26px] max-h-[26px]'/>
                    <div className='flex w-full max-w-[81px] ml-5 justify-between items-center'>
                        <button 
                            className='w-full h-full max-w-[26px] max-h-[26px] rounded-[100%] bg-dark_3 flex justify-center items-center'
                            onClick={() => decrease()}
                            disabled={quantityIn <= 0}
                        >
                            -
                        </button>
                        <div className='text-[15px] leading-[22.03px] text-black'>
                            {quantityIn}
                        </div>
                        <button 
                            className='w-full h-full max-w-[26px] max-h-[26px] rounded-[100%] bg-dark_3 flex justify-center items-center'
                            onClick={() => increase()}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex border-l-[1px] border-[#ECEEF0] h-[103px] mr-[25px] mt-[19px]'></div>
        </div>
        <div className=' flex flex-col justify-center mr-[18px] left-0'>
            <p className='text-[15px] leading-[22.03px] text-dark_1'>Price:</p>
            <p className='text-lg leading-[26.44px] font-bold tracking-[0.5px] mt-[7px] min-w-[77px]'>${totalPriceIn}</p>
        </div>
    </div>
  )
}

export default CartItem