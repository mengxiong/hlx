import React, { useLayoutEffect, useRef, useState } from 'react';
import { UseQueryResult } from 'react-query';
import { Box, CircularProgress, Fade, SxProps, Theme, Typography } from '@mui/material';

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

function EmptyImage() {
  return (
    <svg width={160} height={160} viewBox="0 0 160 160">
      <defs>
        <linearGradient x1="50%" x2="50%" y2="100%" id="van-empty-5">
          <stop stopColor="#F2F3F5" offset="0%"></stop>
          <stop stopColor="#DCDEE0" offset="100%"></stop>
        </linearGradient>
        <linearGradient x1="95%" y1="48%" x2="5.5%" y2="51%" id="van-empty-6">
          <stop stopColor="#EAEDF1" offset="0%"></stop>
          <stop stopColor="#DCDEE0" offset="100%"></stop>
        </linearGradient>
        <linearGradient y1="45%" x2="100%" y2="54%" id="van-empty-7">
          <stop stopColor="#EAEDF1" offset="0%"></stop>
          <stop stopColor="#DCDEE0" offset="100%"></stop>
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="van-empty-a" x1="64%" y1="100%" x2="64%">
          <stop stopColor="#FFF" offset="0%" stopOpacity="0.5"></stop>
          <stop stopColor="#F2F3F5" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g opacity=".8">
        <path d="M36 131V53H16v20H2v58h34z" fill="url(#van-empty-a)"></path>
        <path d="M123 15h22v14h9v77h-31V15z" fill="url(#van-empty-a)"></path>
      </g>
      <defs>
        <linearGradient id="van-empty-b" x1="64%" y1="97%" x2="64%" y2="0%">
          <stop stopColor="#F2F3F5" offset="0%" stopOpacity="0.3"></stop>
          <stop stopColor="#F2F3F5" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g opacity=".8">
        <path
          d="M87 6c3 0 7 3 8 6a8 8 0 1 1-1 16H80a7 7 0 0 1-8-6c0-4 3-7 6-7 0-5 4-9 9-9Z"
          fill="url(#van-empty-b)"
        ></path>
        <path
          d="M19 23c2 0 3 1 4 3 2 0 4 2 4 4a4 4 0 0 1-4 3v1h-7v-1l-1 1c-2 0-3-2-3-4 0-1 1-3 3-3 0-2 2-4 4-4Z"
          fill="url(#van-empty-b)"
        ></path>
      </g>
      <g transform="translate(36 50)" fill="none">
        <g transform="translate(8)">
          <rect fill="#EBEDF0" opacity=".6" x="38" y="13" width="36" height="53" rx="2"></rect>
          <rect fill="url(#van-empty-5)" width="64" height="66" rx="2"></rect>
          <rect fill="#FFF" x="6" y="6" width="52" height="55" rx="1"></rect>
          <g transform="translate(15 17)" fill="url(#van-empty-6)">
            <rect width="34" height="6" rx="1"></rect>
            <path d="M0 14h34v6H0z"></path>
            <rect y="28" width="34" height="6" rx="1"></rect>
          </g>
        </g>
        <rect fill="url(#van-empty-7)" y="61" width="88" height="28" rx="1"></rect>
        <rect fill="#F7F8FA" x="29" y="72" width="30" height="6" rx="1"></rect>
      </g>
    </svg>
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
    content = (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography variant="body1" color="error">
          {(error as Error).message || '加载失败'}
        </Typography>
      </Box>
    );
  } else if (isSuccess && isEmpty) {
    content = (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <EmptyImage />
        <Typography variant="caption" color="#969799">
          暂无数据
        </Typography>
      </Box>
    );
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
