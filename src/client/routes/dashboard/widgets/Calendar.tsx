import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// TODO: add react suite calendar
// onrowclick should open a dialog with list of appointments for the day in order of when it starts

const Calendar = () => {
  return (
    <Grid
      item
      container
      direction="column"
      sx={{
        minWidth: "100%",
      }}
    >
      <Grid item>
        <Typography variant="h5">Calendar</Typography>
      </Grid>
      <Grid item>Under construction</Grid>
    </Grid>
  );
};

export default Calendar;
