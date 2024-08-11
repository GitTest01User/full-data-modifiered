import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isLoginIn } from 'Service/auth/auth';
export default function NestedComponent() {
  return isLoginIn() ? <Outlet /> : <Navigate to="/" />;
}
