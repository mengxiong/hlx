import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ReadInfo } from 'src/api/study';
import TranslateIcon from '@mui/icons-material/Translate';
import SourceIcon from '@mui/icons-material/Source';
import InfoIcon from '@mui/icons-material/Info';
import { Container } from './Container';
import { MediaList } from './MediaList';
import { useSubmit } from './useSubmit';
import { useStep } from './useStep';

export function Reading({ data, title }: { data: ReadInfo[]; title: string }) {
  const { submit, isLoading } = useSubmit();
  const { current, isFirst, isLast, previous, next } = useStep(data);

  const handleConfirm = () => {
    if (!isLast) {
      next();
    } else {
      submit();
    }
  };

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
    <Container
      title={title}
      isLoading={isLoading}
      onCancel={!isFirst ? previous : undefined}
      onConfirm={handleConfirm}
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
    </Container>
  );
}
