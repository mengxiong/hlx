import { Card, CardContent, Typography } from '@mui/material';
import { useInfiniteQuery } from 'react-query';
import { FeedbackContent, getFeedbackList } from 'src/api/feedback';
import { InfiniteScroll } from 'src/component/InfiniteScroll';
import { PageContainer } from '../layout/PageContainer';

export function Feedback() {
  const result = useInfiniteQuery(
    ['feedback'],
    ({ pageParam = 0 }) => getFeedbackList({ page: pageParam, size: 10 }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.totalPages - 1) {
          return lastPage.page + 1;
        }
        return undefined;
      },
    }
  );
  const list =
    result.data?.pages.reduce((acc, cur) => acc.concat(cur.content), [] as FeedbackContent[]) || [];

  return (
    <PageContainer contentStyle={{ backgroundColor: '#f1f1f1' }}>
      <InfiniteScroll
        fetchNextPage={() => result.fetchNextPage()}
        hasNextPage={result.hasNextPage}
        isLoading={result.isLoading}
        hasChildren={list.length > 0}
      >
        {list.map((item) => (
          <Card sx={{ m: 2 }} elevation={0} square>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                {item.createTime}
              </Typography>
              <Typography variant="h6" component="div" gutterBottom>
                {item.recontent}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                {item.updateTime}
              </Typography>
              <Typography variant="body2">{item.response}</Typography>
            </CardContent>
          </Card>
        ))}
      </InfiniteScroll>
    </PageContainer>
  );
}
