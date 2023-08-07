import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "../../hooks/useFrom";
import { startLoadingLogin } from "../../store/auth/thunks";
import { AuthLayout } from "../layout/AuthLayout";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const [formValues, handleInputChange] = useForm({
        email: "",
        password: "",
    });

    const { email, password } = formValues;

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(startLoadingLogin(email, password));
    };

    return (
        <AuthLayout title="Iniciar Sesión">
            <form onSubmit={handleSubmit} className="animate__animated animate__fadeIn animate__faster">
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <TextField
                            id="user"
                            label="Correo"
                            type="email"
                            name="email"
                            placeholder="ejemplo@ejemplo.com"
                            size="small"
                            fullWidth
                            value={email}
                            sx={{ mt: 2 }}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{ mt: 3 }} variant="outlined" fullWidth size="small">
                            <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Contraseña"
                                value={password}
                                onChange={handleInputChange}
                                name="password"
                            />
                        </FormControl>
                    </Grid>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={12} sm={12}>
                            <Button variant="contained" color="primary" fullWidth type="submit">
                                Ingresar
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="end" sx={{ mt: 2, fontSize: "15px" }}>
                        <Link component={RouterLink} color="inherit" to="/auth/register">
                            Crear una Cuenta
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};
