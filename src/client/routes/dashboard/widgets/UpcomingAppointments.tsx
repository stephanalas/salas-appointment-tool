import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMediaQuery, useTheme } from "@mui/material";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
type rowData = {
  id: number;
  fullName: string;
  date: string;
  phoneNumber: string;
};

const columns: GridColDef[] = [
  {
    field: "fullName",
    headerName: "Name",
    width: 200,
  },
  {
    field: "date",
    headerName: "Date",
    width: 100,
  },
  {
    field: "time",
    headerName: "Time",
    width: 125,
  },
  {
    field: "phoneNumber",
    headerName: "Cellphone",
    width: 150,
  },
];
const rows: rowData[] = [];

const generateFakeRows = () => {
  let times = 5;
  while (times) {
    const date = DateTime.now()
      .plus({ days: times, hours: times })
      .toFormat("MM/dd/yyyy hh:mm a");
    const row = {
      id: times,
      fullName: faker.person.fullName(),
      date: date.slice(0, 10),
      time: date.slice(10),
      phoneNumber: faker.phone.number("###-###-####"),
    };
    rows.push(row);

    times -= 1;
  }
};
generateFakeRows();

// TODO: populate data with appointments from db
// appointments within 30 days
const UpcomingAppointments = () => {
  const { breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.down("md"));
  return (
    <Grid
      item
      container
      sx={{
        width: matches ? "100%" : "40vw",
      }}
      direction="column"
    >
      <Grid item>
        <Typography variant="h5"> Upcoming Appointments</Typography>
      </Grid>
      <Grid item sx={{ height: "50vh", width: "100%" }}>
        <DataGrid columns={columns} rows={rows} />
      </Grid>
    </Grid>
  );
};

export default UpcomingAppointments;
