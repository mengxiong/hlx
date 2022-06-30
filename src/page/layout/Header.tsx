import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Link,
} from '@mui/material';
import logo from 'src/image/logo.png';
import { Notifications } from '@mui/icons-material';
import { useState } from 'react';
import { useAuth } from 'src/auth/AuthContext';

export function Header({ children }: { children?: React.ReactNode }) {
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(90deg, #ff630f, #ff870f)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Toolbar>
        {children}
        <Link
          href="/"
          sx={{
            flex: 1,
            height: '80%',
            backgroundImage: `url("${logo}")`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left center',
          }}
        ></Link>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={7} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          sx={{ p: 0, ml: '12px' }}
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <Avatar>H</Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>15623530290</MenuItem>
          <Divider />
          <MenuItem onClick={() => auth.signout()}>退出</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
