import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { Header } from './Header';
import { Slider } from './Slider';

export function Layout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Header></Header>
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Slider />
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            backgroundColor: '#fff',
            ml: 3,
            p: 2,
            borderRadius: 1,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
