import { useState } from "react";
import Tasks from "./widgets/TaskWidget";
import UpcomingAppointments from "./widgets/UpcomingAppointments";
import RecentCampaigns from "./widgets/RecentCampaigns";
import TaskDialog from "../tasks/TaskDialog";

import Grid from "@mui/material/Grid";
import { useMediaQuery, useTheme } from "@mui/material";

const Dashboard = () => {
  const { breakpoints } = useTheme();
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
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
      <Tasks setDialogOpen={() => setTaskDialogOpen(true)} />
      <UpcomingAppointments />
      <RecentCampaigns />
      <TaskDialog
        open={taskDialogOpen}
        onClose={() => {
          setTaskDialogOpen(false);
        }}
      />
    </Grid>
  );
};

export default Dashboard;
