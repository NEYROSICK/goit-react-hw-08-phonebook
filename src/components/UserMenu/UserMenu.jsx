import React from 'react';
import cl from './userMenu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux/operations';
import { getUserEmail } from 'redux/selectors';
import { MdOutlineExitToApp } from 'react-icons/md';
import { BiUserCircle } from 'react-icons/bi';

const UserMenu = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(getUserEmail);

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <header className={cl.header}>
      <div className={cl.container}>
        <div className={cl.userMenu}>
          <p className={cl.userName}>
            <BiUserCircle className={cl.userIcon} />
            {userEmail}
          </p>
          <button className={cl.button} onClick={handleLogOut}>
            <MdOutlineExitToApp className={cl.logoutIcon} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default UserMenu;
