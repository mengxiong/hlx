import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';
import { getExamDetail } from 'src/api/exam';
import { Header } from 'src/component/Header';
import { QueryContainer } from 'src/component/QueryContainer';
import { isObject } from 'src/util';
import { ExamContent } from './ExamContent';

export function ExamDetail() {
  const { id } = useParams();
  const location = useLocation();
  const result = useQuery(['examDetail', id], () => getExamDetail(id!));

  const title = isObject(location.state) ? location.state.title : '评测';

  const data = result.data || [];

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 100,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header primary title={title}></Header>
      <QueryContainer
        sx={{
          flex: 1,
          overflow: 'auto',
        }}
        {...result}
      >
        {data.length > 0 && <ExamContent data={data} />}
      </QueryContainer>
    </Box>
  );
}
