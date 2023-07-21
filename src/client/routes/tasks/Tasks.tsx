import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Profile, useGetAllProfilesQuery } from "../../store/api";
import { Skeleton } from "@mui/material";

const columns: GridColDef[] = [
  {
    field: "status",
    headerName: "Status",
    width: 200,
  },
  {
    field: "profile",
    headerName: "Profile",
    width: 200,
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
  },
  {
    field: "notes",
    headerName: "Notes",
    width: 300,
  },
];

const Tasks = () => {
  //   const [dialogOpen, setDialogOpen] = useState(false);
  //   const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const { breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.down("sm"));
  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    // setSelectedProfile(params.row);
    // setDialogOpen(true);
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
          >
            Create Task
          </Button>
        </Grid>
      </Grid>
      <Grid item sx={{ height: "50vh", width: "100%" }}>
        {/* {isLoading ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={"50vh"}
            sx={{
              padding: "1rem",
            }}
          />
        ) : (
          <DataGrid columns={columns} rows={[]} onRowClick={handleRowClick} />
        )} */}
        <DataGrid columns={columns} rows={[]} />
      </Grid>
    </Grid>
  );
};

export default Tasks;
