import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useMediaQuery, useTheme } from "@mui/material";
import {
  useGetUncompleteTaskCountQuery,
  useGetUrgentTaskCountQuery,
} from "../../../store/api";
import Skeleton from "@mui/material/Skeleton";
type TaskWidgetProps = {
  setDialogOpen: () => void;
};

const TaskWidget = (props: TaskWidgetProps) => {
  const { data: uncompletedCount, isLoading: uncompletedLoading } =
    useGetUncompleteTaskCountQuery();
  const { data: urgentCount, isLoading: urgentLoading } =
    useGetUrgentTaskCountQuery();
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
      {urgentLoading || uncompletedLoading ? (
        <Skeleton variant="rectangular" width="100%" height="13ch" />
      ) : (
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
              <Typography>
                Uncompleted tasks: {uncompletedCount?.count}
              </Typography>
            </Grid>
            <Grid item>
              <Typography>Urgent tasks: {urgentCount?.count}</Typography>
            </Grid>

            <Grid item>
              <Button variant="contained" onClick={setDialogOpen}>
                Create Task
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default TaskWidget;
