import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoading: false,
        // 'checking' | 'authenticated' | 'not-authenticated
        isAuthenticated: false,
        user: {},
    },
    reducers: {
        startLoading: (state) => {
            state.isLoading = true;
        },
        setLogin: (state, action) => {
            state.isAuthenticated = true;
            state.user.uid = action.payload.uid;
            state.user.name = action.payload.name;
            state.isLoading = false;
        },
        setLogout: (state) => {
            state.isAuthenticated = false;
            state.user = {};
            state.isLoading = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setLogin, setLogout, startLoading } = authSlice.actions;
