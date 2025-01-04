import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { ClipLoader } from "react-spinners";

const PrivateRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={true} />
      </div>
    );
  }

  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
