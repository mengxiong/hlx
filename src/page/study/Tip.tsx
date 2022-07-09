import { Typography } from '@mui/material';
import { Tips } from 'src/api/study';

export function Tip({ content, attach }: Tips) {
  return (
    <Typography variant="study" my={4}>
      {content}
    </Typography>
  );
}
