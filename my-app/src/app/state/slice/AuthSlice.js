import apiUser from '@/app/utils/apiUser'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { useSelector } from 'react-redux'

const initialState = {
  accessToken: '',
  isLoggedIn: false,
  userData: {}
}

export const login = createAsyncThunk(
    'auth/login',
    async () => {
        const response = await apiUser.get('/api/account')
          .catch(error => {
            console.error('Error in request:', error);
          })
          const data = await response.data
          console.log(data)
          return data
    }
)

export const authSlice =  createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            // if (state.accessToken != '') {
            //     state.isLoggedIn = true
            // }
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        logOut: (state) => {
            state.accessToken = ''
            state.isLoggedIn = false
            state.userData = {}
            sessionStorage.removeItem("itemsLogged")
            localStorage.removeItem('persist:root');
            console.log(state.isLoggedIn, state.accessToken)
        } 
    },

    // delete dispatch from Login modal and move here
    
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            console.log(state)
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.userData = action.payload
            console.log(state, action)
            console.log(state.userData)
        })
        builder.addCase(login.rejected, (state) => {
            console.log(state)
        })
    }
})

export const { setAccessToken, setIsLoggedIn, logOut } = authSlice.actions

export default authSlice.reducer