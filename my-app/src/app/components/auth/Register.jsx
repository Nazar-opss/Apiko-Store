"use client"
import { Button, CloseButton, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import React, { useState } from 'react'
import Image from 'next/image';
import Input from '../inputs/Input';
import { Controller, useForm } from "react-hook-form"
import IconInput from '../inputs/IconInput';
import { login, setAccessToken, setIsLoggedIn } from '../../state/slice/AuthSlice';
import { useDispatch } from 'react-redux';

function Register(props) {
    const {
      reset,
      register,
      watch,
      setError,
      handleSubmit,
      control,
      formState: { errors },
    } = useForm({
      values: {
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
      }
    })
    
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
      const {email, fullName, phoneNumber, password} = data
      try {
        await fetch('https://demo-api.apiko.academy/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "email": email,
            "fullName": fullName,
            "phone": phoneNumber,
            "password":password
          } ),
        }).then(async (response) => {
          if (response.status === 409) {
            throw new Error();
          }
          // TODO: make this easier
          try {
            await fetch('https://demo-api.apiko.academy/api/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                "email": email,
                "password":password
                } ),
            })  .then(response => response.json())
                .then(response => {
                    dispatch(setAccessToken(response.token))
                    if (response.status === 401) {
                      dispatch(setIsLoggedIn(false))
                      throw new Error();
                    } 
                    dispatch(setIsLoggedIn(true))
                    dispatch(login())
                    props.close()
                    console.log(response.token)
                  }
                )
              } catch (error) {
                setError("root", {
                  message:"Email or password is wrong"
                })
              }
          console.log(JSON.stringify(response))
          props.close()
        })

      } catch (error) {
        setError("root", {
          message:"Such email is already used"
        })
      } 
      console.log(data);
    }

    const [isVisible, setIsVisible] = useState(true)
    const passwordToggle = () => {
      setIsVisible(!isVisible)
    }

    const watchPassword = watch('password');
    // console.log(watchPassword.length)
  return (
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
            className="w-full max-w-[425px] rounded duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className='bg-white pl-[33px] pr-[30px] pb-10'>
              <DialogTitle as="h3" className="text-center text-dark_1 relative">
                <p className='pt-10 pb-7 text-[22px] leading-8'>Register</p>
                <Image
                  onClick={props.close}
                  className='absolute right-[-9px] top-[21px] cursor-pointer'
                  src='/close.svg'
                  alt='Close button'
                  width={18}
                  height={18}
                />
              </DialogTitle>
              <form
                onSubmit={handleSubmit(onSubmit)}
              >
                <Controller
                  name='fullName'
                  control={control}
                  rules={{required: 'Mandatory info missing', pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: 'Only letters. Cannot have special characters and numbers',
                  } }}
                  render={({field}) =>(
                    <Input
                      errors={errors}
                      placeholder='Full Name'
                      type='text'
                      name='fullName'
                      fieldRef={field}
                    />
                  )}
                />
               
                <Controller
                  name='email'
                  control={control}
                  rules={{required: 'Mandatory info missing',
                    pattern: {
                      value: /\S+@\S+/,
                      message: 'Should contain @',
                    }
                  }}
                  render={({field}) =>(
                    <Input
                      errors={errors}
                      placeholder='Email'
                      type='email'
                      name='email'
                      fieldRef={field}
                    />
                  )}
                />

                <Controller
                  name='phoneNumber'
                  control={control}
                  rules={{required: 'Mandatory info missing', 
                    pattern: {
                      value: /^(\+)?([0-9]){10,14}$/,
                      message: "Should contain 10-14 numbers, can have optional + at the beginning"
                    }
                  }}
                  render={({field}) =>(
                    <Input
                      errors={errors}
                      placeholder='Phone number'
                      type='tel'
                      name='phoneNumber'
                      fieldRef={field}
                    />
                  )}
                />
               
                {/* <Input
                  placeholder='Phone number'
                  type='tel'
                  name='phoneNumber'
                /> */}
                <Controller
                  name='password'
                  control={control}
                  rules={{
                    required: 'Mandatory info missing', 
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
                      message: "Should contain at least 1 letter, 1 special symbol, 1 number"
                    }, 
                    min: 8,
                    max: 35,
                  }}
                  render={({field}) =>(
                      <IconInput 
                        errors={errors}
                        placeholder='Password'
                        handleIcon={passwordToggle}
                        isVisible={isVisible}
                        type={isVisible === true ? 'password' : 'text'}
                        name='password'
                        fieldRef={field}
                      /> 
                  )}
                  
                  // {...watchPassword.length <= 0 ? <p id="floating_helper_text" class="mt-[3px] text-xs leading-5 tracking-wide text-dark_2 ">The password has to be at least at least 1 letter, 1 special symbol, 1 number</p> : <p>HEAdl</p>}
                />
                {/* <IconInput 
                  image={ <Image
                    className='absolute right-[17px] top-[13px]'
                    src={show}
                    width={18}
                    height={18}
                    alt='Show Password'
                  />}
                  placeholder='Password'
                  handleIcon={handleIcon}
                  type='password'
                  name='password'
                />  */}
                {/* <p id="floating_helper_text" class="mt-[3px] text-xs leading-5 tracking-wide text-dark_2 ">The password has to be at least at least 1 letter, 1 special symbol, 1 number</p> */}
                <div className="mt-4">
                  <Button
                    type="submit"
                    className="text-white bg-orange_main w-full max-w-[362px] tracking-wide mt-[50px] font-medium rounded text-sm  leading-6 px-[153px] py-1.5 hover:opacity-80"
                    // onClick={props.close}
                  >
                    Register
                  </Button>
                </div>
              </form>
            </div>
            <div className='bg-white'>
              <DialogPanel
                transition
                className="w-full max-w-[425px] mt-[15px] text-sm leading-[26px] rounded text-center bg-white pl-[108px] pt-[30px] pr-[111px] pb-5 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                > 
                <p>I already have an account, <a onClick={props.LogIn} className='text-orange_main cursor-pointer'>Log In</a></p>
              </DialogPanel>
            </div>
          </DialogPanel>
          
        </div>
      </div>
    </Dialog>
  );
  // <Modal
  //       show={props.isOpen}
  //       onHide={props.close}
  //       backdrop="static"
  //       keyboard={false}
  //     >
  //       <Modal.Header closeButton>
  //         <Modal.Title>Modal title</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         I will not close if you click outside me. Do not even try to press
  //         escape key.
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button variant="secondary" onClick={props.close}>
  //           Close
  //         </Button>
  //         <Button variant="primary">Understood</Button>
  //       </Modal.Footer>
  //     </Modal>
}

export default Register