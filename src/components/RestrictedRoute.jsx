import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'redux/selectors';
import { Navigate } from 'react-router-dom';

const RestrictedRoute = ({ component: Component, redirectTo }) => {
  const isLoggedIn = useSelector(getIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

RestrictedRoute.propTypes = {};

export default RestrictedRoute;
