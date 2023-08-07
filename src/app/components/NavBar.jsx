import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLogout } from "../../store/auth/authSlice";

export const Navbar = ({ drawerWidth }) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setLogout());
        localStorage.clear();
    };
    return (
        <AppBar
            position="fixed"
            sx={{
                width: {
                    sm: `calc(100% - ${drawerWidth}px)`,
                },
                ml: {
                    sm: `${drawerWidth}px`,
                },
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    sx={{
                        mr: 2,
                        display: {
                            xs: "block",
                            sm: "none",
                        },
                    }}
                >
                    <MenuOutlined />
                </IconButton>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" noWrap component="div" sx={{ color: "white" }}>
                        ToDoList APP
                    </Typography>

                    <IconButton sx={{ color: "white" }} onClick={handleLogout}>
                        <LogoutOutlined />
                    </IconButton>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};
