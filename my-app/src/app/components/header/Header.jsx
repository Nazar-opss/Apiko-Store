'use client'
import { useEffect, useState } from 'react'
import styles from './Header.module.css'
import Image from 'next/image'
import Register from '../auth/Register'
import Login from '../auth/Login'
import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from '@headlessui/react'
import { logOut } from '../../state/slice/AuthSlice'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null);
  // const [cartItems, setCartItems] = useState()
  
  const authCheck = useSelector((state) => state.auth.accessToken)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const userData = useSelector((state) => state.auth.userData)
  const cartItems = useSelector((state) => state.cart);

  let {fullName, email, phoneNumber, phone, id} = userData

  const dispatch = useDispatch()
  const router = useRouter()

  const openModal = (content) => {
    setModalContent(content)
    setIsOpen(true)
  };

  const closeModal = () => {
    setIsOpen(false)
    setModalContent(null)
  };
  
//   useEffect(() => {
//     let cartItemsCopy = isLoggedIn
//     ? sessionStorage.getItem('itemsLogged')
//     : sessionStorage.getItem('itemsAny');
    
//   if (cartItemsCopy) {
//     cartItemsCopy = JSON.parse(cartItemsCopy);
//     setCartItems(cartItemsCopy);
//     console.log(cartItemsCopy);
//   }
// }, [isLoggedIn]);  

  const handleLogOut = () => {
    dispatch(logOut())
    router.push('/')
  }

  const avatarInitials = fullName?.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')

  // console.log(authCheck)
  return (
    <div className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.header_buttons}>
          <Link href="/" className='flex items-center'> 
            <Image src="/logo.svg" alt="Apiko Logo" width={102} height={42} />
          </Link>
          <div className={styles.header_links}>
          <Link href='/settings/favourites' className='flex items-center mr-[25px]'>
            <Image
              src="/like.svg"
              alt="Like Icon"
              width={18}
              height={18}
            />
          </Link>
            <Link href="/cart" className='flex items-center relative'> 
              <Image src="/basket.svg" alt="Basket Icon" width={18} height={18} />
              {
                cartItems?.length > 0 
                ? <p className='absolute right-[-6px] top-[6px] flex justify-center items-center text-center w-[13px] h-[13px] bg-orange_main border-[1.5px] border-[#110F21] rounded-[100%]'><span className='text-[9px] font-semibold leading-[13.22px] tracking-[0.4px]'>{cartItems?.length}</span></p>
                : ""
              }
            </Link>
          </div>
        </div>
        {
          isLoggedIn === true 
          ? 
            <div className='flex items-center ml-8 justify-center text-white text-xs leading-[17.63px] '>
              <p className='truncate'>Welcome, {fullName}!</p>
              <Menu>
                <MenuButton
                  className='ml-4 flex justify-center items-center '
                >
                  <div className=' h-full max-w-[40px] max-h-[38px] rounded-[100%] bg-select-border flex  border-2 border-orange_main justify-center'>
                    <div className='text-black py-2 px-3 text-sm'>{avatarInitials}</div>
                  </div>
                  <Image
                    className='ml-[11px]' 
                    src="/arrow_down.svg"
                    alt="Arrow Down"
                    width={18}
                    height={13}
                  />
                </MenuButton>
                <MenuItems
                  transition
                  anchor="bottom end"
                  className="w-[234px] mt-[19px] flex drop-shadow-md flex-col origin-top-right rounded-lg border border-white bg-white text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                  <div className='flex flex-col py-[17px] px-4 text-[13px] leading-[19px] tracking-wide '>
                    <p className='text-dark_1 truncate'>{fullName}</p>
                    <p className='text-dark_2 font-light mt-px truncate'>{email}</p>
                  </div>
                  <MenuSeparator className="h-px bg-[#E4E4E4]" />
                  <div className='flex flex-col text-sm leading-[26px] py-[10px] px-4 gap-[14px]'>
                  <Link href='/settings'>
                    <MenuItem as='button' className='text-dark_1 text-start w-full'>
                      Settings
                    </MenuItem>
                  </Link>
                    <MenuItem as='button' className='text-error text-start ' onClick={() => handleLogOut()}>
                      Log Out
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
                
            </div>
          :
            <div className={styles.header_auth}>
              {/* TODO: Modals by ulr */}
              <button onClick={() => openModal("Register")}>REGISTER</button>

              <div className={styles.vl}></div>

              <button onClick={() => openModal("Login")}>LOG IN</button>
              
              {modalContent === "Login" 
                ? (
                <Login close={closeModal} RegIn={() => openModal("Register")} isOpen={isOpen} />
              ) : (
                <Register close={closeModal} LogIn={() => openModal("Login")} isOpen={isOpen} />
              )}
              
            </div>
        }
      </div>
    </div>
  );
}