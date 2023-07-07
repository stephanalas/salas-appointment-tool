import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UpcomingAppointments from "./UpcomingAppointments";

const Dashboard = () => {
  return (
    <Grid container>
      <Grid item container direction="row">
        <Paper
          sx={{
            minWidth: "25vw",
            maxWidth: "100%",
            paddingTop: ".5rem",
            paddingBottom: ".5rem",
          }}
        >
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Typography>todays tasks: 5</Typography>
            </Grid>
            <Grid item>
              <Typography>urgent tasks: 2</Typography>
            </Grid>

            <Grid item>
              <Button variant="contained">Create Task</Button>
            </Grid>
          </Grid>
        </Paper>
        <UpcomingAppointments />
      </Grid>
      <Grid item container>
        campaign component
      </Grid>
    </Grid>
  );
};

export default Dashboard;
