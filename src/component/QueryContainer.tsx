import React, { useLayoutEffect, useRef, useState } from 'react';
import { UseQueryResult } from 'react-query';
import { Box, CircularProgress, Fade, SxProps, Theme, Typography } from '@mui/material';
import { Center } from './Center';

export interface QueryContainerProps {
  children: React.ReactNode;
  isEmpty?: boolean;
  loading?: React.ReactNode;
  sx?: SxProps<Theme>;
}

const isDefaultEmpty = (value: unknown) => {
  return value === undefined || (Array.isArray(value) && value.length === 0);
};

function DefaultLoading() {
  return (
    <Fade in>
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
  );
}

export function QueryContainer(props: QueryContainerProps & UseQueryResult) {
  const { error, isLoading, isSuccess, children, data, sx, loading = <DefaultLoading /> } = props;
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

  const isEmpty = props.isEmpty === undefined ? isDefaultEmpty(data) : props.isEmpty;

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: 100,
        ...sx,
      }}
    >
      {error ? (
        <Center sx={{ height: '100%' }}>
          <Typography variant="body1" color="error">
            {(error as Error).message || '加载失败'}
          </Typography>
        </Center>
      ) : (
        <Box sx={{ opacity: loadingVisible ? 0.5 : undefined }}>
          {isSuccess && isEmpty ? (
            <Center sx={{ height: '100%' }}>
              <Typography variant="body1" color="InfoText">
                空....
              </Typography>
            </Center>
          ) : (
            children
          )}
        </Box>
      )}
      {loadingVisible && loading}
    </Box>
  );
}
