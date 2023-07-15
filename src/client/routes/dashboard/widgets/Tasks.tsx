import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useMediaQuery, useTheme } from "@mui/material";

const Tasks = () => {
  const { breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.down("md"));
  return (
    <Grid
      item
      sx={{
        width: matches ? "inherit" : "30vw",
      }}
    >
      <Typography variant="h5">Tasks</Typography>
      <Paper
        sx={{
          paddingTop: ".5rem",
          paddingBottom: ".5rem",
        }}
      >
        <Grid
          container
          alignItems={"center"}
          justifyContent={"center"}
          direction={"column"}
        >
          <Grid item>
            <Typography>todays tasks: 5</Typography>
          </Grid>
          <Grid item>
            <Typography>urgent tasks: 2</Typography>
          </Grid>

          <Grid item>
            <Button variant="contained">Create Task</Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Tasks;
