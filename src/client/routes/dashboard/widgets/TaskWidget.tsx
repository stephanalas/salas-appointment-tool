import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useMediaQuery, useTheme } from "@mui/material";

type TaskWidgetProps = {
  setDialogOpen: () => void;
};

// TODO: task widget should get accurate count of tasks and urgent tasks
// setup rtk hook
// styling maybe use a circle progress bar to show task as well. if 0 task progress bar is filled
const TaskWidget = (props: TaskWidgetProps) => {
  const { setDialogOpen } = props;
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
          height: "13ch",
        }}
      >
        <Grid
          container
          alignItems={"center"}
          justifyContent={"center"}
          direction={"column"}
          spacing={1}
        >
          <Grid item>
            <Typography>todays tasks: 5</Typography>
          </Grid>
          <Grid item>
            <Typography>urgent tasks: 2</Typography>
          </Grid>

          <Grid item>
            <Button variant="contained" onClick={setDialogOpen}>
              Create Task
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default TaskWidget;
