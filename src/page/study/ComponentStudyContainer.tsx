import { Box, Typography, Paper, Stack } from '@mui/material';

export interface StudyContainerProps {
  title: string;
  footer?: React.ReactNode | null;
  children: React.ReactNode;
}

export function StudyContainer({ title, footer, children }: StudyContainerProps) {
  return (
    <Paper sx={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: '#fff',
          p: 2,
        }}
      >
        <Typography variant="h5">{title}</Typography>
      </Box>
      <Typography variant="study" sx={{ whiteSpace: 'pre-wrap', flex: 1, overflow: 'auto', p: 4 }}>
        {children}
      </Typography>
      {footer && (
        <Stack p={2} spacing={2} direction="row" justifyContent="center" alignItems="center">
          {footer}
        </Stack>
      )}
    </Paper>
  );
}
