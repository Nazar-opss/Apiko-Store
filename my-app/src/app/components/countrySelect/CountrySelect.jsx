'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountries } from '../../state/slice/FetchSlice'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import ArrowDown from "../../../../public/arrow_down.svg"

function CountrySelect(props) {
    const [country, setCountry] = useState('Select Country')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCountries())
    }, [])

    const countries = useSelector((state) => state.fetch.countries)

    return (
        <div className='relative mt-5 max-w-[220px]'>
            <Listbox
                value={country}
            >
                <div className="relative">
                    <ListboxButton className="relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-select-border focus:outline-none sm:text-sm sm:leading-6">
                        <span className="flex items-center ">
                            <span className="block truncate text-dark_2 open:text-black">{country}</span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ArrowDown
                                width={13}
                                height={8}
                                className='fill-dark_2'
                            />
                        </span>
                    </ListboxButton>

                    <ListboxOptions
                        transition
                        className="absolute z-10 max-h-56 w-full overflow-auto rounded-b-md bg-white text-sm leading-[26px] shadow-lg outline outline-1 outline-select-border focus:outline-1 data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                    >

                        {countries.map((option) => (
                            <ListboxOption
                                key={option}
                                value={option}
                                // defaultValue={searchParams.get('sortBy') === 'popular' ? 'Popular' : 'New'}
                                onClick={() => setCountry(option)}
                                className="group relative cursor-pointer select-none bg-white pt-[8px] pb-[7px] pl-1 pr-3 text-gray-900 data-[focus]:bg-select-hover data-[focus]:text-black"
                            >
                                <div className="flex items-center">
                                    <span className="ml-[33px] block truncate font-normal group-data-[selected]:font-semibold">
                                        {option}
                                    </span>
                                </div>
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </div>
            </Listbox>
        </div>
    )
}

export default CountrySelect