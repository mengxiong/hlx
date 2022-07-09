import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ReadInfo } from 'src/api/study';
import TranslateIcon from '@mui/icons-material/Translate';
import SourceIcon from '@mui/icons-material/Source';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';
import { StudyContainer } from './ComponentStudyContainer';
import { MediaList } from './ComponentMediaList';
import { ComponentStepFooter } from './ComponentStepFooter';

export function Reading({ data, title }: { data: ReadInfo[]; title: string }) {
  const [index, setIndex] = useState(0);

  const current = data[index];

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
    <StudyContainer
      title={title}
      footer={<ComponentStepFooter index={index} setIndex={setIndex} length={data.length} />}
    >
      <MediaList
        key={current.id}
        attach={[current.imageAttach, current.audioAttach, current.videoAttach]}
      ></MediaList>
      <List>
        {content.map((item) => (
          <ListItem key={item.key} alignItems="flex-start">
            <ListItemIcon sx={{ color: 'primary.main' }}>{item.icon}</ListItemIcon>
            <ListItemText disableTypography primary={item.text} />
          </ListItem>
        ))}
      </List>
    </StudyContainer>
  );
}
