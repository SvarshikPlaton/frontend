import React, { useCallback } from "react";
import { Navigate, useLocation, Outlet } from "react-router";

export default function RequireAuth() {
    const location = useLocation();
    const auth = true;
    const editPath = () => {
		return location.pathname + '#auth';
    }
    const path = editPath();

    return (
        auth 
            ? <Outlet />
            : <Navigate to={path} state={{ from: location }} replace={true} />
    );
}
