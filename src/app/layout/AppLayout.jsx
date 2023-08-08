import { Box, Toolbar } from "@mui/material";
import { Suspense, startTransition, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingLists } from "../../store/lists/thunks";
import { Spinner } from "../../ui/components/spinner/Spinner";
import { Navbar, SideBar } from "../components";

const drawerWidth = 280;

export const AppLayout = ({ children }) => {
    const dispatch = useDispatch();
    const { uid } = useSelector((state) => state.auth.user);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        startTransition(() => {
            dispatch(startLoadingLists(uid));
        });
    }, [dispatch, uid]);

    return (
        <Box sx={{ display: "flex" }}>
            <Navbar drawerWidth={drawerWidth} setOpen={setOpen} />
            <SideBar drawerWidth={drawerWidth} open={open} setOpen={setOpen} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Suspense fallback={<Spinner />}>{children}</Suspense>
            </Box>
        </Box>
    );
};
