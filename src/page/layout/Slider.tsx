// import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HistoryIcon from '@mui/icons-material/History';
import { useLocation, useNavigate } from 'react-router-dom';
import { List, ListItemButton, ListItem, ListItemIcon, ListItemText } from '@mui/material';

interface Item {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

export const navList: Item[] = [
  {
    key: '/textbooks',
    label: '已选课程',
    icon: <MenuBookIcon />,
  },
  // {
  //   key: '/user',
  //   label: '本人信息',
  //   icon: <PersonIcon />,
  // },
  {
    key: '/history',
    label: '学习记录',
    icon: <HistoryIcon />,
  },
  {
    key: '/feedback',
    label: '问题反馈',
    icon: <HistoryIcon />,
  },
];

export function Slider({ onClick }: { onClick?: VoidFunction }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (item: Item) => {
    navigate(item.key);
    onClick?.();
  };

  const selectedKey = location.pathname;

  return (
    <List
      sx={{
        width: 240,
        px: 2,
      }}
      component="nav"
    >
      {navList.map((item) => (
        <ListItem key={item.key} disablePadding>
          <ListItemButton
            selected={selectedKey === item.key}
            onClick={() => handleClick(item)}
            sx={(theme) => ({
              '&.Mui-selected': {
                color: theme.palette.primary.main,
                backgroundColor: 'transparent',
              },
            })}
          >
            <ListItemIcon sx={{ minWidth: 35, color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
