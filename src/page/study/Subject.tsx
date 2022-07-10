import { Typography } from '@mui/material';
import { Attach } from 'src/api/study';
import { MediaList } from './MediaList';

export interface SubjectProps {
  id: string;
  data?: string | Attach | Array<Attach | undefined>;
}

export function Subject({ data, id }: SubjectProps) {
  if (typeof data === 'string') {
    return (
      <Typography variant="study" mb={1}>
        {data}
      </Typography>
    );
  }
  if (!data) {
    return null;
  }
  return <MediaList key={id} attach={data} />;
}
