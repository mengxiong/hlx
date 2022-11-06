import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { TextBook } from 'src/api/textbook';
import { useTextbookType } from './useTextbookType';

export interface TextbookListProps {
  data: TextBook[];
}

export function TextbookList({ data }: TextbookListProps) {
  const [type] = useTextbookType();
  const location = useLocation();
  console.log(location);
  return (
    <List>
      {data.map((value, index) => (
        <ListItem divider={index !== data.length - 1} disablePadding key={value.id}>
          <ListItemButton
            component={Link}
            to={`${location.pathname}/${type}/${value.id}`}
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
  );
}
