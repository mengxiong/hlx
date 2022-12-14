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
import logo from 'src/assets/image/logo.png';
import { Notifications } from '@mui/icons-material';
import { useState } from 'react';
import { auth } from 'src/auth/auth';
import { useUser } from 'src/auth/AuthContext';

export function Header({ children }: { children?: React.ReactNode }) {
  const user = useUser()!;

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
            flex: '0 1 198px',
            height: '45px',
            backgroundImage: `url("${logo}")`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left center',
          }}
        ></Link>
        <span style={{ flex: '1 1 0%' }}></span>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={0} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          sx={{ p: 0, ml: '12px' }}
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <Avatar>{user.realName[0]}</Avatar>
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
          <MenuItem dense>{user.username}</MenuItem>
          <Divider />
          <MenuItem dense onClick={() => auth.clear()}>
            ??????
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
