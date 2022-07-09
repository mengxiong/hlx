import { Box, Typography } from '@mui/material';
import { Tips as TipsProps } from 'src/api/study';
import { MediaList } from './ComponentMediaList';

export function Tips({ content, attach }: TipsProps) {
  return (
    <Box>
      {attach && <MediaList attach={attach} />}
      {content && <Typography variant="study">{content}</Typography>}
    </Box>
  );
}
