import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import PageLoader from '../components/common/PageLoader';

const RoleRoute = ({ roles }) => {
  const { user, isRole, loading } = useAuth();

  if (loading) return <PageLoader />;

  return isRole(...roles) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default RoleRoute;
