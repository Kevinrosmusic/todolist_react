import { Box, Toolbar } from "@mui/material";
import { startTransition, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingLists } from "../../store/lists/thunks";
import { Navbar, SideBar } from "../components";

const drawerWidth = 280;

export const AppLayout = ({ children }) => {
    const dispatch = useDispatch();
    const { uid } = useSelector((state) => state.auth.user);

    useEffect(() => {
        startTransition(() => {
            dispatch(startLoadingLists(uid));
        });
    }, [dispatch, uid]);

    return (
        <Box sx={{ display: "flex" }} className="animate__animated animate__ animate__faster">
            <Navbar drawerWidth={drawerWidth} />
            <SideBar drawerWidth={drawerWidth} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};
