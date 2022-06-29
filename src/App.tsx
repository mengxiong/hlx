import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import CssBaseline from '@mui/material/CssBaseline';
import { Router } from './Routes';
import { Theme } from './theme';
import { queryClient } from './queryClient';

export function App() {
  return (
    <Theme>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Theme>
  );
}
