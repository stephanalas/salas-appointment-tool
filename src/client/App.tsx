import BootstrapNavbar from "./common/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./hooks";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
const App = () => {
  const user = useAppSelector((store) => store.auth.user);
  return (
    <ThemeProvider theme={theme}>
      <BootstrapNavbar />
      {!user && <Navigate to="/login" />}
      <Outlet />
    </ThemeProvider>
  );
};

export default App;
