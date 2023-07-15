import Grid from "@mui/material/Grid";
import Tasks from "./widgets/Tasks";
import UpcomingAppointments from "./widgets/UpcomingAppointments";
import { useMediaQuery, useTheme } from "@mui/material";
import RecentCampaigns from "./widgets/RecentCampaigns";

const Dashboard = () => {
  const { breakpoints } = useTheme();
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
      <Tasks />
      {/* upcoming appointments has grid item container as parent element*/}
      <UpcomingAppointments />
      <RecentCampaigns />
    </Grid>
  );
};

export default Dashboard;
