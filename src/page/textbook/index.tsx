import { useQuery } from '@tanstack/react-query';
import { getOwnTextbooks, getAllTextbooks } from 'src/api/textbook';
import { QueryContainer } from 'src/component/QueryContainer';
import { PageContainer } from 'src/page/layout/PageContainer';
import { useState } from 'react';
import { Pagination } from '@mui/material';
import { TextbookTabs } from './TextbookTabs';
import { TextbookList } from './TextbookList';
import { useTextbookType } from './useTextbookType';

export function OwnTextbook() {
  const [type] = useTextbookType();

  const result = useQuery(['owntextbooks', type], () => getOwnTextbooks(type));

  const items = result.data?.textBooks || [];

  return (
    <PageContainer>
      <TextbookTabs></TextbookTabs>
      <QueryContainer sx={{ flex: 1, overflow: 'auto' }} isEmpty={items.length === 0} {...result}>
        <TextbookList data={items}></TextbookList>
      </QueryContainer>
    </PageContainer>
  );
}

export function AllTextbook() {
  const [type] = useTextbookType();
  const [page, setPage] = useState(0);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  const size = 10;

  const result = useQuery(['alltextbooks', type, page], () =>
    getAllTextbooks({ subType: type, page, size })
  );

  const items = result.data?.content || [];

  const total = result.data?.totalElements || 0;

  const pageCount = Math.floor(total / size) || 1;

  return (
    <PageContainer>
      <TextbookTabs></TextbookTabs>
      <QueryContainer sx={{ flex: 1, overflow: 'auto' }} isEmpty={items.length === 0} {...result}>
        <TextbookList data={items}></TextbookList>
      </QueryContainer>
      <Pagination
        sx={{ display: 'flex', justifyContent: 'flex-end', m: 1 }}
        color="primary"
        variant="outlined"
        shape="rounded"
        count={pageCount}
        page={page + 1}
        onChange={handleChange}
      />
    </PageContainer>
  );
}
