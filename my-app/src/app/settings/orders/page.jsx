'use client'
import ModalOrder from '@/app/ModalOrder'
import { closeModal, openModal } from '@/app/state/slice/ModalSlice'
import { getOrders } from '@/app/state/slice/UserSlice'
import { format } from 'date-fns'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Orders() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const orders = useSelector((state) => state.user.orders)
  const isOpen = useSelector((state) => state.modal.isOpen)
  const componentName = useSelector((state) => state.modal.componentName)
  const openOrderId = useSelector((state) => state.modal.orderId) 



  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getOrders())
    }
  },[])

  return (
    <div className='w-[100%] max-w-[486px] pt-[58px] flex grow flex-col items-center'>
      {
        orders.length > 0 ? 
        orders?.map(elem => {
          return (
            <div key={elem.id} className='w-[100%] flex justify-between border border-[#ECEEF0] rounded shadow-item-shadow p-[20px] mb-[20px] text-[15px] leading-[22.03px] text-dark_2'>
              <div className='flex flex-col'>
                <p>
                  Order ID: <span onClick={() => dispatch(openModal({componentName: 'orderDetails', orderId: elem.id}))} className='font-semibold ml-[15px] text-dark_1 decoration-blue_btn'>{elem.id}</span>
                </p>
                {
                  isOpen && componentName === 'orderDetails' && openOrderId === elem.id  && 
                  <ModalOrder 
                    isOpen={isOpen} 
                    id={elem.id} 
                    close={() => dispatch(closeModal())} 
                  />
                }
                <p>
                  Date: <span className='font-semibold ml-[39px] text-dark_1'>{format(new Date(elem.createdAt), 'dd.MM.yyyy')}</span>
                </p>
              </div>
              <p>Price <span className='font-semibold ml-[15px] text-dark_1'>$ {elem.totalPrice}</span></p>
            </div>
          )
        })
        :
        <p>Currently you have no orders</p>
      }
    </div>
  )
}

export default Orders