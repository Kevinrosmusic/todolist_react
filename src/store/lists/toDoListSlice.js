import { createSlice } from "@reduxjs/toolkit";

export const toDoListSlice = createSlice({
    name: "toDoList",
    initialState: {
        lists: [],
        active: null,
    },
    reducers: {
        setList: (state, action) => {
            state.lists = action.payload;
        },
        setActiveList: (state, action) => {
            state.active = action.payload;
        },
        clearActivate: (state) => {
            state.active = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setList, setActiveList, clearActivate } = toDoListSlice.actions;
