import { createSlice } from "@reduxjs/toolkit";

export const loadersSlice = createSlice({
    name: 'loaders',
    initialState:{
        isLoading: false,
    },
    reducers: {
        SetLoader: (state, action) => {
            state.isLoading = action.payload;
        },
    }
})

export const { SetLoader } = loadersSlice.actions;