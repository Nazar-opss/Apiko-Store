import zIndex from '@mui/material/styles/zIndex';
import React from 'react'
import { FadeLoader } from 'react-spinners'

function LoaderLine({isLoading}) {
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      };
  return (
    isLoading &&
    <div className='bg-black/60 fixed flex flex-col justify-center items-center left-0 top-0 z-[1001] w-full h-full '>
        <FadeLoader
            height={17}
            width={7}
            radius={5}
            margin={5}
            color='white' 
            size={150}
            cssOverride={override}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
        <p className='text-white font-medium text-xl leading-6 tracking-[0.4px] mt-[38px]'>
        Searching...
        </p>
    </div>
  )
}

export default LoaderLine