import { verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Box, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { SortingInfo } from 'src/api/study';
import { Sortable } from 'src/component/Sortable';
import { isAscendingOrder } from 'src/util';
import { MediaList } from './ComponentMediaList';
import { ComponentStepFooter } from './ComponentStepFooter';
import { StudyContainer } from './ComponentStudyContainer';

interface SortingProps {
  data: SortingInfo[];
  title: string;
  baseKey?: keyof SortingInfo | 'attach';
  vertical?: boolean;
}

export function Sorting({ data, title, baseKey, vertical = false }: SortingProps) {
  const [index, setIndex] = useState(0);
  const current = data[index];

  const [items, setItems] = useState<Array<{ id: string; content: string }>>([]);

  const isCorrect = () => {
    return isAscendingOrder(items.map((v) => +v.id));
  };

  useEffect(() => {
    setItems(current.options.map((v) => ({ id: v.value, content: v.content })));
  }, [current]);

  let header: React.ReactNode;

  if (baseKey === 'attach') {
    header = (
      <MediaList
        key={current.id}
        attach={[current.audioAttach, current.videoAttach, current.imageAttach]}
      ></MediaList>
    );
  } else if (baseKey === 'audioAttach') {
    header = <MediaList key={current.id} attach={current.audioAttach}></MediaList>;
  } else if (baseKey) {
    header = (
      <Typography variant="study" my={4}>
        {current[baseKey] as string}
      </Typography>
    );
  }

  return (
    <StudyContainer
      title={title}
      footer={
        <ComponentStepFooter
          index={index}
          setIndex={setIndex}
          length={data.length}
          isCorrect={isCorrect}
        />
      }
    >
      {header}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: vertical ? 'column' : 'row' }}>
        <Sortable
          strategy={vertical ? verticalListSortingStrategy : undefined}
          items={items}
          setItems={setItems as any}
          renderItem={({ item, listeners, attributes, setNodeRef, style }) => (
            <Paper
              variant="outlined"
              ref={setNodeRef}
              style={style}
              sx={vertical ? { p: '0.5em', my: 1 } : { p: '0.5em', mx: 0.5 }}
              {...listeners}
              {...attributes}
            >
              {item.content}
            </Paper>
          )}
        ></Sortable>
      </Box>
    </StudyContainer>
  );
}
