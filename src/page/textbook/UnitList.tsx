import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getTextbookUnit } from 'src/api/textbook';
import { QueryContainer } from 'src/component/QueryContainer';
import selectedUrl from 'src/image/selected.png';
import { getStepListPath } from 'src/Routes';

export function UnitList() {
  const params = useParams();
  const id = params.textbookId!;
  const type = params.type!;
  const result = useQuery(['unitlist', id], () => getTextbookUnit(id));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6">ff</Typography>
        <Button variant="outlined" startIcon={<ArrowBackIosNewIcon />}>
          返回
        </Button>
      </Stack>
      <QueryContainer sx={{ flex: 1, overflow: 'auto' }} {...result}>
        <Grid container spacing={2}>
          {result.data?.map((item) => (
            <Grid key={item.id} item xs={6} sm={6} md={4} lg={3}>
              <Button
                href={getStepListPath(type, id, item.id)}
                fullWidth
                size="large"
                sx={{
                  border: '1px solid #dcdfe6',
                  color: 'inherit',
                  '&:hover': {
                    color: 'primary.main',
                    borderColor: 'primary.light',
                  },
                  ...(item.selected === '1'
                    ? {
                        borderColor: 'primary.light',
                        background: `url(${selectedUrl}) no-repeat 100% 100%`,
                      }
                    : {}),
                }}
              >
                {item.title}
              </Button>
            </Grid>
          ))}
        </Grid>
      </QueryContainer>
    </Box>
  );
}
