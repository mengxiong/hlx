import { Box, Typography } from '@mui/material';
import { Attach } from 'src/api/study';
import { MediaList } from './MediaList';

export function Tips({ content, attach }: { content?: React.ReactNode; attach?: Attach }) {
  return (
    <Box>
      {attach && <MediaList attach={attach} />}
      {content && <Typography variant="study">{content}</Typography>}
    </Box>
  );
}
