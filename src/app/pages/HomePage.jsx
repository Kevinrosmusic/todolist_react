import { AddOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Modals } from "../../ui/components/spinner/Modals";
import { AppLayout } from "../layout/AppLayout";
import { NothingSelected, ToDoListSelected } from "../views";

export const HomePage = () => {
    const [open, setOpen] = useState(false);
    const { active } = useSelector((state) => state.toDoList);

    const handleOpen = () => setOpen(true);

    return (
        <AppLayout>
            {active ? <ToDoListSelected todolist={active} /> : <NothingSelected />}

            <Tooltip title="Crear nueva Lista" placement="left">
                <IconButton
                    size="large"
                    sx={{
                        color: "white",
                        backgroundColor: "error.main",
                        ":hover": {
                            backgroundColor: "error.main",
                            opacity: 0.9,
                        },
                        position: "fixed",
                        right: 50,
                        bottom: 50,
                    }}
                    onClick={handleOpen}
                >
                    <AddOutlined
                        sx={{
                            fontSize: 40,
                        }}
                    />
                </IconButton>
            </Tooltip>
            <Modals open={open} setOpen={setOpen} />
        </AppLayout>
    );
};
