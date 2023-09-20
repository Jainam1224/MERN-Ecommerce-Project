import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// This is basically created for -> If the user is already authenticated/logged-in then only
// he should be able to see Profile, Orders etc, else it should sent to login page.

// isAdmin true means that that particular routes will be accessed only by admins
const ProtectedRoute = ({ isAdmin, component: Component, isAuthenticated }) => {
  const { loading, user } = useSelector((state) => state.user);

  return (
    loading === false && (
      <Fragment>
        {isAuthenticated === false && <Navigate to="/login" />}
        {isAdmin === true && user.role !== "admin" && <Navigate to="/login" />}
        <Component />
      </Fragment>
    )
  );
};

export default ProtectedRoute;
