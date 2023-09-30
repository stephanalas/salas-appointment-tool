import { useState } from "react";
import Grid from "@mui/material/Grid";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import ProfileDialog from "./ProfileDialog";
import { Profile, useGetAllProfilesQuery } from "../../store/api";
import { Skeleton } from "@mui/material";
import TableContainer from "../../common/TableContainer";

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
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const { data, isLoading } = useGetAllProfilesQuery();
  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    setSelectedProfile(params.row);
    setDialogOpen(true);
  };

  const handleButtonClick = () => {
    setSelectedProfile(null);
    setDialogOpen(!dialogOpen);
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
          rows={data || []}
          onRowClick={handleRowClick}
        />
      )}
    </Grid>
  );

  return (
    <>
      <TableContainer
        children={children}
        label="Profile"
        hasButton
        onButtonClick={handleButtonClick}
      />
      <ProfileDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedProfile(null);
        }}
        profile={selectedProfile ? selectedProfile : null}
      />
    </>
  );
};

export default Profiles;
