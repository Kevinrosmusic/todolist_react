import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { startTransition, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../hooks/useFrom";
import { createList } from "../../../store/lists/thunks";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export const Modals = ({ setOpen, open }) => {
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const { uid } = useSelector((state) => state.auth.user);
    const [error, setError] = useState({
        error: false,
        msg: "",
    });

    const [formValues, handleInputChange] = useForm();
    const { name } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
        if (name == undefined || name == "") {
            console.log("error");
            startTransition(() => {
                setError({
                    error: true,
                    msg: "El nombre de la lista no puede estar vacio",
                });
            });
        } else {
            startTransition(() => {
                dispatch(createList(name, uid, setOpen));
            });
        }
    };

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <form onSubmit={handleSubmit}>
                <Box sx={style}>
                    <TextField id="todolist" label="Nombre de la To Do List" value={name} name="name" onChange={handleInputChange} size="small" fullWidth error={error.error} />
                    {error && (
                        <Typography color="error" sx={{ mt: 1, fontSize: "13px" }}>
                            {error.msg}
                        </Typography>
                    )}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 2,
                        }}
                    >
                        <Button variant="contained" size="small" color="primary" type="submit">
                            Crear Lista
                        </Button>
                    </Box>
                </Box>
            </form>
        </Modal>
    );
};
