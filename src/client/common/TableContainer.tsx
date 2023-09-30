import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";
import Button from "@mui/material/Button";

type PropsType = {
  children: JSX.Element;
  label: string;
  hasButton: boolean;
  onButtonClick?: () => void;
};

const TableContainer = (props: PropsType) => {
  const { children, label, hasButton, onButtonClick } = props;
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
          <Typography
            variant="h5"
            sx={{
              marginBottom: !hasButton ? ".5rem" : null,
            }}
          >
            {" "}
            {label + "s"}{" "}
          </Typography>
        </Grid>
        {hasButton && (
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                width: matches ? "50vw" : "10vw",
                marginBottom: ".5rem",
              }}
              onClick={onButtonClick}
            >
              Add {label}
            </Button>
          </Grid>
        )}
        {children}
      </Grid>
    </Grid>
  );
};

export default TableContainer;
