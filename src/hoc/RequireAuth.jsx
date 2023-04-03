import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext/UserContext";

export function RequireAuth({ redirect }) {
    const { auth } = useContext(UserContext);
    return auth ? <Outlet /> : <Navigate to={redirect} />;
}
