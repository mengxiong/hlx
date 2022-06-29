import { Box, SxProps, TextareaAutosize, TextareaAutosizeProps, Theme } from '@mui/material';

export interface TextareaAutoHeightProps extends TextareaAutosizeProps {
  sx?: SxProps<Theme>;
}

export function TextareaAutoHeight({ sx, ...restProps }: TextareaAutoHeightProps) {
  return (
    <Box sx={{ ...sx, display: 'flex' }}>
      <TextareaAutosize
        {...restProps}
        style={{ width: '100%', resize: 'none', font: 'inherit', padding: 0 }}
      />
    </Box>
  );
}
