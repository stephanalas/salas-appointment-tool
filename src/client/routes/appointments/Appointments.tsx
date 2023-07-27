import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Appointment, useGetAllAppointmentsQuery } from "../../store/api";
import { Skeleton } from "@mui/material";
import { DateTime } from "luxon";
import AppointmentDialog from "./AppointmentDialog";

const columns: GridColDef[] = [
  {
    field: "profile",
    headerName: "Full name",
    width: 150,
    valueFormatter: (params) => {
      if (params.value) {
        const { firstName, lastName } = params.value;
        return `${firstName} ${lastName}`;
      } else return null;
    },
  },
  {
    field: "dateTime",
    headerName: "dateTime",
    width: 200,
    valueFormatter: (params) => {
      return params.value.toLocaleString(DateTime.DATETIME_SHORT);
    },
  },
  {
    field: "contact",
    headerName: "Contact",
    width: 200,
  },
  {
    field: "notes",
    headerName: "Notes",
    width: 300,
  },
];

const Appointments = () => {
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data, isLoading } = useGetAllAppointmentsQuery();
  const { breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.down("sm"));
  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    setSelectedAppointment(params.row);
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
          <Typography variant="h5">Appointments</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              width: matches ? "50vw" : "10vw",
            }}
            onClick={() => {
              setSelectedAppointment(null);
              setDialogOpen(true);
            }}
          >
            Create Appointment
          </Button>
          <AppointmentDialog
            open={dialogOpen}
            onClose={() => {
              setDialogOpen(false);
            }}
            appointment={selectedAppointment ? selectedAppointment : null}
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
            rows={
              data?.map((appointment) => {
                const { profile } = appointment;
                return {
                  ...appointment,
                  dateTime: DateTime.fromISO(appointment.dateTime as string),
                  contact: profile
                    ? profile.phoneNumber
                      ? profile.phoneNumber
                      : profile.email
                    : null,
                };
              }) || []
            }
            onRowClick={handleRowClick}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Appointments;
