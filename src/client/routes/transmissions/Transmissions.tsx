import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetAllTransmissionsQuery } from "../../store/api";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
  },
  {
    field: "sentTo",
    headerName: "Sent To",
  },
  {
    field: "isAppointment",
    headerName: "Appointment",
  },
  {
    field: "transmissionType",
    headerName: "Stage",
  },
  {
    field: "date",
    headerName: "Date",
  },
  {
    field: "time",
    headerName: "Time",
  },
  {
    field: "status",
    headerName: "Status",
  },
];

const Transmissions = () => {
  const { data, isLoading } = useGetAllTransmissionsQuery();

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
          <Typography variant="h5">Transmissions</Typography>
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
            rows={data || []} // rows need to be transform for columns in api
            // onRowClick={handleRowClick}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Transmissions;
