import { Grid } from '@mui/material';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getTextbooks } from 'src/api/textbook';
import { QueryContainer } from 'src/component/QueryContainer';
import { getUnitListPath } from 'src/Routes';
import { ImageLink } from './ComponentImageLink';

export function Textbooks() {
  const params = useParams();
  const { type } = params;

  const result = useQuery(['textbooks', type], () => getTextbooks(type));

  return (
    <QueryContainer isEmpty={(data) => data.textBooks.length === 0} {...result}>
      <Grid container spacing={2}>
        {result.data?.textBooks.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <ImageLink
              key={item.id}
              to={getUnitListPath(type!, item.id)}
              title={item.label}
              desc={`共 ${item.totalUnit} 课`}
            />
          </Grid>
        ))}
      </Grid>
    </QueryContainer>
  );
}
