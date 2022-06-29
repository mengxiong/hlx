import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import { useLocation, useNavigate } from 'react-router-dom';
import { List, ListItemButton, ListItem, ListItemIcon, ListItemText } from '@mui/material';

interface Item {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

const items: Item[] = [
  {
    key: '/textbooks',
    label: '已选课程',
    icon: <MenuBookIcon />,
  },
  {
    key: '/user',
    label: '本人信息',
    icon: <PersonIcon />,
  },
  {
    key: '/exam',
    label: '现在测评',
    icon: <WysiwygIcon />,
  },
];

export function Slider() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (item: Item) => {
    navigate(item.key);
  };

  const selectedKey = location.pathname;

  return (
    <List
      sx={(theme) => ({
        width: 240,
        px: 2,
        bgcolor: 'background.paper',
        borderRadius: 1,
        borderRight: `1px solid ${theme.palette.divider}`,
      })}
      component="nav"
    >
      {items.map((item) => (
        <ListItem disablePadding>
          <ListItemButton
            key={item.key}
            selected={selectedKey === item.key}
            onClick={() => handleClick(item)}
            sx={(theme) => ({
              '&.Mui-selected': {
                color: theme.palette.primary.main,
                backgroundColor: 'transparent',
              },
            })}
          >
            <ListItemIcon sx={{ minWidth: 35, fontSize: 20, color: 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
