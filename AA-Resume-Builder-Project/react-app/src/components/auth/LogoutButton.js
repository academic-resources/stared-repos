import React from 'react';
import { logout } from '../../services/auth';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/user';
import { useHistory } from 'react-router-dom';
import { clearResumes } from '../../store/resume';
import { clearTemplates } from '../../store/template';

const LogoutButton = ({ setAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = async (e) => {
    await logout();
    await dispatch(logoutUser());
    await dispatch(clearResumes());
    await dispatch(clearTemplates());
    setAuthenticated(false);
    history.push('/');
  };

  return (
    <button
      onClick={onLogout}
      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
