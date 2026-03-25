import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RoleRoute = ({ roles }) => {
  const { user, isRole, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return isRole(...roles) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default RoleRoute;
