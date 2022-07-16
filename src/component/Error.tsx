import { Box, Typography, SxProps, Theme } from '@mui/material';

export interface ErrorProps {
  error: Error;
  sx?: SxProps<Theme>;
}

export function ErrorComponent({ error, sx }: ErrorProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        ...sx,
      }}
    >
      <Typography variant="body1" color="error">
        {error.message || '加载失败'}
      </Typography>
    </Box>
  );
}
