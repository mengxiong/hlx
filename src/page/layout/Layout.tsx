import { Outlet } from 'react-router-dom';
import { Box, Drawer, IconButton, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Header } from './Header';
import { Slider } from './Slider';

export function Layout() {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Header>
        {sm && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpen(!open)}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Header>
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {sm ? (
          <Drawer
            variant="temporary"
            open={open}
            onClose={() => setOpen(false)}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <Slider onClick={() => setOpen(false)} />
          </Drawer>
        ) : (
          <Drawer variant="permanent" PaperProps={{ sx: { position: 'relative', zIndex: 0 } }} open>
            <Slider />
          </Drawer>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            overflow: 'hidden',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
