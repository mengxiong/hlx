import React, { useLayoutEffect, useRef, useState } from 'react';
import { UseQueryResult } from 'react-query';
import { Box, CircularProgress, Fade, SxProps, Theme, Typography } from '@mui/material';
import { Center } from './Center';

export interface QueryContainerProps<T> {
  children: React.ReactNode;
  isEmpty?: (value: T) => boolean;
  sx?: SxProps<Theme>;
}

const isDefaultEmpty = (value: unknown) => {
  return value === undefined || (Array.isArray(value) && value.length === 0);
};

export function QueryContainer<T>(props: QueryContainerProps<T> & UseQueryResult<T>) {
  const { error, isLoading, isSuccess, children, isEmpty = isDefaultEmpty, data, sx } = props;
  const timeoutRef = useRef<number>();

  const [loadingVisible, setLoadingVisible] = useState(false);

  useLayoutEffect(() => {
    if (isLoading) {
      timeoutRef.current = window.setTimeout(() => {
        setLoadingVisible(true);
      }, 500);
    } else {
      window.clearTimeout(timeoutRef.current);
      setLoadingVisible(false);
    }
    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, [isLoading]);

  const content =
    isSuccess && isEmpty(data) ? (
      <Center sx={{ height: '100%' }}>
        <Typography variant="body1" color="InfoText">
          空....
        </Typography>
      </Center>
    ) : (
      children
    );

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: 100,
        ...sx,
        ...(loadingVisible ? { opacity: 0.5 } : {}),
      }}
    >
      {error ? (
        <Center sx={{ height: '100%' }}>
          <Typography variant="body1" color="error">
            {(error as Error).message || '加载失败'}
          </Typography>
        </Center>
      ) : (
        content
      )}
      <Fade in={loadingVisible} unmountOnExit>
        <Center
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <CircularProgress />
        </Center>
      </Fade>
    </Box>
  );
}
