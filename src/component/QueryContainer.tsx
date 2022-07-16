import React, { useLayoutEffect, useRef, useState } from 'react';
import { UseQueryResult } from 'react-query';
import { Box, CircularProgress, Fade, SxProps, Theme } from '@mui/material';
import { Empty } from './Empty';
import { ErrorComponent } from './Error';

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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <CircularProgress />
      </Box>
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

  let content: React.ReactNode = children;
  if (error) {
    content = <ErrorComponent error={error as Error} />;
  } else if (isSuccess && isEmpty) {
    content = <Empty />;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: 100,
        opacity: loadingVisible ? 0.5 : undefined,
        ...sx,
      }}
    >
      {content}
      {loadingVisible && loading}
    </Box>
  );
}
