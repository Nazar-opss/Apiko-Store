import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { useDispatch } from "react-redux";

const initialState = {
    fetches: [],
    isLoading: false,
    error: null,
    itemInfo: {},
    countries: [],
    limit: 12,
    categories: [],
}

// const fetchSlice = createSlice({
//     name:'fetch',
//     initialState,
//     reducers: {
//         setFetchList: (state, action) => {
//             state.fetches = action.payload
//         }
//     }
// })

export const fetchItemsList = createAsyncThunk (
    'fetch/fetchItemsList',
    async (limit) => {
        console.log(limit)
        limit = 12
        const res = await axios(`https://demo-api.apiko.academy/api/products?offset=0&limit=${limit || 12}&sortBy=latest`,  
            { 
                headers: {
                    accept: "application/json"
                }
            },
        )
        const data = await res.data
        console.log(data)
        return data
    }
)
export const fetchCountries = createAsyncThunk (
    'fetch/fetchCountries',
    async () => {
        const res = await axios(`https://demo-api.apiko.academy/api/locations/countries`,  
            { 
                headers: {
                    accept: "application/json"
                }
            },
        )
        const data = await res.data
        return data
    }
)
export const fetchSearchList = createAsyncThunk (
    'fetch/fetchSearchList',
    async (keywords) => {
        console.log(keywords)
        const res = await axios(`https://demo-api.apiko.academy/api/products/search?keywords=${keywords}&offset=0&limit=12`,  
            { 
                headers: {
                    accept: "application/json"
                }
            },
        )
        const data = await res.data
        console.log(data)
        return data
    }
)

export const fetchCategoriesList = createAsyncThunk (
    'fetch/fetchCategoriesList',
    async ({categoryId, sortBy}) => {
        console.log(categoryId, sortBy)
        const res = await axios(`https://demo-api.apiko.academy/api/categories/${categoryId}/products?offset=0&limit=12${sortBy ? `&sortBy=${sortBy}` : ''}`,  
            { 
                headers: {
                    accept: "application/json"
                }
            },
        )
        const data = await res.data
        console.log(data)
        return data
    }
)
export const fetchItemDetails = createAsyncThunk (
    'fetch/fetchItemDetails',
    async (id) => {
        console.log(id)
        const res = await axios(`https://demo-api.apiko.academy/api/products/${id}`,  
            { 
                headers: {
                    accept: "application/json"
                }
            },
        )
        const data = await res.data
        console.log(data)
        return data
    }
)

export const fetchUniversal = createAsyncThunk (
    'fetch/fetchUniversal',
    async ({categoryId, sortBy, limit}) => {
        resetLimit()
        // console.log(categoryId, sortBy, limit)
        console.log(`https://demo-api.apiko.academy/api/${categoryId ? 'categories/'+ categoryId + '/' : ''}products?offset=0&limit=${limit || 12}${sortBy ? `&sortBy=${sortBy}` : ''}`)
        const res = await axios(`https://demo-api.apiko.academy/api/${categoryId ? 'categories/'+ categoryId + '/' : ''}products?offset=0&limit=${limit || 12}${sortBy ? `&sortBy=${sortBy}` : ''}`,  
            { 
                headers: {
                    accept: "application/json"
                }
            },
        )
        const data = await res.data
        console.log(data)
        return data
    }
)

export const getCategories = createAsyncThunk (
    'fetch/getCategories',
    async () => {
        const res = await axios('https://demo-api.apiko.academy/api/categories')
        const data = await res.data
        return data
    }
)

export const fetchSlice = createSlice({
    name:'fetch',
    initialState,
    reducers: {
        setLimit: (state, action) => {
            state.limit += 12 
        },
        resetLimit: (state) => {
            state.limit = 12;  // Скидаємо ліміт до початкового значення
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSearchList.pending, (state) => {
            state.isLoading = true
            // state.fetches = []
        })
        builder.addCase(fetchSearchList.fulfilled, (state, action) => {
            console.log('is loading fetchSearchlist')
            state.isLoading = false
            state.fetches = action.payload
            // console.log(state.fetches)
        })
        builder.addCase(fetchSearchList.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })


        builder.addCase(fetchItemsList.pending, (state) => {
            // state.isLoading = true
            // state.fetches = []
        })
        builder.addCase(fetchItemsList.fulfilled, (state, action) => {
            console.log('is loading fetchItemslist')
            state.fetches = action.payload
            state.isLoading = false
            // console.log(state.fetches)
        })
        builder.addCase(fetchItemsList.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })

        builder.addCase(fetchUniversal.pending, (state) => {
            // state.isLoading = true
            // state.fetches = []
        })
        builder.addCase(fetchUniversal.fulfilled, (state, action) => {
            console.log('is loading fetchUniversal')
            state.fetches = action.payload
            state.isLoading = false
            // console.log(state.fetches)
        })
        builder.addCase(fetchUniversal.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })


        builder.addCase(fetchCategoriesList.pending, (state) => {
            state.isLoading = true
            // state.fetches = []
        })
        builder.addCase(fetchCategoriesList.fulfilled, (state, action) => {
            console.log('is loading fetchCategoriesList')
            state.fetches = action.payload
            state.isLoading = false
            // console.log(state.fetches)
        })
        builder.addCase(fetchCategoriesList.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })


        builder.addCase(fetchItemDetails.pending, (state) => {
            state.isLoading = true
            // state.fetches = []
        })
        builder.addCase(fetchItemDetails.fulfilled, (state, action) => {
            console.log('is loading fetchItemDetails')
            state.itemInfo = action.payload
            state.isLoading = false
            // console.log(state.fetches)
        })
        builder.addCase(fetchItemDetails.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })

        builder.addCase(fetchCountries.fulfilled, (state, action) => {
            console.log('is loading fetchCountries')
            state.countries = action.payload
        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            console.log('is loading getCategories')
            state.categories = action.payload
        })
    }
})


export const { setLoading, setLimit, resetLimit } = fetchSlice.actions

export default fetchSlice.reducer