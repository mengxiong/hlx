import { Box, Typography, Paper, Stack, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';

export interface StudyContainerProps {
  title: string;
  footer?: React.ReactNode | null;
  children: React.ReactNode;
}

export function StudyContainer({ title, footer, children }: StudyContainerProps) {
  const navigate = useNavigate();

  return (
    <Paper sx={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: '#fff',
          p: 2,
        }}
      >
        <IconButton onClick={() => navigate(-1)} sx={{ color: 'inherit' }}>
          <ArrowBackIosNewIcon />
        </IconButton>
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
