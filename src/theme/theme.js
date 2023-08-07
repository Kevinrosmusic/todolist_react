import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#dc004e",
        },
        error: {
            main: red.A400,
        },
        background: {
            default: "#f2f2f2",
        },
    },
});
