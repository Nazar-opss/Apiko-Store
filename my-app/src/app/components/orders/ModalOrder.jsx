'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../../state/slice/UserSlice'
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import Image from 'next/image'
import OrderItem from './OrderItem'
import LoaderLine from '../loader/Loader'

function ModalOrder(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOrderDetails(props.id))
    },[])
    const isLoading = useSelector((state) => state.user.isLoading)
    const orderDetails = useSelector((state) => state.user.orderDetails)

    const {createdAt} = orderDetails
    const {address, city, country} = orderDetails?.shipment || {}
    const formattedDate = createdAt 
        ? `${String(new Date(createdAt).getDate()).padStart(2, '0')}/${
            String(new Date(createdAt).getMonth() + 1).padStart(2, '0')}/${
            new Date(createdAt).getFullYear()}`
        : 'Date not available';

  return (
    <div className='relative'>

      <LoaderLine isLoading={isLoading}/>
    <Dialog
      open={props.isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={props.close}
    > 
    <DialogBackdrop className="fixed inset-0 bg-black/70" />
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
      <div className="flex flex-col min-h-full items-center justify-center p-4 ">
        <DialogPanel   
          transition
          className="w-full max-w-[904px] rounded duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
        >
          <div className='bg-white '>
            <DialogTitle as="h3" className="text-center text-dark_1 relative">
              <p className='text-2xl leading-[35.25px font-medium text-dark_1 pt-[50px]'>Order details ID {orderDetails.id}</p>
              <Image
                onClick={props.close}
                className='absolute right-[56px] top-[56px] cursor-pointer'
                src='/close.svg'
                alt='Close button'
                width={22}
                height={22}
              />
            </DialogTitle>
            <div className='pl-[173px] pr-[172px] pb-[85px] pt-[50px]'>
                <div className='flex flex-col justify-center items-center tracking-[0.4px]'>
                    <div className='w-full' >
                        {
                            orderDetails?.items?.map((elem) => {
                                return(
                                    <OrderItem
                                        key={elem.product.id}
                                        id={elem.product.id}
                                        picture={elem.product.picture}
                                        title={elem.product.title}
                                        price={elem.product.price}
                                        totalPrice={elem.orderedPrice}
                                        quantity={elem.quantity}
                                    />
                                )
                            })
                        }
                    </div>
                    <div className='w-full flex justify-between'>
                        <div className='flex flex-col'>
                            <p className='text-[15px] leading-[22.03px] text-dark_2'>Date:<span className='text-dark_1 font-medium ml-[44px]'>{formattedDate}</span></p>
                            <p className='text-[15px] leading-[22.03px] text-dark_2'>Address:<span className='text-dark_1 font-medium ml-[20px]'>{address + ', ' + city + ', ' + country}</span></p>
                        </div>
                        <div className='flex flex-col'>
                        <p className='text-[15px] leading-[22.03px] text-dark_2'>Items:<span className='text-dark_1 font-medium ml-[20px]'>{orderDetails?.items?.reduce((total, item) => total + item.quantity, 0) || 0}</span></p>
                        <p className='text-[15px] leading-[22.03px] text-dark_2'>Total:<span className='text-dark_1 font-medium ml-[25px]'>{orderDetails?.totalPrice || 0}</span></p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
    </div>
  )
}

export default ModalOrder