import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

export default function ProtectedRoute(props) {
	console.log("ProtectedRoute", props.isLoggedIn);
	console.log("ProtectedRoute", props.isLoading);

	return props.isLoggedIn ? <Outlet /> : <Navigate to='/' />;
}
