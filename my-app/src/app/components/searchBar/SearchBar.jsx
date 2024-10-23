import Image from "next/image";
import React from "react";

function SearchBar({ toggleSearch, handleSearch, searchParams }) {
    return (
        <div className="max-w-[290px] w-[100%] text-sm leading-[26px]">
            <div className="relative rounded-md shadow-sm ">
                <div className="pointer-events-none absolute inset-y-0  left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">
                        <Image
                            src="/search.svg"
                            alt="Search Icon"
                            width={17.5}
                            height={17.5}
                        />
                    </span>
                </div>
                <input
                    onFocus={toggleSearch}
                    onBlur={toggleSearch}
                    id="name"
                    name="name"
                    type="text"
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                    defaultValue={searchParams.get("query")?.toString()}
                    placeholder="Search products by name"
                    className="block w-full rounded-md border-0 py-1.5 pl-9 pr-22 ring-1 ring-select-border placeholder:text-dark_2  focus:outline-none focus:ring-1 focus:ring-select-border sm:text-sm sm:leading-6"
                />
                <div className="absolute inset-y-0 right-0 flex items-center"></div>
            </div>
        </div>
    );
}

export default SearchBar;
