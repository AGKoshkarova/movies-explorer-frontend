import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute(props) {
	console.log("ProtectedRoute", props.isLoggedIn);

	return props.isLoggedIn ? <Outlet /> : <Navigate to='/' />;
}
