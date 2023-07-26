import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Task, useGetAllTasksQuery } from "../../store/api";
import { Skeleton } from "@mui/material";
import TaskDialog from "./TaskDialog";
import CheckIcon from "@mui/icons-material/Check";
import { DateTime } from "luxon";

const columns: GridColDef[] = [
  {
    field: "completed",
    headerName: "Completed",
    width: 100,
    renderCell: (params) => {
      return params.value ? <CheckIcon /> : null;
    },
    align: "center",
  },
  {
    field: "profile",
    headerName: "Profile",
    width: 200,
    // render different value
    valueFormatter: (params) => {
      const { firstName, lastName } = params.value;
      const fullname = `${firstName} ${lastName}`;
      return fullname;
    },
  },
  {
    field: "urgency",
    headerName: "Urgency",
    width: 125,
  },
  {
    field: "deadline",
    headerName: "Deadline",
    width: 200,
    valueFormatter: (params) => {
      if (params.value) {
        return DateTime.fromISO(params.value).toFormat("MM/dd/yyyy");
      } else return null;
    },
  },
  {
    field: "description",
    headerName: "Description",
    width: 300,
  },
];

const Tasks = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data, isLoading } = useGetAllTasksQuery();
  const { breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.down("sm"));
  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    // setSelectedProfile(params.row);
    setSelectedTask(params.row);
    setDialogOpen(true);
  };
  return (
    <Grid
      item
      container
      direction="column"
      justifyContent="center"
      sx={{ padding: "1rem" }}
    >
      <Grid
        item
        container
        justifyContent="space-between"
        sx={{
          marginBottom: "1rem",
        }}
      >
        <Grid item>
          <Typography variant="h5"> Tasks</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              width: matches ? "50vw" : "10vw",
            }}
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            Create Task
          </Button>
          <TaskDialog
            open={dialogOpen}
            onClose={() => {
              setDialogOpen(false);
              setSelectedTask(null);
            }}
            task={selectedTask ? selectedTask : null}
          />
        </Grid>
      </Grid>
      <Grid item sx={{ height: "50vh", width: "100%" }}>
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={"50vh"}
            sx={{
              padding: "1rem",
            }}
          />
        ) : (
          <DataGrid
            columns={columns}
            rows={data || []}
            onRowClick={handleRowClick}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Tasks;
