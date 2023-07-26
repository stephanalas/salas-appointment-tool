import BootstrapNavbar from "./common/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./hooks";
import { ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { CssBaseline, useMediaQuery, useTheme } from "@mui/material";
import theme from "./theme";
import { ToastContainer } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const user = useAppSelector((store) => store.auth.user);
  const { breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.down("md"));
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="en-us">
        <CssBaseline />
        <BootstrapNavbar />
        {!user && <Navigate to="/login" />}
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
