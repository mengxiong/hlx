import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ReadInfo } from 'src/api/study';
import TranslateIcon from '@mui/icons-material/Translate';
import SourceIcon from '@mui/icons-material/Source';
import InfoIcon from '@mui/icons-material/Info';
import { StudyContainer } from './Container';
import { MediaList } from './MediaList';
import { useStudy } from './useStudy';

export function ReadingContent({ current }: { current: ReadInfo }) {
  const content = [
    {
      key: 'translation',
      icon: <TranslateIcon fontSize="inherit" />,
      text: current.translation,
    },
    { key: 'content', icon: <SourceIcon fontSize="inherit" />, text: current.content },
    { key: 'analysis', icon: <InfoIcon fontSize="inherit" />, text: current.analysis },
  ];
  return (
    <>
      <MediaList
        defaultIndex={-1}
        key={current.id}
        attach={[current.imageAttach, current.audioAttach, current.videoAttach]}
      ></MediaList>
      <List>
        {content.map((item) => (
          <ListItem key={item.key} alignItems="flex-start">
            <ListItemIcon sx={{ color: 'primary.main', typography: 'study' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{ variant: 'study', component: 'p' }}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export function Reading({ data, title }: { data: ReadInfo[]; title: string }) {
  const { current, ...restProps } = useStudy({ data });

  return (
    <StudyContainer title={title} {...restProps}>
      <ReadingContent current={current} />
    </StudyContainer>
  );
}
