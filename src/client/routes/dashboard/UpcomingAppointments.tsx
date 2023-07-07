import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// type rowData = {
//     fullName: string

// }

const columns: GridColDef[] = [
  {
    field: "fullName",
    headerName: "Name",
    width: 100,
  },
  {
    field: "Date",
    headerName: "Date",
    width: 100,
  },
  //   {

  //   }
  {
    field: "phoneNumber",
    headerName: "Cellphone",
    width: 150,
  },
];

const UpcomingAppointments = () => {
  return (
    <Grid item container>
      <Grid item>
        <Typography variant="h5"> Upcoming Appointments</Typography>
      </Grid>
      <Grid item>
        <div>hello</div>
      </Grid>
    </Grid>
  );
};

export default UpcomingAppointments;
