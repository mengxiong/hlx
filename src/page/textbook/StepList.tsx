import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LockIcon from '@mui/icons-material/Lock';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getTextbookUnitStep } from 'src/api/textbook';
import { Center } from 'src/component/Center';
import { QueryContainer } from 'src/component/QueryContainer';
import { getStudyPath, getUnitListPath } from 'src/Routes';
import { ImageLink } from './ComponentImageLink';

export function StepList() {
  const { type, textbookId, unitId } = useParams() as {
    type: string;
    textbookId: string;
    unitId: string;
  };

  const result = useQuery(['steplist', textbookId, unitId], () =>
    getTextbookUnitStep({ textbookId, unitId })
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6">ff</Typography>
        <Button
          href={getUnitListPath(type, textbookId)}
          variant="contained"
          startIcon={<ArrowBackIosNewIcon />}
        >
          返回
        </Button>
      </Stack>
      <QueryContainer sx={{ flex: 1, overflow: 'auto' }} {...result}>
        <Grid container spacing={2}>
          {result.data?.map((item) => (
            <Grid key={item.stepValue} item xs={12} sm={6} md={4} lg={3}>
              <ImageLink
                to={getStudyPath(textbookId, unitId, item.stepNum, item.stepValue)}
                disabled={item.finished === '0'}
                title={`第${item.stepNum}步`}
                desc={item.title}
              >
                {item.finished === '0' && (
                  <Center
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '90%',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    <LockIcon />
                  </Center>
                )}
              </ImageLink>
            </Grid>
          ))}
        </Grid>
      </QueryContainer>
    </Box>
  );
}
