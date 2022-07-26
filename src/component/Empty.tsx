import { Box, Typography } from '@mui/material';
import EmptyImage from 'src/assets/svg/empty.svg';
import { Sx } from 'src/types';

export interface EmptyProps {
  sx?: Sx;
}

export function Empty({ sx }: EmptyProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        ...sx,
      }}
    >
      <EmptyImage />
      <Typography variant="caption" color="#969799">
        暂无数据
      </Typography>
    </Box>
  );
}
