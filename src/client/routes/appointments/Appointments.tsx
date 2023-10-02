import { useState } from "react";
import Grid from "@mui/material/Grid";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { Appointment, useGetAllAppointmentsQuery } from "../../store/api";
import Skeleton from "@mui/material/Skeleton";
import CheckIcon from "@mui/icons-material/Check";
import { DateTime } from "luxon";
import AppointmentDialog from "./AppointmentDialog";
import TableContainer from "../../common/TableContainer";

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
  {
    field: "isCancelled",
    headerName: "Cancelled",
    renderCell: (params) => {
      return params.value ? <CheckIcon /> : null;
    },
  },
];

const Appointments = () => {
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data, isLoading } = useGetAllAppointmentsQuery();

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    setSelectedAppointment(params.row);
    setDialogOpen(true);
  };

  const handleButtonClick = () => {
    setSelectedAppointment(null);
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
  );

  return (
    <>
      <TableContainer
        children={children}
        label="Appointment"
        hasButton
        onButtonClick={handleButtonClick}
      />
      <AppointmentDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        appointment={selectedAppointment ? selectedAppointment : null}
      />
    </>
  );
};

export default Appointments;
