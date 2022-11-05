import { Box, List, ListItem, ListItemText, ListSubheader } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ExamRecordContent, getExamRecord } from 'src/api/record';
import { CircularProgressWithLabel } from 'src/component/CircularProgressWithLabel';
import { InfiniteScroll } from 'src/component/InfiniteScroll';
import { PageContainer } from '../layout/PageContainer';

const groupByDate = (list?: ExamRecordContent[]) => {
  if (!list || list.length === 0) {
    return [];
  }
  const result = new Map<string, ExamRecordContent[]>();
  list.forEach((item) => {
    if (!result.has(item.createTime)) {
      result.set(item.createTime, []);
    }
    result.get(item.createTime)!.push(item);
  });

  return [...result];
};

export function ExamRecord() {
  const result = useInfiniteQuery(
    ['examRecord'],
    ({ pageParam = 0 }) => getExamRecord({ page: pageParam, size: 10 }),
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
    result.data?.pages.reduce((acc, val) => acc.concat(val.content), [] as ExamRecordContent[]) ||
    [];
  const group = groupByDate(list);

  return (
    <PageContainer>
      <InfiniteScroll
        fetchNextPage={() => result.fetchNextPage()}
        hasNextPage={result.hasNextPage}
        isLoading={result.isLoading}
        hasChildren={list.length > 0}
      >
        <List>
          {group.map((val, j) => (
            <Box
              key={`${val[0]}`}
              component="li"
              sx={{ borderBottom: j === group.length - 1 ? 0 : 1, borderBottomColor: 'divider' }}
            >
              <ul style={{ padding: 0, margin: 0 }}>
                <ListSubheader sx={{ lineHeight: '36px' }}>{val[0]}</ListSubheader>
                {val[1].map((item, i) => {
                  const yesNum = Number(item.examYesNum);
                  const noNum = Number(item.examNoNum);
                  return (
                    <ListItem key={`${val[0]}-${i}`}>
                      <ListItemText
                        sx={{ whiteSpace: 'pre' }}
                        primary={`${item.examName}`}
                        secondaryTypographyProps={{ display: 'flex', flexWrap: 'wrap' }}
                        secondary={
                          <>
                            <Box component="span">
                              正确数:
                              <Box
                                component="span"
                                sx={(theme) => ({ color: theme.palette.success.main, ml: 1 })}
                              >
                                {yesNum}
                              </Box>
                            </Box>
                            <Box component="span" sx={{ mx: 2 }}>
                              错误处:
                              <Box
                                component="span"
                                sx={(theme) => ({ color: theme.palette.error.main, ml: 1 })}
                              >
                                {noNum}
                              </Box>
                            </Box>
                            <Box component="span">用时: {item.examTimeDesc}</Box>
                          </>
                        }
                      ></ListItemText>
                      <CircularProgressWithLabel value={(yesNum / (yesNum + noNum)) * 100} />
                    </ListItem>
                  );
                })}
              </ul>
            </Box>
          ))}
        </List>
      </InfiniteScroll>
    </PageContainer>
  );
}
