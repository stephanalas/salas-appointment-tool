import BootstrapNavbar from "./common/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { CssBaseline, useMediaQuery, useTheme } from "@mui/material";
import theme from "./theme";
import { ToastContainer } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useAppSelector } from "./hooks";

// TODO: Custom loading component might be a good idea. input what data you want to display and fit it in a dialog
// most actions are held within a dialog anyway

const App = () => {
  const { breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.down("md"));
  const user = useAppSelector((store) => store.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="en-us">
        <CssBaseline />
        <BootstrapNavbar />
        <Container disableGutters maxWidth="xl">
          <Paper
            sx={{
              height: "100vh",
              marginTop: !matches ? "1rem" : 0,
            }}
            square
            elevation={1}
          >
            <Outlet />
            <ToastContainer
              position="bottom-center"
              autoClose={3000}
              pauseOnHover
              pauseOnFocusLoss
              hideProgressBar
            />
          </Paper>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
