import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import { Router } from './Routes';
import { Theme } from './theme';
import { queryClient } from './queryClient';

export function App() {
  return (
    <Theme>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <Router />
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Theme>
  );
}
