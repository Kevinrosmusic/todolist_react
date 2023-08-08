import { Delete, TurnedInNot } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Toolbar, Typography } from "@mui/material";
import { startTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteList, startLoadingListById } from "../../store/lists/thunks";

export const SideBar = ({ drawerWidth = 240, open, setOpen }) => {
    const dispatch = useDispatch();
    const { lists } = useSelector((state) => state.toDoList);
    const { uid, name } = useSelector((state) => state.auth.user);

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSelectList = (id) => {
        startTransition(() => {
            dispatch(startLoadingListById(id));
        });

        setOpen(false);
    };

    const handleDelete = (id) => {
        setOpen(false);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to reverse this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Deleted!", "The record has been deleted", "success").then((result) => {
                    if (result.isConfirmed) {
                        dispatch(deleteList(id, uid));
                    }
                });
            }
        });
    };

    return (
        <Box
            component="nav"
            sx={{
                width: { md: drawerWidth },
                flexShrink: {
                    sm: 0,
                },
            }}
        >
            <Drawer
                variant="persistent"
                open
                sx={{
                    display: {
                        xs: open ? "block" : "none",
                        sm: open ? "block" : "none",
                        md: "block",
                    },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                        backgroundColor: "black",
                    },
                }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h6" color="white" noWrap component="div">
                        {name}
                    </Typography>
                    <IconButton
                        onClick={handleDrawerClose}
                        sx={{
                            display: {
                                md: "none",
                            },
                        }}
                    >
                        <ChevronLeftIcon sx={{ color: "white" }} />
                    </IconButton>
                </Toolbar>
                <Divider color="white" />
                <Box>
                    <List sx={{ mt: 1 }}>
                        {lists.map((list) => (
                            <Box className="img-container" key={list.id}>
                                <Paper
                                    sx={{ mt: 1, m: 2 }}
                                    onClick={() => {
                                        handleSelectList(list.id);
                                    }}
                                >
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <TurnedInNot />
                                            </ListItemIcon>
                                            <Grid container>
                                                <ListItemText
                                                    sx={{
                                                        fontSize: 10,
                                                    }}
                                                    secondary={list.name}
                                                />
                                            </Grid>
                                        </ListItemButton>
                                    </ListItem>
                                </Paper>
                                <Box className="icon">
                                    <IconButton
                                        aria-label=""
                                        size="small"
                                        onClick={() => {
                                            handleDelete(list.id);
                                        }}
                                    >
                                        <Delete sx={{ color: "white", padding: 0 }} />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
};
