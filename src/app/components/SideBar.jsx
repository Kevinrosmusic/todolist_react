import { Delete, TurnedInNot } from "@mui/icons-material";
import { Box, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Toolbar, Typography } from "@mui/material";
import { startTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteList, startLoadingListById } from "../../store/lists/thunks";

export const SideBar = ({ drawerWidth = 240 }) => {
    const dispatch = useDispatch();
    const { lists } = useSelector((state) => state.toDoList);
    const { uid, name } = useSelector((state) => state.auth.user);

    const handleSelectList = (id) => {
        startTransition(() => {
            dispatch(startLoadingListById(id));
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Estas seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminarlo!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Eliminado!", "El registro ha sido eliminado", "success").then((result) => {
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
                width: { sm: drawerWidth },
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
                        xs: "block",
                    },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                        backgroundColor: "black",
                    },
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="white" noWrap component="div">
                        {name}
                    </Typography>
                </Toolbar>
                <Divider color="white" />
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
            </Drawer>
        </Box>
    );
};
