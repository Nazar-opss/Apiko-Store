'use client'
import React, { useEffect, useState } from 'react'
import CartItem from '../components/cart/CartItem'
import { Controller, useForm } from 'react-hook-form'
import Input from '../components/inputs/Input'
import IconInput from '../components/inputs/IconInput'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Select } from '@headlessui/react'
import { fetchCountries } from '../state/slice/FetchSlice'
import CountrySelect from '../components/countrySelect/CountrySelect'
import ArrowDown from "../../../public/arrow_down.svg"
import Link from 'next/link'
import apiUser from '../utils/apiUser'
import { closeModal, openModal } from '../state/slice/ModalSlice'
import ThankModal from '../components/modals/ThankModal'
import { loadCartFromSession, setCartFromStorage } from '../state/slice/CartSlice'

function CartComponent() {
    // const [cartItems, setCartItems] = useState()
    const [countryForm, setCountry] = useState('Select Country')
    const [totalPrice, setTotalPrice] = useState(0)

    const isOpen = useSelector((state) => state.modal.isOpen)
    const componentName = useSelector((state) => state.modal.componentName)

    const dispatch = useDispatch()

    const countries = useSelector((state) => state.fetch.countries)
    const userData = useSelector((state) => state.auth.userData)
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const cartItems = useSelector((state) => state.cart);
    
    const {phone, fullName, city, country, address} = userData

    const {
        reset,
        register,
        watch,
        setError,
        handleSubmit,
        setValue,
        control,
        formState: { errors, isDirty, isValid, isSubmitting },
    } = useForm({
        mode: "onChange",
        values: {
            fullName: '',
            phone: '',
            city: '',
            country: '',
            address: '',
        }
    })
    
    useEffect(() => {
        dispatch(fetchCountries())
        
        setValue("fullName", fullName);
        setValue("phone", phone);
        setValue("city", city);
        setValue("country", country);
        setValue("address", address);

        const totalSum = cartItems?.reduce((accumulator, item) => accumulator + (item.price * item.quantity), 0);
        setTotalPrice(totalSum || 0)
        
    }, [fullName, phone, city, country, address, isLoggedIn, dispatch, cartItems])
    
    useEffect(() => {
        const savedCart = loadCartFromSession(isLoggedIn);
    
        if (savedCart) {
            dispatch(setCartFromStorage(savedCart));
        }
    
    }, [isLoggedIn, dispatch]); // Runs only when isLoggedIn changes

    const onSubmit = async (data) => {
        const {fullName, phone, country, city, address} = data
        console.log(fullName, phone, country, city, address)
        // console.log(cartItems)
        try {
            const response = await apiUser.post(`/api/orders`, {
                "items": 
                    cartItems?.map((elem) => (
                            console.log(elem),
                            {
                                "productId": elem.id,
                                "quantity": elem.quantity
                            }
                        )
                    )
                ,
                "shipment": {
                    "fullName": fullName,
                    "phone": phone,
                    "country": country,
                    "city": city,
                    "address": address
                }
            })
            if (response && response.data) {
                const res = await response.data;
                console.log(res);
                dispatch(openModal({componentName: 'ThankModal'}))
            } else {
                console.error('Response is undefined or missing data property.');
            }
        } catch (error) {
            alert("First you need to register or login");
        }
    }
    
    
    console.log(cartItems)

    return (
        <div className="w-full h-full max-w-[984px] min-h-full bg-white border border-[#E4E4E4] drop-shadow-md m-auto">
            <p className="mt-[70px] ml-[39px] text-[25px] leading-[36.72px] tracking-[0.4px]">
                Cart
            </p>
            <div className="mt-8 ml-[37px] flex">
                <div className="flex flex-col ">
                    {
                        cartItems.length > 0 ? (
                        cartItems?.map((elem) => {
                            return (
                                <CartItem
                                    key={elem.id}
                                    id={elem.id}
                                    picture={elem.picture}
                                    title={elem.title}
                                    alt={elem.title}
                                    price={elem.price}
                                    totalPrice={elem.totalPrice}
                                    quantity={elem.quantity}
                                />
                            );
                        })
                    ) : (
                        <div className="flex flex-row justify-center items-center text-center w-full h-full px-[161px] ">
                            <p className="text-lg leading-[26.44px] tracking-[0.5px] font-bold">
                                There are no items in a cart
                            </p>
                        </div>
                    )}
                </div>
                <div className="flex border-l-[1px] border-[#ECEEF0] h-[526px] ml-[88px] mr-[46px] r-0"></div>

                <form 
                    className='mr-[34px] w-full max-w-[220px]'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Controller
                        name="fullName"
                        control={control}
                        rules={{
                            required: "Mandatory info missing",
                            pattern: {
                                value: /^[a-zA-Z\s]+$/,
                                message:
                                    "Only letters. Cannot have special characters and numbers",
                            },
                        }}
                        render={({ field }) => (
                            <Input  
                                errors={errors}
                                placeholder="Full Name"
                                type="text"
                                name="fullName"
                                fieldRef={field}
                            />
                        )}
                    />

                    <Controller
                        name="phone"
                        control={control}
                        rules={{
                            required: "Mandatory info missing",
                            pattern: {
                                value: /^(\+)?([0-9]){10,14}$/,
                                message:
                                    "Should contain 10-14 numbers, can have optional + at the beginning",
                            },
                        }}
                        render={({ field }) => (
                            <Input
                                errors={errors}
                                placeholder="Phone number"
                                type="tel"
                                name="phone"
                                fieldRef={field}
                            />
                        )}
                    />
                    {/* <Controller
                        name="country"
                        control={control}
                        // rules={{
                        //     required: "Mandatory info missing",
                        //     pattern: {
                        //         value: /^(\+)?([0-9]){10,14}$/,
                        //         message:
                        //             "Should contain 10-14 numbers, can have optional + at the beginning",
                        //     },
                        // }}
                        render={({ field }) => (
                            <CountrySelect field={field}
                            />
                        )}
                    /> */}
                    <div className="relative z-0 mt-5 max-w-[220px]">
                        <select 
                            name="country" 
                            className="block px-2.5 pb-2 pt-2.5 w-full max-h-[40px] text-base tracking-[0.25px] leading-[20px] text-dark_1 bg-transparent rounded border-dark_3 border-[1px] appearance-none focus:border-2 focus:outline-none focus:ring-0 peer" 
                            {...register("country", { required: "Mandatory info missing" })}
                        >
                            {/* <option selected disabled hidden></option> */}
                        {
                            countries.map((elem) => (
                                <option key={elem} className='' value={elem}>{elem}</option>
                            ))

                        }
                        </select>
                        {/* <label for="country" class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Select an option</label> */}
                        <label
                            htmlFor="country"
                            className="absolute text-base leading-[19px] select-none text-dark_2 tracking-[0.25px] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-2"
                            >
                            Country
                        </label>
                        {errors && errors[country]?.type && (
                            <span className="text-error text-xs leading-5 tracking-[0.4px]">{errors[country]?.message}</span>
                        )}
                    </div>
                    <Controller
                        name="city"
                        control={control}
                        rules={{
                            required: "Mandatory info missing",
                            pattern: {
                                value: /^[a-zA-Z\s]+$/,
                                message:
                                    "Only letters. Cannot have special characters and numbers",
                            },
                        }}
                        render={({ field }) => (
                            <Input  
                                errors={errors}
                                placeholder="City"
                                type="text"
                                name="city"
                                fieldRef={field}
                            />
                        )}
                    />
                    <Controller
                        name="address"
                        control={control}
                        rules={{
                            required: "Mandatory info missing",
                        }}
                        render={({ field }) => (
                            <Input  
                                errors={errors}
                                placeholder="Address"
                                type="text"
                                name="address"
                                fieldRef={field}
                            />
                        )}
                    />
                    
                    <p className='text-lg mt-[33px] text-dark_2 leading-[26.44px] tracking-[0.4px]'>Items 
                        <span className=' text-dark_1 ml-[88px]'>
                            {
                                cartItems?.length
                            }
                        </span>
                    </p>
                    <p className='text-lg mt-2 text-dark_2 leading-[26.44px] tracking-[0.4px] '>
                        Total 
                        <span className=' text-dark_1 ml-[95px]'>
                            $ {totalPrice?.toFixed(2)}
                        </span>
                    </p>
                    <div className="">
                        <Button
                            type="submit"
                            disabled={!isDirty || !isValid}
                            className={`text-white bg-orange_main w-full max-w-[220px] tracking-[0.4px] ${!isValid ? "cursor-not-allowed" : "cursor-pointer"} mt-[47px] {} font-medium rounded-[5px] text-sm  leading-6 py-1.5 hover:opacity-80`}
                            // onClick={props.close}
                        >
                            Confirms the purchase
                        </Button>
                        {
                            isOpen === true && componentName === 'ThankModal' && <ThankModal isOpen={isOpen} close={() => dispatch(closeModal())}></ThankModal>
                        }
                        <Link href='/'>
                            <Button
                                type="submit"
                                className="text-orange_main mb-[259px] bg-white w-full max-w-[220px] tracking-[0.4px] mt-[18px] font-medium rounded-[5px] text-sm  border border-orange_main leading-6 py-1.5 hover:opacity-80"
                                // onClick={props.close}
                            >
                                Continue shopping
                            </Button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
// make total price dynamical
export default CartComponent