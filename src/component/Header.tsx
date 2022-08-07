import { Box, Typography, IconButton, Container } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import { Sx } from 'src/types';

export interface HeaderProps {
  title: string;
  primary?: boolean;
}

export function Header({ title, primary }: HeaderProps) {
  const navigate = useNavigate();

  const style: Sx = primary
    ? {
        backgroundColor: 'primary.main',
        color: '#fff',
      }
    : {
        borderBottom: 1,
        borderColor: 'divider',
      };

  return (
    <Box
      sx={{
        py: 1,
        ...style,
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            position: 'absolute',
            color: 'inherit',
            left: 2,
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flex: 1, textAlign: 'center' }}>
          {title}
        </Typography>
      </Container>
    </Box>
  );
}
