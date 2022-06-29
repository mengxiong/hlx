import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from '@mui/material';
import logo from 'src/image/logo.png';
import { Notifications } from '@mui/icons-material';
import { useState } from 'react';

export function Header() {
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
        <Link to="/">
          <img style={{ height: 60, verticalAlign: 'middle' }} src={logo} alt="" />
        </Link>
        <Box sx={{ flexGrow: 1 }} />
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
          <MenuItem onClick={handleClose}>退出</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
