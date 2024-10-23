"use client";
import IconInput from "@/app/IconInput";
import Input from "@/app/Input";
import { login } from "@/app/state/slice/AuthSlice";
import { fetchCountries } from "@/app/state/slice/FetchSlice";
import { updateAccount, updatePassword } from "@/app/state/slice/UserSlice";
import { Button } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { CloseButton } from "@/app/ModalItem";
import { Slide, toast } from "react-toastify";

function Edit() {
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();

  const countries = useSelector((state) => state.fetch.countries);
  const userData = useSelector((state) => state.auth.userData);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const { phone, fullName, city, country, address, email } = userData;

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    values: {
      fullName: "",
      phone: "",
      email: "",
      city: "",
      country: "",
      address: "",
    },
  });

  const {
    resetField: resetField2,
    handleSubmit: handleSubmit2,
    control: control2,
    setError: setError2,
    formState: {errors: errors2,}
  } = useForm({
    mode: "onChange",
    values: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }
  })

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(login()) // temp method
      dispatch(fetchCountries())
    }

    setValue("fullName", fullName);
    setValue("phone", phone);
    setValue("email", email);
    setValue("city", city);
    setValue("country", country);
    setValue("address", address);
  }, [fullName, phone, city, country, email, address]);

  const onSubmit = async (data) => {
    const { fullName, phone, country, email, city, address } = data;
    console.log(fullName, phone, country, email, city, address);
    dispatch(updateAccount({fullName, phone, city, country, email, address}))
    dispatch(login())
    notify()
  };
  const onSubmitPassword = async (data) => {
    const { currentPassword, confirmPassword, newPassword } = data;
    const successPassword = () => {
      dispatch(updatePassword({currentPassword, newPassword}))
      if (isLoggedIn) {
        dispatch(login()) // temp method
      }
      notifyPassword()
      resetField2('confirmPassword')
      resetField2('newPassword')
      resetField2('currentPassword')
    }

    newPassword === confirmPassword ? successPassword() : setError2('confirmPassword', {
      message: "Passwords don’t match"
    })
    
    console.log(currentPassword, confirmPassword, newPassword);
  };

  const passwordToggle = () => {
    setIsVisible(!isVisible);
  };

  const notify = () => {  
    toast.success(<p className='font-medium text-[#101010] text-lg leading-[26.44px]'>Account details are updated successfully</p>, {
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
  const notifyPassword = () => {
    toast.success(<p className='font-medium text-[#101010] text-lg leading-[26.44px]'>Your password is updated successfully</p>, {
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
  }
  return (
    <div className="w-full mt-[63px] ">
      <p className="ml-[206px] text-lg leading-6 tracking-[0.15px] ">
        Main information
      </p>
      <div className="w-full flex flex-col justify-center items-center">
        <form
          className="w-full max-w-[377px] mt-[10px]"
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
            name="email"
            control={control}
            rules={{
              required: "Mandatory info missing",
              pattern: {
                value: /\S+@\S+/,
                message: "Should contain @",
              },
            }}
            render={({ field }) => (
              <Input
                errors={errors}
                placeholder="Email"
                type="email"
                name="email"
                fieldRef={field}
              />
            )}
          />
          {errors.root ? (
            <p className="text-error text-xs leading-5 tracking-[0.4px]">
              {errors.root.message}
            </p>
          ) : (
            <p></p>
          )}

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

          <div className="relative z-0 mt-5">
            <select
              name="country"
              className="block px-2.5 pb-2 pt-2.5 w-full max-h-[40px] text-base tracking-[0.25px] leading-[20px] text-dark_1 bg-transparent rounded border-dark_3 border-[1px] appearance-none focus:border-dark_2 focus:border-2 focus:outline-none focus:ring-0 peer"
              {...register("country", { required: "Mandatory info missing" })}
            >
              
              {countries.map((elem) => (
                <option key={elem} className="" value={elem}>
                  {elem}
                </option>
              ))}
            </select>
            {/* <label htmlFor="country" class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Select an option</label> */}
            <label
              htmlFor="country"
              className="absolute text-base leading-[19px] select-none text-dark_2 tracking-[0.25px] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-2"
            >
              Country
            </label>
            {errors && (
              <span className="text-error text-xs leading-5 tracking-[0.4px]">
                {errors?.message}
              </span>
            )}
          </div>
          <Controller
            name="city"
            control={control}
            // rules={{
            //   required: "Mandatory info missing",
            //   pattern: {
            //     value: /^[a-zA-Z\s]+$/,
            //     message:
            //       "Only letters. Cannot have special characters and numbers",
            //   },
            // }}
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
            // rules={{
            //   required: "Mandatory info missing",
            // }}
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

          <div className="">
            <Button
              type="submit"
              // disabled={!isDirty || !isValid}
              className={`text-white bg-orange_main w-full tracking-[0.4px] 
              cursor-pointer mt-[40px] font-medium rounded-[5px] text-sm  leading-6 py-1.5 hover:opacity-80`}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
      <p className="ml-[206px] text-lg leading-6 tracking-[0.15px] mt-[50px]">
        Change password
      </p>
      <div className="w-full flex flex-col justify-center items-center ">
        <form
          className="w-full max-w-[377px] mt-[10px]"
          onSubmit={handleSubmit2(onSubmitPassword)}
        >
          <Controller
            name="currentPassword"
            control={control2}
            rules={{ required: "Mandatory info missing" }}
            render={({ field }) => (
              <IconInput
                errors={errors2}
                placeholder="Current password"
                handleIcon={passwordToggle}
                isVisible={isVisible}
                type={isVisible === true ? "password" : "text"}
                name="currentPassword"
                fieldRef={field}
              />
            )}
          />
          {errors2.root && (
            <div className="text-error text-xs leading-5 tracking-[0.4px]">
              {errors2.root.message}
            </div>
          )}
          <Controller
            name="newPassword"
            control={control2}
            rules={{ required: "Mandatory info missing" }}
            render={({ field }) => (
              <IconInput
                errors={errors2}
                placeholder="New password"
                handleIcon={passwordToggle}
                isVisible={isVisible}
                type={isVisible === true ? "password" : "text"}
                name="newPassword"
                fieldRef={field}
              />
            )}
          />
          {errors2.newPassword && (
            <div className="text-error text-xs leading-5 tracking-[0.4px]">
              {errors2.newPassword.message}
            </div>
          )}

          <Controller
            name="confirmPassword"
            control={control2}
            rules={{ required: "Mandatory info missing" }}
            render={({ field }) => (
              <IconInput
                errors={errors2}
                placeholder="Confirm password"
                handleIcon={passwordToggle}
                isVisible={isVisible}
                type={isVisible === true ? "password" : "text"}
                name="confirmPassword"
                fieldRef={field}
              />
            )}
          />
          {/* {errors2.confirmPassword && (
            <div className="text-error text-xs leading-5 tracking-[0.4px]">
              {errors2.confirmPassword.message}
            </div>
          )} */}

          <div className="">
            <Button
              type="submit"
              // disabled={!isDirty || !isValid}
              className={`text-white bg-orange_main w-full tracking-[0.4px] mb-[42px] cursor-pointer mt-[40px] font-medium rounded-[5px] text-sm  leading-6 py-1.5 hover:opacity-80`}

            >
              Change password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
