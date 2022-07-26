import { Box, TextareaAutosize, TextareaAutosizeProps } from '@mui/material';
import { Sx } from 'src/types';

export interface InputAutoHeightProps extends TextareaAutosizeProps {
  sx?: Sx;
}

export function InputAutoHeight({ sx, ...restProps }: InputAutoHeightProps) {
  return (
    <Box sx={{ ...sx, display: 'flex' }}>
      <TextareaAutosize
        {...restProps}
        style={{ width: '100%', resize: 'none', font: 'inherit', padding: 0 }}
      />
    </Box>
  );
}
