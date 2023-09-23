import { useState } from "react";
import Tasks from "./widgets/TaskWidget";
import UpcomingAppointments from "./widgets/UpcomingAppointments";
import RecentCampaigns from "./widgets/RecentCampaigns";
import TaskDialog from "../tasks/TaskDialog";

import Grid from "@mui/material/Grid";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import DropzoneDialog from "./widgets/DropzoneModal";

const Dashboard = () => {
  const { breakpoints } = useTheme();
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const matches = useMediaQuery(breakpoints.down("md"));
  return (
    <Grid
      item
      container
      direction="row"
      spacing={2}
      justifyContent="space-around"
      sx={{
        margin: matches ? 0 : "1rem",
      }}
    >
      <Grid>
        <Tasks setDialogOpen={() => setTaskDialogOpen(true)} />
        <Grid
          item
          container
          justifyContent="center"
          direction="row"
          sx={{
            marginTop: "2rem",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              setImportDialogOpen(true);
            }}
          >
            import profiles
          </Button>
        </Grid>
      </Grid>
      <UpcomingAppointments />
      <RecentCampaigns />
      <TaskDialog
        open={taskDialogOpen}
        onClose={() => {
          setTaskDialogOpen(false);
        }}
        task={null}
      />
      <DropzoneDialog
        open={importDialogOpen}
        onClose={() => {
          setImportDialogOpen(false);
        }}
      />
    </Grid>
  );
};

export default Dashboard;
