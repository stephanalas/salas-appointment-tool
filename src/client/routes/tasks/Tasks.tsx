import { useState } from "react";
import Grid from "@mui/material/Grid";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { Task, useGetAllTasksQuery } from "../../store/api";
import { Skeleton } from "@mui/material";
import TaskDialog from "./TaskDialog";
import CheckIcon from "@mui/icons-material/Check";
import { DateTime } from "luxon";
import TableContainer from "../../common/TableContainer";

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

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    // setSelectedProfile(params.row);
    setSelectedTask(params.row);
    setDialogOpen(true);
  };

  const handleButtonClick = () => {
    setDialogOpen(true);
  };

  const children = (
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
          rows={
            data?.map((task) => {
              return {
                ...task,
                deadline: task.deadline
                  ? DateTime.fromISO(task.deadline as string)
                  : null,
              };
            }) || []
          }
          onRowClick={handleRowClick}
        />
      )}
    </Grid>
  );

  return (
    <>
      <TableContainer
        children={children}
        label="Task"
        hasButton
        onButtonClick={handleButtonClick}
      />
      <TaskDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask ? selectedTask : null}
      />
    </>
  );
};

export default Tasks;
