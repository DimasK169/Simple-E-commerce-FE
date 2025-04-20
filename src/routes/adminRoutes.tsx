import { useAuth } from "@/context/authContext";
import { log } from "console";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  const { auth } = useAuth();
  console.log(auth);
  if (!auth) return <Navigate to="/login" replace />;
  if (auth.User_Role !== "Admin") return <Navigate to="/" replace />;

  return <Outlet />;
}
