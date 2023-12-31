import { CircularProgress, Grid } from "@mui/material";

export const Spinner = () => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{
                minHeight: "100vh",
                backgroundColor: "primary.main",
                padding: 4,
            }}
        >
            <Grid item>
                <CircularProgress sx={{ color: "white" }} />
            </Grid>
        </Grid>
    );
};
