import { useAuth } from "@/context/authContext";
import React from "react";
import { Navigate, Outlet } from "react-router";

export default function Protected() {
  const { auth } = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" replace />;
}
