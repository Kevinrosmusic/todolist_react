import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { toDoListSlice } from "./lists/toDoListSlice";
import { uiSlice } from "./ui/uiSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        toDoList: toDoListSlice.reducer,
        ui: uiSlice.reducer,
    },
});
