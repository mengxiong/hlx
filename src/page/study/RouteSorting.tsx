import { verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Box, Paper } from '@mui/material';
import { useState } from 'react';
import { Attach, SortingInfo } from 'src/api/study';
import { Sortable } from 'src/component/Sortable';
import { isAscendingOrder } from 'src/util';
import { PickByValue } from 'utility-types';
import { Subject } from './Subject';
import { Container } from './Container';
import { useStep } from './useStep';
import { useSubmit } from './useSubmit';

interface SortingProps {
  data: SortingInfo[];
  title: string;
  baseKey?: keyof PickByValue<Required<SortingInfo>, string | Attach> | 'attach';
  vertical?: boolean;
}

export function Sorting({ data, title, baseKey, vertical = false }: SortingProps) {
  const [value, setValue] = useState<Array<{ id: string; content: string }> | null>(null);
  const reset = () => setValue(null);

  const { current, isFirst, isLast, previous, next } = useStep(data, reset);
  const { submit, isLoading } = useSubmit();

  const items = value || current.options.map((v) => ({ id: v.value, content: v.content }));

  const isCorrect = () => {
    return isAscendingOrder(items.map((v) => +v.id));
  };

  const handleConfirm = () => {
    if (isCorrect()) {
      if (!isLast) {
        next();
      } else {
        submit();
      }
    }
  };

  return (
    <Container
      title={title}
      isLoading={isLoading}
      onCancel={!isFirst ? previous : undefined}
      onConfirm={handleConfirm}
    >
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
