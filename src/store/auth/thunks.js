import { toast } from "react-toastify";
import Fetch from "../../api/Fetch";
import { setLogin, setLogout, startLoading } from "./authSlice";

export const startLoadingLogin = (email, password) => {
    return async (dispatch) => {
        dispatch(startLoading());
        await Fetch.post("/users/login", { email, password })
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("token-init-date", new Date().getTime());

                dispatch(
                    setLogin({
                        uid: res.data.uid,
                        name: res.data.name,
                    })
                );
            })
            .catch((error) => {
                dispatch(setLogout());
                toast.error(error.response.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
    };
};
