import Fetch from "../api/Fetch";
import { setLogin, setLogout, startLoading } from "../store/auth/authSlice";

export const checkAuthtoken = () => {
    return async (dispatch) => {
        dispatch(startLoading());
        const token = localStorage.getItem("token");

        if (!token) {
            return dispatch(setLogout());
        }

        try {
            const { data } = await Fetch.get("/users/renew");

            localStorage.setItem("token", data.token);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(setLogin({ uid: data.uid, name: data.name }));
        } catch (error) {
            dispatch(setLogout());
            localStorage.clear();
        }
    };
};
