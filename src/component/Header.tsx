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
        display: 'flex',
        alignItems: 'center',
        px: 2,
        py: 1,
        ...style,
      }}
    >
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          color: 'inherit',
          ml: -2,
          '&:hover': {
            backgroundColor: 'transparent',
            color: primary ? 'inherit' : 'primary.main',
          },
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <Typography variant="h6">{title}</Typography>
    </Box>
  );
}
