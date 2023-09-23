import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getIsLoggedIn, getIsRefreshing } from 'redux/selectors';
import { Navigate } from 'react-router-dom';

const PrivateRoot = ({ component: Component, redirectTo }) => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isRefreshing = useSelector(getIsRefreshing);
  const shouldRedirect = isLoggedIn && !isRefreshing;

  return shouldRedirect ? Component : <Navigate to={redirectTo} />;
};

PrivateRoot.propTypes = {
  component: PropTypes.element,
  redirectTo: PropTypes.string.isRequired,
};

export default PrivateRoot;
