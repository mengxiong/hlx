import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Tab,
  Tabs,
} from '@mui/material';
import { useQuery } from 'react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { getTextbooks, TextbookType } from 'src/api/textbook';
import { QueryContainer } from 'src/component/QueryContainer';
import { PageContainer } from 'src/page/layout/PageContainer';

export function TextbookList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const type = (searchParams.get('type') as TextbookType) || TextbookType.English;

  const result = useQuery(['textbooks', type], () => getTextbooks(type));

  const handleChange = (evt: React.SyntheticEvent, value: TextbookType) => {
    setSearchParams({ type: value });
  };

  const items = result.data?.textBooks || [];

  return (
    <PageContainer>
      <Tabs variant="scrollable" value={type} onChange={handleChange}>
        <Tab label="英语课程" value={TextbookType.English} />
        <Tab label="汉语课程" value={TextbookType.Chinese} />
      </Tabs>
      <QueryContainer sx={{ flex: 1, overflow: 'auto' }} isEmpty={items.length === 0} {...result}>
        <List>
          {items.map((value, index) => (
            <ListItem divider={index !== items.length - 1} disablePadding key={value.id}>
              <ListItemButton
                component={Link}
                to={`/textbook/${value.id}`}
                state={{ title: value.label }}
              >
                <ListItemAvatar>
                  <Avatar variant="square" src={value.imageUrl}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={value.label}
                  secondary={`共 ${value.totalUnit} 课`}
                ></ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </QueryContainer>
    </PageContainer>
  );
}
