"use client"
import React, { useEffect, useState } from 'react'
import styles from './Filter.module.css'
import Image from 'next/image';
import { Description, Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, ListboxSelectedOption, Select } from '@headlessui/react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesList, fetchItemsList, fetchSearchList, fetchUniversal, getCategories, resetLimit, setLimit } from '../../state/slice/FetchSlice';
import { useDebouncedCallback } from 'use-debounce';
import ArrowDown from "../../../../public/arrow_down.svg"

import SearchBar from '../searchBar/SearchBar';

const optionsSort = [
    { value: 'popular', text: "Popular" },
    { value: 'latest', text: "New" },
]

const useUpdateURL = (searchParams, replace, pathname) => {
    const updateURL = (params) => {
        replace(`${pathname}?${params.toString()}`);
    };
    return updateURL;
};

function Filter() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const dispatch = useDispatch()

    const [selectedCategory, setSelectedCategory] = useState("Choose Category")
    const [selectedSort, setSelectedSort] = useState({ name: 'Sorting', value: '' })

    const [searchActive, setSearchActive] = useState(false);

    const toggleSearch = () => setSearchActive(!searchActive);

    const limit = useSelector((state) => state.fetch.limit)
    const categories = useSelector((state) => state.fetch.categories)

    const updateURL = useUpdateURL(searchParams, replace, pathname)

    useEffect(() => {
        const query = searchParams.get('query');
        const category = searchParams.get('category');
        const sortBy = searchParams.get('sortBy');
        const id = searchParams.get('id');

        dispatch(getCategories())

        if (searchParams.size === 1 && query?.length >= 3) {
            dispatch(fetchSearchList(query));
        } else if (category?.length >= 1) {
            dispatch(fetchCategoriesList({ categoryId: id, sortBy }));
            setSelectedSort({ name: sortBy === 'popular' ? 'Popular' : 'New', value: sortBy });
            setSelectedCategory(category);
        } else {
            dispatch(fetchItemsList());
        }
    }, [searchParams]);

    const handleSearch = useDebouncedCallback((term) => {
        console.log(`Searching... ${term}`);
        const params = new URLSearchParams(searchParams)

        if (term) {
            params.delete('category')
            params.delete('id')
            params.delete('sortBy')
            if (term.length >= 3) {
                dispatch(fetchSearchList(term))
            } else {
                dispatch(fetchItemsList())
            }
            params.set('query', term)
        } else {
            params.delete('query')
        }
        setSelectedCategory('Choose Category')
        setSelectedSort({ name: 'Sorting', value: '' })
        updateURL(params)
    }, 300)

    const handleCategories = ({ id, sortBy, name }) => {
        dispatch(resetLimit())
        console.log(id, sortBy, name, limit)
        setSelectedCategory(name)
        const params = new URLSearchParams(searchParams)
        if (id) {
            dispatch(fetchUniversal({ limit: 12, categoryId: id, sortBy: sortBy }))
            params.set('category', name)
            params.set('id', id)
            if (sortBy) {
                params.set('sortBy', sortBy)
            }
        } else {
            params.delete('category')
            params.delete('id')
            dispatch(fetchItemsList())
        }
        updateURL(params)
    }

    const handleClear = ({ e, type }) => {
        const params = new URLSearchParams(searchParams)
        e.stopPropagation();
        if (type == 'category') {
            params.delete('category')
            params.delete('id')
            dispatch(fetchItemsList())
            setSelectedCategory('Choose Category')
        } else {
            params.delete('sortBy')
            setSelectedSort({ name: 'Sorting' })
            dispatch(fetchCategoriesList({ categoryId: searchParams.get('id'), sortBy: '' }))
        }
        // replace(`${pathname}?${params.toString()}`)
        updateURL(params)
    }

    const handleSort = ({ text, value }) => {
        // dispatch(resetLimit())
        const params = new URLSearchParams(searchParams)
        setSelectedSort({ name: text, value: value })
        console.log(text, value)
        dispatch(fetchUniversal({ limit: limit, categoryId: searchParams.get('id'), sortBy: value }))
        if (searchParams.get('category')) {
            params.set('category', searchParams.get('category'))
        }
        if (searchParams.get('id')) {
            params.set('id', searchParams.get('id'))
        }
        params.set('sortBy', value)
        // replace(`${pathname}?${params.toString()}`)
        updateURL(params)
    }

    return (
        <div className={styles.filter}>
            <div className={styles.filter_container}>
                <SearchBar
                    toggleSearch={toggleSearch}
                    handleSearch={handleSearch}
                    searchParams={searchParams}
                />
                {
                    searchActive === true
                        ?
                        ''
                        :
                        <>
                            <div className={styles.filter_category}>
                                <Listbox value={selectedCategory} onChange={setSelectedCategory}
                                >
                                    <div className="relative">
                                        <ListboxButton className="relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-select-border  open:rounded-t-md focus:outline-none sm:text-sm sm:leading-6 ">
                                            <span className="flex items-center">
                                                <Image
                                                    src="/menu.svg"
                                                    alt="Menu Icon"
                                                    width={17}
                                                    height={14}
                                                />
                                                <span className="ml-1.5 block truncate text-dark_2">{selectedCategory}</span>
                                            </span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                {
                                                    selectedCategory == 'Choose Category'
                                                        ? <ArrowDown
                                                            width={13}
                                                            height={8}
                                                            className='fill-dark_2'
                                                        />
                                                        : <Image
                                                            onClick={(e) => {
                                                                handleClear({ e: e, type: 'category' })
                                                            }}
                                                            src="/close.svg"
                                                            alt="close Icon"
                                                            width={12}
                                                            height={12}
                                                            className='fill-dark_2 cursor-pointer pointer-events-auto'
                                                        />
                                                }

                                            </span>
                                            <ListboxSelectedOption placeholder='Choose Category'>

                                            </ListboxSelectedOption>
                                        </ListboxButton>

                                        <ListboxOptions
                                            transition
                                            className="absolute z-10 max-h-56 w-full rounded-b-md bg-white text-sm leading-[26px] shadow-lg outline outline-1 outline-select-border focus:outline-1 data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in"
                                        >
                                            {categories.map((option) => (
                                                <ListboxOption
                                                    key={option.id}
                                                    value={option.name}
                                                    onClick={() => handleCategories({ id: option.id, sortBy: selectedSort.value, name: option.name })}
                                                    className="group relative cursor-pointer select-none bg-white pt-[8px] pb-[7px] pl-1 pr-3 text-gray-900 data-[focus]:bg-select-hover data-[focus]:text-black"
                                                >
                                                    <div className="flex items-center">
                                                        <span className="ml-[33px] block truncate  font-normal group-data-[selected]:font-semibold">
                                                            {option.name}
                                                        </span>
                                                    </div>
                                                </ListboxOption>
                                            ))}
                                        </ListboxOptions>

                                    </div>
                                </Listbox>
                            </div>
                            <div className={styles.filter_sort}>
                                <Listbox value={selectedSort.name}>
                                    <div className="relative">
                                        <ListboxButton className="relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-select-border focus:outline-none sm:text-sm sm:leading-6">
                                            <span className="flex items-center ">
                                                <Image
                                                    src="/sorting.svg"
                                                    alt="Sorting Icon"
                                                    width={14}
                                                    height={18}
                                                />
                                                <span className="ml-3 block truncate text-dark_2 open:text-black">{selectedSort.name}</span>
                                            </span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                {
                                                    selectedSort.name == 'Sorting'
                                                        ? <ArrowDown
                                                            width={13}
                                                            height={8}
                                                            className='fill-dark_2'
                                                        />
                                                        : <Image
                                                            onClick={(e) => {
                                                                handleClear({ e: e, type: 'sort' })
                                                            }}
                                                            src="/close.svg"
                                                            alt="close Icon"
                                                            width={12}
                                                            height={12}
                                                            className='fill-dark_2 cursor-pointer pointer-events-auto'
                                                        />
                                                }
                                            </span>
                                        </ListboxButton>

                                        <ListboxOptions
                                            transition
                                            className="absolute z-10 max-h-56 w-full overflow-auto rounded-b-md bg-white text-sm leading-[26px] shadow-lg outline outline-1 outline-select-border focus:outline-1 data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                                        >
                                            {optionsSort.map((option) => (
                                                <ListboxOption
                                                    key={option.value}
                                                    value={option.text}
                                                    disabled={option.disabled}
                                                    onClick={() => handleSort({ value: option.value, text: option.text })}
                                                    className="group relative cursor-pointer select-none bg-white pt-[8px] pb-[7px] pl-1 pr-3 text-gray-900 data-[focus]:bg-select-hover data-[focus]:text-black"
                                                >
                                                    <div className="flex items-center">
                                                        <span className="ml-[33px] block truncate font-normal group-data-[selected]:font-semibold">
                                                            {option.text}
                                                        </span>
                                                    </div>
                                                </ListboxOption>
                                            ))}
                                        </ListboxOptions>
                                    </div>
                                </Listbox>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}

export default Filter