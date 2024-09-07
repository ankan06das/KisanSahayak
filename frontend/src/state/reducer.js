import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    productData: null
}

export const Slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload;
        },
        setProductData: (state, action) => {
            state.productData = action.payload;
        }
    }
})

export const { setLogin, setProductData } = Slice.actions;

export default Slice.reducer;