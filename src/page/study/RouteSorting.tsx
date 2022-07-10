import { verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Box, Paper } from '@mui/material';
import { useState } from 'react';
import { Attach, SortingInfo } from 'src/api/study';
import { Sortable } from 'src/component/Sortable';
import { isAscendingOrder } from 'src/util';
import { PickByValue } from 'utility-types';
import { Subject } from './Subject';
import { Container } from './Container';
import { useStudy } from './useStudy';

interface SortingProps {
  data: SortingInfo[];
  title: string;
  baseKey?: keyof PickByValue<Required<SortingInfo>, string | Attach> | 'attach';
  vertical?: boolean;
}

export function Sorting({ data, title, baseKey, vertical = false }: SortingProps) {
  const [value, setValue] = useState<Array<{ id: string; content: string }> | null>(null);
  const reset = () => setValue(null);

  const { current, ...restProps } = useStudy({
    data,
    reset,
    needRestart: vertical === false,
    isCorrect: () => (value ? isAscendingOrder(value.map((v) => +v.id)) : false),
  });

  const items = value || current.options.map((v) => ({ id: v.value, content: v.content }));

  return (
    <Container title={title} {...restProps}>
      {baseKey && (
        <Subject
          id={current.id!}
          data={
            baseKey === 'attach'
              ? [current.audioAttach, current.videoAttach, current.imageAttach]
              : current[baseKey]
          }
        />
      )}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: vertical ? 'column' : 'row' }}>
        <Sortable
          strategy={vertical ? verticalListSortingStrategy : undefined}
          items={items}
          setItems={setValue as any}
          renderItem={({ item, listeners, attributes, setNodeRef, style }) => (
            <Paper
              variant="outlined"
              ref={setNodeRef}
              style={style}
              sx={vertical ? { p: '0.5em', my: 1 } : { p: '0.5em', mr: 1 }}
              {...listeners}
              {...attributes}
            >
              {item.content}
            </Paper>
          )}
        ></Sortable>
      </Box>
    </Container>
  );
}
