import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import { TextbookType } from 'src/api/textbook';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface ListItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children?: ListItem[];
}

const items: ListItem[] = [
  {
    key: 'textbooks',
    label: '已选课程',
    icon: <MenuBookIcon />,
    children: [
      { key: `/textbooks/${TextbookType.Chinese}`, label: '汉语课程' },
      { key: `/textbooks/${TextbookType.English}`, label: '英语课程' },
    ],
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
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const handleClick = (item: ListItem) => {
    if (item.children) {
      if (openKeys.includes(item.key)) {
        setOpenKeys((keys) => keys.filter((key) => key !== item.key));
      } else {
        setOpenKeys((keys) => keys.concat(item.key));
      }
    } else {
      navigate(item.key);
    }
  };

  const selectedKey = location.pathname;

  // 选中菜单的父级自动展开
  useLayoutEffect(() => {
    const result: string[] = [];
    const findKey = (list: ListItem[], key: string) => {
      for (let i = 0; i < list.length; i++) {
        const item = list[i]!;
        if (item.key === key) {
          return true;
        }
        const { children } = item as any;
        if (children && findKey(children, key)) {
          result.push(item.key as string);
        }
      }
      return false;
    };
    findKey(items, selectedKey);
    setOpenKeys((prev) => prev.concat(result));
  }, [selectedKey]);

  const getList = (values: ListItem[], level: number) => {
    const list: React.ReactNode[] = [];
    values.forEach((item) => {
      list.push(
        <ListItemButton
          key={item.key}
          sx={{ pl: 2 * level }}
          selected={selectedKey === item.key}
          onClick={() => handleClick(item)}
        >
          <ListItemIcon sx={{ minWidth: 35, fontSize: 20 }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
          {item.children && (openKeys.includes(item.key) ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
      );
      if (item.children) {
        list.push(
          <Collapse key={`${item.key}-children`} in={openKeys.includes(item.key)} timeout="auto">
            <List component="div" disablePadding>
              {getList(item.children, level + 1)}
            </List>
          </Collapse>
        );
      }
    });
    return list;
  };

  return (
    <List sx={{ width: 240, bgcolor: 'background.paper', borderRadius: 1 }} component="nav">
      {getList(items, 1)}
    </List>
  );
}
