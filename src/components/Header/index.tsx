import { MouseEvent, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import api from 'api';
import GoogleLogin from 'components/GoogleLogin';
import { useAuth } from 'shared/hooks';
import { getAlreadyLoggedUser } from 'shared/helpers/user';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import styles from './style.module.scss';

function Header() {
  const {
    state: { user },
    actions: { logout, setUser },
  } = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const handleAvatarClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => setAnchorEl(null);

  useEffect(() => {
    const alreadyLoggedUser = getAlreadyLoggedUser();
    if (!alreadyLoggedUser) return;
    const { token, user: userDetails } = alreadyLoggedUser;
    setUser(userDetails);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }, [setUser]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header>
      <div className={styles.row}>
        <div className={styles['header-logo']} onClick={() => navigate('/')}>
          <Logo />
          <h1>FakeTube</h1>
        </div>
        <GoogleLogin />
        {user && (
          <IconButton sx={{ p: 0 }} onClick={handleAvatarClick}>
            <Avatar alt={user.givenName} src={user.picture} />
          </IconButton>
        )}
      </div>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClick={handleCloseMenu}
        onClose={handleCloseMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      <hr />
      <div className={styles.row}>
        <div className={styles.menu}>
          <Link component={RouterLink} to="/">
            Home
          </Link>
          <Link component={RouterLink} to="/videos">
            Videos
          </Link>
          <Link component={RouterLink} to="/channels">
            Channels
          </Link>
          <Link component={RouterLink} to="/history">
            History
          </Link>
          <Link component={RouterLink} to="/upload">
            Upload
          </Link>
        </div>
      </div>
      <hr />
    </header>
  );
}

export default Header;
