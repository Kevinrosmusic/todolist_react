import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToDoListRoutes } from "../app/routes/ToDoListRoutes";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { checkAuthtoken } from "../helpers/checkToken";
import { Spinner } from "../ui/components/spinner/Spinner";

export const AppRouter = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(checkAuthtoken());
    }, [dispatch]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Routes>
            {!isAuthenticated ? (
                <>
                    <Route path="/auth/*" element={<AuthRoutes />} />
                    <Route path="/*" element={<Navigate to="/auth/login" />} />
                </>
            ) : (
                <>
                    <Route path="/" element={<ToDoListRoutes />} />
                    <Route path="/*" element={<Navigate to="/" />} />
                </>
            )}
        </Routes>
    );
};
