import BootstrapNavbar from "./common/BootstrapNavbar";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./hooks";
const App = () => {
  const user = useAppSelector((store) => store.auth.user);
  return (
    <>
      <BootstrapNavbar />
      {!user && <Navigate to="/login" />}
      <Outlet />
    </>
  );
};

export default App;
