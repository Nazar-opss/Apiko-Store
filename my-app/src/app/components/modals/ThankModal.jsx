import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import Image from 'next/image'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../state/slice/ModalSlice'
import Link from 'next/link'

function ThankModal(props) {
    const isOpen = useSelector((state) => state.modal.isOpen)
    const componentName = useSelector((state) => state.modal.componentName)
  
    const dispatch = useDispatch()
    
  return (
    <Dialog
    open={props.isOpen}
    as="div"
    className=" rounded-lg relative z-10 focus:outline-none"
    onClose={props.close}
  >
    <DialogBackdrop className="fixed inset-0 bg-black/70" />
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto  ">
      <div className="flex flex-col min-h-full items-center justify-center p-4 ">
        <DialogPanel   
          transition
          className="w-full max-w-md rounded-xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
        >
          <div className='bg-white '>
            <DialogTitle as="h3" className="text-center text-dark_1 relative">
              <Image
                onClick={props.close}
                className='absolute right-[32px] top-[32px] cursor-pointer'
                src='/close.svg'
                alt='Close button'
                width={18}
                height={18}
              />
            </DialogTitle>
            <div className='pl-[66px] pr-[67px] pb-[118px] flex items-center pt-[69px]'>
                <div className=' flex flex-col justify-center items-center text-center tracking-[0.4px]'>
                    <p className='text-2xl text-[#101010] font-medium leading-[35.25px] '>
                        Thank you for your purchase
                    </p>
                    <p className='text-[15px] leading-[25.03px] text-dark_2 mt-[10px]'>
                        We will send you a notification when your order arrives to you
                    </p>
                    <div className='font-medium text-sm leading-6 h-[90px] flex flex-col justify-between mt-[38px]' >
                      <Link href='/'>
                          <Button
                            className="text-white bg-orange_main w-full py-1.5 px-[47.5px] rounded hover:opacity-80"
                          >
                            Continue shopping
                          </Button>                        
                      </Link>
                      <Link href='/settings/orders'>
                        <Button
                          className="text-orange_main bg-white w-full py-1.5 px-[47.5px] border-[1px] border-orange_main rounded hover:opacity-80"
                        >
                          View order history
                        </Button>
                      </Link>
                    </div>
                </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
  )
}

export default ThankModal