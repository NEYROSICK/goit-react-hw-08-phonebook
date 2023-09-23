import { Navigate, Route, Routes } from 'react-router-dom';
import ContactsPage from 'pages/Contacts';
import RegisterPage from 'pages/Register';
import LoginPage from 'pages/Login';
import RestrictedRoute from 'components/RestrictedRoute';
import PrivateRoot from 'components/PrivateRoot';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { refreshUser } from 'redux/operations';
import { getIsLoggedIn, getIsRefreshing } from 'redux/selectors';

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(getIsRefreshing);
  const isLoggedIn = useSelector(getIsLoggedIn);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (!isRefreshing) {
    return (
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/contacts" />
            ) : (
              <Navigate to="/register" />
            )
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoot redirectTo="/login" component={<ContactsPage />} />
          }
        ></Route>
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<RegisterPage />}
            />
          }
        ></Route>
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
          }
        ></Route>
      </Routes>
    );
  }
}
