import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { Header } from './Header';
import { Slider } from './Slider';

export function Layout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Header></Header>
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <Container
          maxWidth="lg"
          sx={{ display: 'flex', height: '100%', paddingTop: 2, paddingBottom: 2 }}
        >
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
        </Container>
      </Box>
    </Box>
  );
}
