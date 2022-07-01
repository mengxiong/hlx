import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Tab,
  Tabs,
} from '@mui/material';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { getTextbooks, TextbookType } from 'src/api/textbook';
import { QueryContainer } from 'src/component/QueryContainer';
import { getUnitListPath } from 'src/Routes';

export function TextbookList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const type = (searchParams.get('type') as TextbookType) || TextbookType.English;

  const result = useQuery(['textbooks', type], () => getTextbooks(type));

  const handleChange = (evt: React.SyntheticEvent, value: TextbookType) => {
    setSearchParams({ type: value });
  };

  const items = result.data?.textBooks || [];

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={type} onChange={handleChange}>
          <Tab label="英语课程" value={TextbookType.English} />
          <Tab label="汉语课程" value={TextbookType.Chinese} />
        </Tabs>
      </Box>
      <QueryContainer
        sx={{ flex: 1, overflow: 'audo' }}
        isEmpty={(data) => data.textBooks.length === 0}
        {...result}
      >
        <List>
          {items.flatMap((value, index) => {
            const item = (
              <ListItem disablePadding key={value.id}>
                <ListItemButton href={getUnitListPath(value.id)}>
                  <ListItemAvatar>
                    <Avatar variant="square" src={value.imageUrl}></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={value.label}
                    secondary={`共 ${value.totalUnit} 课`}
                  ></ListItemText>
                </ListItemButton>
              </ListItem>
            );
            const divider = <Divider key={`divider-${index}`} variant="inset" component="li" />;
            return index === 0 ? item : [item, divider];
          })}
        </List>
      </QueryContainer>
    </>
  );
}
