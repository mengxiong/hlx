import { Typography, Paper, Stack } from '@mui/material';
import { Header } from 'src/component/Header';

export interface StudyContainerProps {
  title: string;
  footer?: React.ReactNode | null;
  children: React.ReactNode;
}

export function StudyContainer({ title, footer, children }: StudyContainerProps) {
  return (
    <Paper sx={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <Header primary title={title}></Header>
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
