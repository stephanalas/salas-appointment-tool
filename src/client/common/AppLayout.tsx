import BootstrapNavbar from "./BootstrapNavbar";
import App from "../routes/App";
import { Outlet } from "react-router-dom";
const AppLayout = () => {
  return (
    <>
      <BootstrapNavbar />
      <App />
      <Outlet />
    </>
  );
};

export default AppLayout;
