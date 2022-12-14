import { Box, List, ListItem, ListItemText, ListSubheader } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getStudyRecord, StudyRecordContent } from 'src/api/record';
import { CircularProgressWithLabel } from 'src/component/CircularProgressWithLabel';
import { InfiniteScroll } from 'src/component/InfiniteScroll';
import { getTimeFormat } from 'src/util';
import { PageContainer } from '../layout/PageContainer';

const groupByDate = (list?: StudyRecordContent[]) => {
  if (!list || list.length === 0) {
    return [];
  }
  const result = new Map<string, StudyRecordContent[]>();
  list.forEach((item) => {
    if (!result.has(item.lastDoTime)) {
      result.set(item.lastDoTime, []);
    }
    result.get(item.lastDoTime)!.push(item);
  });

  return [...result];
};

export function StudyRecord() {
  const result = useInfiniteQuery(
    ['studyRecord'],
    ({ pageParam = 0 }) => getStudyRecord({ page: pageParam, size: 10 }),
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
    result.data?.pages.reduce((acc, val) => acc.concat(val.content), [] as StudyRecordContent[]) ||
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
                {val[1].map((item, i) => (
                  <ListItem key={`${val[0]}-${i}`}>
                    <ListItemText
                      sx={{ whiteSpace: 'pre' }}
                      primary={`${item.textbookName}  /  ${item.unitName}`}
                      secondaryTypographyProps={{ display: 'flex', flexWrap: 'wrap' }}
                      secondary={
                        <>
                          <Box component="span">????????????: {item.onlineScore}</Box>
                          <Box component="span" sx={{ mx: 1 }}>
                            ????????????: {item.onlineAllScore}
                          </Box>
                          <Box component="span">
                            ??????: {getTimeFormat(parseInt(item.studyTime, 10))}
                          </Box>
                        </>
                      }
                    ></ListItemText>
                    <CircularProgressWithLabel value={parseInt(item.studyRate, 10)} />
                  </ListItem>
                ))}
              </ul>
            </Box>
          ))}
        </List>
      </InfiniteScroll>
    </PageContainer>
  );
}
