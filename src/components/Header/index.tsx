import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import GoogleLogin from 'components/GoogleLogin';
import { useAuthState } from 'shared/hooks';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import styles from './style.module.css';

function Header() {
  const { user } = useAuthState();
  return (
    <header>
      <div className={styles.row}>
        <div className={styles['header-logo']}>
          <Logo />
          <h1>FakeTube</h1>
        </div>
        <GoogleLogin />
        {user && (
          <IconButton sx={{ p: 0 }}>
            <Avatar alt={user.givenName} src={user.picture} />
          </IconButton>
        )}
      </div>
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
