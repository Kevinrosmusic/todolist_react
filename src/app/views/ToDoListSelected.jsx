import { Alert, Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import { startTransition, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useFrom";
import { addTask, updatedTask } from "../../store/lists/thunks";

export const ToDoListSelected = ({ todolist }) => {
    const dispatch = useDispatch();
    const { tasks, name: title } = todolist;
    const [error, setError] = useState({
        error: false,
        msg: "",
    });

    const [formValues, handleInputChange] = useForm();
    const { newTask } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newTask == undefined || newTask == "") {
            console.log("error");
            setError({
                error: true,
                msg: "El nombre de la lista no puede estar vacio",
            });
        } else {
            startTransition(() => {
                dispatch(addTask(todolist.id, newTask));
            });
            setError({
                error: false,
            });
        }
    };

    const handleDone = (id) => {
        startTransition(() => {
            dispatch(updatedTask(id, todolist.id));
        });
    };

    return (
        <Grid container spacing={5}>
            <Grid item xs={12}>
                <Typography variant="h5" color="initial">
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={8}>
                {tasks.length === 0 ? (
                    <Alert severity="info" className="animate__animated animate__fadeIn animate__faster">
                        Usted no posee tareas creadas aun!
                    </Alert>
                ) : (
                    tasks.map((task) => (
                        <Grid item xs={12} key={task.id}>
                            <Paper sx={{ p: 3, mb: 2 }} className="animate__animated animate__fadeIn animate__faster">
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Box>
                                        <FormControlLabel
                                            control={<Checkbox checked={task.done == 0 ? false : true} onClick={() => handleDone(task.id)} />}
                                            label={task.title}
                                            sx={{
                                                textDecoration: task.done == 0 ? "none" : "line-through",
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    ))
                )}
            </Grid>
            <Grid item xs={4}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <form onSubmit={handleSubmit}>
                            <Typography
                                variant="body1"
                                color="initial"
                                sx={{
                                    mb: 2,
                                }}
                            >
                                Agregar nueva Tarea
                            </Typography>
                            <TextField id="outlined-basic" label="Tarea" value={newTask} name="newTask" size="small" fullWidth onChange={handleInputChange} error={error.error} />
                            {error && (
                                <Typography color="error" sx={{ mt: 1, fontSize: "13px" }}>
                                    {error.msg}
                                </Typography>
                            )}
                            <Box sx={{ mt: 2, display: "flex", direction: "row", justifyContent: "end" }}>
                                <Button variant="contained" color="primary" size="small" type="submit">
                                    Agregar
                                </Button>
                            </Box>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
};
