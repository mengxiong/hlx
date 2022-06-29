import textbookCover from 'src/image/cover.png';
import { Typography, Stack, ButtonBase } from '@mui/material';

export interface ImageLinkProps {
  to: string;
  aspectRatio?: number;
  image?: string;
  disabled?: boolean;
  title: string;
  desc: string;
  children?: React.ReactNode;
}

export function ImageLink({
  to,
  aspectRatio = 4 / 3,
  image = textbookCover,
  disabled,
  title,
  desc,
  children,
}: ImageLinkProps) {
  return (
    <ButtonBase
      href={to}
      disabled={disabled}
      style={{
        backgroundImage: `url('${image}')`,
        backgroundSize: 'cover',
        color: '#fff',
      }}
      sx={{
        display: 'block',
        position: 'relative',
        width: '100%',
        aspectRatio: `${aspectRatio}`,
      }}
    >
      <Stack
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          p: 3,
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{desc}</Typography>
        {children}
      </Stack>
    </ButtonBase>
  );
}
