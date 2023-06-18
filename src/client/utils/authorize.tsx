import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "./hooks";

export default function Authorize() {
  const auth = useAppSelector((store) => store.auth);
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
}
