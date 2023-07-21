import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import ProfileDialog from "./ProfileDialog";
import { useGetAllProfilesQuery } from "../../store/api";
import { Skeleton } from "@mui/material";

const columns: GridColDef[] = [
  {
    field: "fullName",
    headerName: "Name",
    width: 200,
    valueGetter(params) {
      return params.row.firstName + " " + params.row.lastName;
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phoneNumber",
    headerName: "Phone",
    width: 125,
  },
  {
    field: "industry",
    headerName: "Industry",
    width: 200,
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

const Profiles = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.down("sm"));
  const { data, isLoading } = useGetAllProfilesQuery();
  // TODO: PROFILE DIALOG SHOULD OPEN WHEN ROW IS CLICKED
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
          <DataGrid columns={columns} rows={data || []} />
        )}
      </Grid>
    </Grid>
  );
};

export default Profiles;
