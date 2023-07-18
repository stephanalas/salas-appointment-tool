import { useState } from "react";
import { faker } from "@faker-js/faker";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import ProfileDialog from "./ProfileDialog";

type RowData = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  industry: string;
  location: string;
  stage: string;
  notes: string;
};

const columns: GridColDef[] = [
  {
    field: "fullName",
    headerName: "Name",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 125,
  },
  {
    field: "industry",
    headerName: "Industry",
    width: 200,
  },
  {
    field: "location",
    headerName: "Location",
    width: 150,
  },
  {
    field: "stage",
    headerName: "Stage",
    width: 100,
  },
  {
    field: "notes",
    headerName: "Notes",
    width: 250,
  },
];

const rows: RowData[] = [];

const generateFakeRows = () => {
  let times = 5;
  const stages = ["PROSPECT", "CLIENT"];
  while (times) {
    const { person, phone, lorem, location, internet, company } = faker;
    const row = {
      id: times,
      fullName: person.fullName(),
      phone: phone.number("###-###-####"),
      email: internet.email(),
      industry: company.buzzPhrase(),
      location: location.city(),
      stage: times % 2 == 0 ? stages[0] : stages[1],
      notes: lorem.sentence({ min: 6, max: 10 }),
    };
    rows.push(row);
    times -= 1;
  }
};

generateFakeRows();
const Profiles = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.down("sm"));
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
          <Typography variant="h5"> Profiles</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              width: matches ? "50vw" : "10vw",
            }}
            onClick={() => setDialogOpen(!dialogOpen)}
          >
            Add profile
          </Button>
          <ProfileDialog
            open={dialogOpen}
            onClose={() => {
              setDialogOpen(false);
            }}
          />
        </Grid>
      </Grid>
      <Grid item sx={{ height: "50vh", width: "100%" }}>
        <DataGrid columns={columns} rows={rows} />
      </Grid>
    </Grid>
  );
};

export default Profiles;
