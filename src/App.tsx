import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import CssBaseline from '@mui/material/CssBaseline';
import { HashRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { Routes } from './Routes';
import { Theme } from './theme';
import { queryClient } from './queryClient';

export function App() {
  // 如果用 BrowserRouter 需要 basename
  // const basename = import.meta.env.BASE_URL
  const basename = '/';

  return (
    <Theme>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <HashRouter basename={basename}>
          <Routes />
        </HashRouter>
        <SnackbarProvider
          autoHideDuration={1500}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        ></SnackbarProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Theme>
  );
}
