import { Box, SxProps, TextareaAutosize, TextareaAutosizeProps, Theme } from '@mui/material';

export interface InputAutoHeightProps extends TextareaAutosizeProps {
  sx?: SxProps<Theme>;
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
