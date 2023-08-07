import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: "ui",
    initialState: {
        counter: 10,
    },
    reducers: {},
});

// Action creators are generated for each case reducer function
export const { increment } = uiSlice.actions;
