import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
}

export const Slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload;
        }
    }
})

export const { setLogin } = Slice.actions;

export default Slice.reducer;