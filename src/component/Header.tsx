import { Box, Typography, IconButton, SxProps, Theme } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';

export interface HeaderProps {
  title: string;
  primary?: boolean;
}

export function Header({ title, primary }: HeaderProps) {
  const navigate = useNavigate();

  const style: SxProps<Theme> = primary
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
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        py: 1,
        ...style,
      }}
    >
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          position: 'absolute',
          color: 'inherit',
          left: 2,
          '&:hover': {
            backgroundColor: 'transparent',
            color: primary ? 'inherit' : 'primary.main',
          },
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <Typography variant="h6" sx={{ flex: 1, textAlign: 'center' }}>
        {title}
      </Typography>
    </Box>
  );
}
