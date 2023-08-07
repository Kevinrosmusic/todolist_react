import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppRouter } from "./router/AppRouter";
import { store } from "./store";
import { AppTheme } from "./theme";

export const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppTheme>
                    <AppRouter />
                    <ToastContainer />
                </AppTheme>
            </BrowserRouter>
        </Provider>
    );
};
