import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen: false,
    componentName: null,
    // componentProps: {},
    orderId: null,
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true
            state.componentName = action.payload.componentName
            // state.componentProps = action.payload.componentProps || {}
            state.orderId = action.payload.orderId
        },
        closeModal: (state, action) => {
            state.isOpen = false
            state.componentName = null
            // state.componentProps = {}
            state.orderId = null
        }
    },
})

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer
