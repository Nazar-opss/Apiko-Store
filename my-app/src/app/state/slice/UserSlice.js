import apiUser from "@/app/utils/apiUser";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    favorites: [],
    orders: [],
    orderDetails: [],
    isLoading: false,
}

export const addFavorite = createAsyncThunk(
    'user/addFavorite',
    async (id) => {
        const response = await apiUser.post(`/api/products/${id}/favorite`)
        .catch(error => {
            alert('already in favorite');
        })
        const data = await response.data
        console.log(data)
    }
)

export const getFavorite = createAsyncThunk(
    'user/getFavorite',
    async () => {
        const response = await apiUser.get('/api/products/favorites?offset=0&limit=100')
            .catch(error => {
            console.error('Error in request:', error);
            })
            const data = await response.data
            console.log(data)
            return data
    } 
)
export const deleteFavorite = createAsyncThunk(
    'user/deleteFavorite',
    async (id) => {
        const response = await apiUser.delete(`/api/products/${id}/favorite`)
            .catch(error => {
            console.error('Error in request:', error);
            })
            console.log(response)
    } 
)

export const updateAccount = createAsyncThunk(
    'user/updateAccount',
    async ({fullName,email,phone,country,city,address}) => {
        const response = await apiUser.put(`/api/account`, {
            "fullName": fullName,
            "email": email,
            "phone": phone,
            "country": country,
            "city": city,
            "address": address
        })
        .catch(error => {
            alert(error);
        })
        console.log(response)
    }
)

export const updatePassword = createAsyncThunk(
    'user/updatePassword',
    async ({currentPassword, newPassword}) => {
        const response = await apiUser.put(`/api/account/password`, {
            "oldPassword": currentPassword,
            "password": newPassword,
        })
        .catch(error => {
            alert(error)
        })
        console.log(response)
    }
)
export const getOrders = createAsyncThunk(
    'user/getOrders',
    async () => {
        const response = await apiUser.get(`/api/orders?offset=0&limit=11`)
        .catch(error => {
            alert(error)
        })
        const data = await response.data
        console.log(data)
        return data
    }
)
export const getOrderDetails = createAsyncThunk(
    'user/getOrderDetails',
    async (id) => {
        const response = await apiUser.get(`/api/orders/${id}`)
        .catch(error => {
            alert(error)
        })
        const data = await response.data
        console.log(data)
        return data
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(addFavorite.pending, (state, action) => {
            console.log(state, action)
        })
        builder.addCase(addFavorite.fulfilled, (state, action) => {
            console.log(state, action)
        })
        builder.addCase(addFavorite.rejected, (state, action) => {
            console.log(state, action)
        })
        builder.addCase(getFavorite.pending, (state, action) => {
            console.log(state, action)
        })
        builder.addCase(getFavorite.fulfilled, (state, action) => {
            console.log(state, action)
            state.favorites = action.payload
        })
        builder.addCase(getFavorite.rejected, (state, action) => {
            console.log(state, action)
        })
        builder.addCase(updateAccount.pending, (state, action) => {
            console.log(state, action)
        })
        builder.addCase(updateAccount.fulfilled, (state, action) => {
            console.log(state, action)
        })
        builder.addCase(updateAccount.rejected, (state, action) => {
            console.log(state, action)
        })
        builder.addCase(updatePassword.pending, (state, action) => {
            console.log(state, action)
        })
        builder.addCase(updatePassword.fulfilled, (state, action) => {
            console.log(state, action)
        })
        builder.addCase(updatePassword.rejected, (state, action) => {
            console.log(state, action)
        })
        builder.addCase(getOrders.pending, (state, action) => {
            console.log(state, action)
        })
        builder.addCase(getOrders.fulfilled, (state, action) => {
            console.log(state, action)
            state.orders = action.payload
        })
        builder.addCase(getOrders.rejected, (state, action) => {
            console.log(state, action)
        })
        builder.addCase(getOrderDetails.pending, (state, action) => {
            console.log(state, action)
            state.isLoading = true
        })
        builder.addCase(getOrderDetails.fulfilled, (state, action) => {
            console.log(state, action)
            state.isLoading = false
            state.orderDetails = action.payload
        })
        builder.addCase(getOrderDetails.rejected, (state, action) => {
            console.log(state, action)
        })
        builder.addCase(deleteFavorite.pending, (state, action) => {
            console.log(state, action)
        })
        builder.addCase(deleteFavorite.fulfilled, (state, action) => {
            console.log(state, action)
        })
        builder.addCase(deleteFavorite.rejected, (state, action) => {
            console.log(state, action)
        })
    }
})

export default userSlice.reducer