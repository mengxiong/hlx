import { matchRoutes, Outlet, useLocation } from 'react-router-dom';
import { Box, Drawer, IconButton, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { getBreadcrumbs, routesConfig, BreadcrumbLink } from 'src/Routes';
import { Header } from './Header';
import { Slider } from './Slider';
import { Breadcrumbs } from './Breadcrumbs';

export function Layout() {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const breadcrumbs = (matchRoutes(routesConfig, location) || [])
    .filter((v) => v.route.breadcrumbName)
    .reduce((acc, cur) => {
      return acc.concat(getBreadcrumbs(cur.route.breadcrumbName!, cur.pathname, location));
    }, [] as BreadcrumbLink[]);

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
            px: 0,
          }}
        >
          <Breadcrumbs list={breadcrumbs}></Breadcrumbs>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'auto' }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
