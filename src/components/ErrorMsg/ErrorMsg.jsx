import React from 'react';
import cl from 'components/ErrorMsg/errorMsg.module.css';
import { useSelector } from 'react-redux';
import { getContactsError } from 'redux/selectors';
import Error from 'components/ui/icons/Error';

const ErrorMsg = () => {
  const error = useSelector(getContactsError);
  return (
    <p className={cl.errorMessage}>
      {error}
      <Error />
    </p>
  );
};

export default ErrorMsg;
