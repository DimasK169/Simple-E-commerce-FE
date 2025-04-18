import { useAuth } from "@/context/authContext";
import React from "react";
import { Navigate, Outlet } from "react-router";

export default function Public() {
  const { auth } = useAuth();
  return auth ? <Navigate to="/" replace /> : <Outlet />;
}
