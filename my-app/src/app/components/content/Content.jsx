'use client'
import React, { Suspense, useEffect, useState } from 'react'
import { Item } from './Item'
import { useDispatch, useSelector } from 'react-redux'
import LoaderLine from '../loader/Loader';
import { unstable_noStore } from 'next/cache';
import { fetchCountries, fetchItemsList, fetchUniversal, setLimit } from '../../state/slice/FetchSlice';
import { usePathname, useSearchParams } from 'next/navigation';

// function Skeleton({ className }) {
//     return <div className={`bg-orange_main/70 motion-safe:animate-pulse ${className}`} />;
// }

export default function Content() {
    // unstable_noStore() find a way to use it with suspense
    // const [limit, setLimit] = useState(12)
    const fetchSearch = useSelector((state) => state.fetch.fetches)
    const isLoading = useSelector((state) => state.fetch.isLoading)
    const limit = useSelector((state) => state.fetch.limit)
    const status = useSelector((state) => state.fetch.status)
    // style no results and fix for first render

    const searchParams = useSearchParams()
    const pathname = usePathname()

    // const { replace } = useRouter()

    const dispatch = useDispatch()

    console.log(limit)
    console.log(fetchSearch)
    const handleMore = () => {
        console.log("rn", searchParams.get('category'))
        dispatch(setLimit())
        dispatch(fetchUniversal({limit: limit + 12, categoryId: searchParams.get('id'), sortBy: searchParams.get('sortBy')}))
    }
return (
    <>
        
        <LoaderLine isLoading={isLoading}/>
    {/* <Suspense fallback={<Skeleton className="w-[209px] h-[212px] "/>}> */}
    {
        fetchSearch?.length 
        ? <>
            <div className="flex justify-between items-center flex-wrap w-full mt-5">
                {   
                    // make another name 
                    fetchSearch.map((elem) => {
                        return(
                                <Item
                                    key={elem.id}
                                    id={elem.id}
                                    price={elem.price}
                                    title={elem.title}
                                    picture={elem.picture}
                                />
                        )
                    }) 
                }
            </div>
            <button 
                onClick={() => handleMore()}
                type="button" 
                disabled={status === 'loading'}
                className="text-white bg-blue_btn w-full max-w-[150px] mt-10 font-medium rounded text-sm  leading-6 px-4 py-1.5 mb-[85px] hover:opacity-80">
                Load More...
            </button>
        </> 
        : <div className=' text-center w-full h-full flex flex-col mt-[209px] justify-center items-center'> 
            <h1 className='text-[#101010] text-lg font-bold max-w-[347px] leading-[26.44px] tracking-[0.5px]'>
                No Results Found
            </h1>
            <span className='text-[15px] text-dark_1 max-w-[347px] mt-[10px] leading-[22px]'>
                We did not find any article that matches this search
                Make sure that the search text is entered correctly
                Try using other search criteria
            </span>
        </div>
    }
    {/* </Suspense> */}
    {/* <Skeleton  className="w-[209px] h-[212px] "/> */}
            
    </>
)
}