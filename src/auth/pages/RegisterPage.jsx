import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";
import { Link, Link as RouterLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Fetch from "../../api/Fetch";
import { useForm } from "../../hooks/useFrom";
import { AuthLayout } from "../layout/AuthLayout";

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [showPasswords, setShowPasswords] = useState({
        password: false,
        confirmPassword: false,
    });
    const [showPasswordError, setShowPasswordErrorors] = useState({
        password: false,
        confirmPassword: false,
    });

    const [showErrors, setShowErrors] = useState({});

    const handleClickShowPassword = () => {
        setShowPasswords({
            ...showPasswords,
            password: !showPasswords.password,
        });
    };

    const handleClickShowConfirmPassword = () => {
        setShowPasswords({
            ...showPasswords,
            confirmPassword: !showPasswords.confirmPassword,
        });
    };

    const [formValues, handleInputChange] = useForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { name, email, password, confirmPassword } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setShowPasswordErrorors({
                ...showErrors,
                password: true,
                confirmPassword: true,
            });
        } else {
            Fetch.post("/users/register", {
                name,
                email,
                password,
                confirmPassword,
            })
                .then((response) => {
                    toast.success(response.data.msg, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });

                    navigate("/auth/login");
                })
                .catch((error) => {
                    if (error.response.data.errors) {
                        setShowErrors(error.response.data.errors);
                    }
                });
        }
    };

    return (
        <AuthLayout title="Sign Up">
            {showPasswordError.password && showPasswordError.confirmPassword && <Alert severity="error">Passwords do not match</Alert>}
            <form onSubmit={handleSubmit} className="animate__animated animate__fadeIn animate__faster">
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <TextField
                            id="name"
                            label="Name"
                            type="text"
                            name="name"
                            placeholder="Kevin Palomino"
                            value={name}
                            size="small"
                            fullWidth
                            sx={{ mt: 2 }}
                            onChange={handleInputChange}
                            error={showErrors.name}
                        />
                        {showErrors.name && <FormHelperText sx={{ mt: 1, color: "red" }}>{showErrors.name.msg}</FormHelperText>}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="user"
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="example@example.com"
                            value={email}
                            size="small"
                            fullWidth
                            sx={{ mt: 3 }}
                            onChange={handleInputChange}
                            error={showErrors.email}
                        />
                        {showErrors.email && <FormHelperText sx={{ mt: 1, color: "red" }}>{showErrors.email.msg}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{ mt: 3 }} variant="outlined" fullWidth size="small">
                            <InputLabel htmlFor="outlined-adornment-password" error={showErrors.password}>
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPasswords.password ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                                            {showPasswords.password ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                value={password}
                                onChange={handleInputChange}
                                name="password"
                                error={showErrors.password || showPasswordError.password}
                            />
                        </FormControl>
                        {showErrors.password && <FormHelperText sx={{ mt: 1, color: "red" }}>{showErrors.password.msg}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{ mt: 3 }} variant="outlined" fullWidth size="small">
                            <InputLabel htmlFor="outlined-adornment-password" error={showErrors.confirmPassword}>
                                Repeat Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPasswords.confirmPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowConfirmPassword} edge="end">
                                            {showPasswords.confirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Repeat Password"
                                value={confirmPassword}
                                onChange={handleInputChange}
                                name="confirmPassword"
                                error={showErrors.confirmPassword || showPasswordError.confirmPassword}
                            />
                        </FormControl>
                        {showErrors.confirmPassword && <FormHelperText sx={{ mt: 1, color: "red" }}>{showErrors.confirmPassword.msg}</FormHelperText>}
                    </Grid>
                    <Grid container spacing={0} sx={{ mt: 2 }}>
                        <Grid item xs={12} sm={12}>
                            <Button variant="contained" color="primary" fullWidth type="submit">
                                Sing Up
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="end" sx={{ mt: 2, fontSize: "15px" }}>
                        <Link component={RouterLink} color="inherit" to="/auth/login">
                            Back
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};
