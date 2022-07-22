import { Box, CircularProgress } from '@mui/material';
import InfiniteScrollComponent from 'react-infinite-scroller';
import { Empty } from './Empty';
import { ErrorComponent } from './Error';

export interface InfiniteScrollProps {
  fetchNextPage: () => void;
  children: React.ReactNode;
  hasNextPage?: boolean;
  hasChildren: boolean;
  isLoading: boolean;
  error?: Error;
}

export function InfiniteScroll({
  fetchNextPage,
  children,
  hasChildren,
  isLoading,
  hasNextPage,
  error,
}: InfiniteScrollProps) {
  return (
    <InfiniteScrollComponent
      loadMore={fetchNextPage}
      hasMore={!error && (hasNextPage === undefined ? isLoading : hasNextPage)}
      loader={
        <Box key="loader" sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
          <CircularProgress />
        </Box>
      }
      useWindow={false}
    >
      {error ? <ErrorComponent error={error} /> : !isLoading && !hasChildren ? <Empty /> : children}
    </InfiniteScrollComponent>
  );
}
