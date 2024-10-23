'use client'
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Favorite_CTA from './Favorite_CTA'
import { addFavorite, deleteFavorite, getFavorite } from '../../state/slice/UserSlice'
import Added from '../../../../public/added.svg'
import Skeleton from 'react-loading-skeleton'
import { Bounce, Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addItemToCart } from '../../state/slice/CartSlice'
import { useRouter } from 'next/navigation'

export const CloseButton = ({closeToast}) => (
    <Image
        onClick={closeToast}
        src="/close.svg"
        alt="close Icon"
        width={20}
        height={20}
        className='fill-dark_2 cursor-pointer pointer-events-auto mr-[25px]'
    />
);

const ModalItem = (props) => {
    const itemInfo = useSelector((state) => state.fetch.itemInfo)
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const isLoading = useSelector((state) => state.fetch.isLoading)
    const favorites = useSelector((state) => state.user.favorites)

    const router = useRouter()

    const {picture, title, price, description, id} = itemInfo
    
    const isLiked = favorites.some(product => product.id === id);
    
    const [isOpen, setIsOpen] = useState(false)
    const [quantity, setQuantity] =useState(1)
    let [totalPrice, setTotal] =useState(price)

    const dispatch = useDispatch()

    const closeModal = () => {
        setIsOpen(false)
    };

    useEffect(() => {
        setTotal(price * quantity);
    }, [price, quantity]);
    
    const increase = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };
    
    const decrease = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };
    const [liked, setLiked] = useState(isLiked);

    useEffect(() => {
        setLiked(isLiked); // оновлюємо локальний стан після зміни стану з Redux
    }, [isLiked]);

    const handleLike = (id) => {
        if (!isLoggedIn) {
            setIsOpen(true);
        } else {
            if (liked) {
                dispatch(deleteFavorite(id));
                setLiked(false);  // локальне оновлення
                dispatch(getFavorite());
            } else {
                dispatch(addFavorite(id));
                setLiked(true);  // локальне оновлення
                dispatch(getFavorite());
            }
            // dispatch(getFavorite());
        }
    }

    const notify = () => {  
        toast.success(<p className='font-medium text-[#101010] text-lg leading-[26.44px]'>The <span className='text-lg font-bold leading-[35.25px]'>{title}</span> is successfully added to cart</p>, {
          position: "top-right",
          autoClose: 3000,
          closeButton: true,
          theme: 'colored',
          transition: Slide,
          hideProgressBar: true,
          icon: false,
          closeButton: CloseButton,
          pauseOnFocusLoss: true,
        });
      };

      const handleAddToCart = (isLoggedIn) => {
        const itemForCart = {...itemInfo}
        itemForCart['quantity'] = quantity
        itemForCart['totalPrice'] = totalPrice
        
        dispatch(addItemToCart({ item: itemForCart, isLoggedIn }));

        props.close()
        notify();
      }

      const handleBuyNow = () => {
        if (isLoggedIn) {
            handleAddToCart(isLoggedIn)
            router.push('/cart')
        } else {
            setIsOpen(true)
        }
      }
    return (
        <div>
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
                    className="w-full max-w-[1003px] h-full max-h-[697px] rounded duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                >
                    <div className='bg-white'>
                        <DialogTitle as="h3" className="text-center text-dark_1 relative">
                            <Image
                            onClick={props.close}
                            className='absolute right-[35px] top-[35px] cursor-pointer'
                            src='/close.svg'
                            alt='Close button'
                            width={18}
                            height={18}
                            />
                        </DialogTitle>
                        <div className='flex flex-col px-[87px] pt-[141px] pb-[127px]'>
                            <div className='flex'>
                                {
                                    picture ? (
                                    <div className='border border-[#E4E4E4] rounded-[3px] max-w-[411px] max-h-[300px] items-center justify-center flex '>
                                        <Image
                                            className='max-w-[401px] max-h-[296px] m-1 rounded-[3px] object-contain'
                                            src={picture}
                                            alt={title || 'Image description'}
                                            width={401}
                                            height={296}
                                        />
                                    </div>
                                ) : (
                                <p>Loading image...</p>
                                )}
                                {isLoading && (
                                        <Skeleton
                                            circle
                                            height="100%"
                                            containerClassName="avatar-skeleton"
                                        />
                                    )}
                                <div className='flex flex-col ml-[38.42px] max-w-[321px] text-dark_2'>
                                    <p className='text-dark_1 font-bold text-lg leading-[26.44px] tracking-[0.5px]'>
                                        {title}
                                    </p>
                                    <p className=' text-[15px] leading-[22.03px] mt-[10px]'>
                                        {description}
                                    </p>
                                    <p className='text-dark_1 text-sm font-medium leading-[26px] mt-[30px]'>
                                        PRICE <span className='ml-[154px] text-dark_1 font-bold text-lg leading-[26.44px] tracking-[0.5px]'>${price}</span>
                                    </p>
                                    <div className='flex max-w-[81px] justify-between mt-[25px]'>
                                        <button 
                                            className='w-full h-full max-w-[26px] max-h-[26px] rounded-[100%] bg-dark_3 flex justify-center items-center'
                                            onClick={() => decrease()}
                                            disabled={quantity <= 0}
                                        >
                                            -
                                        </button>
                                        <div className='text-[15px] leading-[22.03px] text-black'>
                                            {quantity}
                                        </div>
                                        <button 
                                            className='w-full h-full max-w-[26px] max-h-[26px] rounded-[100%] bg-dark_3 flex justify-center items-center'
                                            onClick={() => increase()}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className='mt-[50px]'>
                                        <p>Items:    <span className='text-dark_1 ml-8 font-bold text-lg leading-[26.44px]'>{quantity}</span></p>
                                        <p>Total:    <span className='text-dark_1 ml-[37px] mt-[5px] font-bold text-lg leading-[26.44px]'>${totalPrice}</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row mt-[71px]'>
                                <Button
                                    // onClick={notify}
                                    onClick={() => handleAddToCart(isLoggedIn)}
                                    className="text-orange_main bg-white py-[9px] px-[70px] mr-[35px] text-xs font-medium leading-[17.63px] tracking-[0.4px] border-[2px] border-orange_main rounded hover:opacity-80"
                                >
                                    ADD TO CART
                                </Button>
                                {
                                    liked 
                                    ?
                                    <Button
                                        className="text-white bg-orange_main py-[9px] flex items-center px-[29px] mr-[87px] text-xs font-medium leading-[17.63px] tracking-[0.4px] border-[2px] border-orange_main rounded hover:opacity-80"
                                    >
                                        ADDED TO FAVORITES
                                        <Added width={19} height={13} className='ml-[14px]'/>
                                        {/* {
                                            isLoggedIn === false && isOpen && <Favorite_CTA close={closeModal} isOpen={isOpen}/>
                                        } */}
                                    </Button>
                                    :
                                    <Button
                                        onClick={() => handleLike(id)}
                                        className="text-orange_main bg-white py-[9px] px-[54px] mr-[87px] text-xs font-medium leading-[17.63px] tracking-[0.4px] border-[2px] border-orange_main rounded hover:opacity-80"
                                    >
                                        ADD TO FAVORITES
                                        {/* {
                                            isLoggedIn === false && isOpen && <Favorite_CTA close={closeModal} isOpen={isOpen}/>
                                        } */}
                                    </Button>
                                    

                                }
                                <Button
                                    onClick={() => handleBuyNow()}
                                    className="text-white bg-orange_main py-[9px] px-[82px] text-xs leading-[17.63px] tracking-[0.4px] rounded hover:opacity-80"
                                    >
                                    BUY NOW
                                </Button>
                                {
                                    isLoggedIn === false && isOpen && <Favorite_CTA close={closeModal} isOpen={isOpen}/>
                                }
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

export default ModalItem