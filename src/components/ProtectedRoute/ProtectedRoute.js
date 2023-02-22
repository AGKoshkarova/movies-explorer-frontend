import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute(props) {
  return props.isLoggedIn ? <Outlet /> : <Navigate replace to='/' />
}