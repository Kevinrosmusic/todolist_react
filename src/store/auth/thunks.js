import { toast } from "react-toastify";
import Fetch from "../../api/Fetch";
import { setLogin, setLogout, startLoading } from "./authSlice";

export const startLoadingLogin = (email, password) => {
    return async (dispatch) => {
        dispatch(startLoading());
        await Fetch.post("/users/login", { email, password })
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("token-init-date", new Date().getTime());

                dispatch(
                    setLogin({
                        uid: response.data.uid,
                        name: response.data.name,
                    })
                );
            })
            .catch((error) => {
                dispatch(setLogout());
                toast.error("Ha ocurrido un error inesperado porfavor intente mas tarde", {
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
