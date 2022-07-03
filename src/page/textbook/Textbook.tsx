import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';
import { getTextbookUnit, getTextbookUnitStep } from 'src/api/textbook';
import { QueryContainer } from 'src/component/QueryContainer';
import { getStudyPath } from 'src/Routes';

export function Textbook() {
  const location = useLocation();
  const params = useParams();
  const textbookId = params.textbookId!;
  const [unitId, setUnitId] = useState<string>('');

  const textbook = useQuery(['textbook', textbookId], () => getTextbookUnit(textbookId));

  const units = textbook.data || [];

  if (!unitId && units.length) {
    const active = units.find((item) => item.selected === '1') || units[0];
    setUnitId(active.id);
  }

  const unit = useQuery(
    ['unit', textbookId, unitId],
    () => getTextbookUnitStep({ textbookId, unitId }),
    { enabled: !!unitId }
  );

  const unitList = unit.data || [];

  return (
    <>
      <Box sx={{ px: 2, py: 1, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h5">{(location.state as any)?.title}</Typography>
      </Box>
      <Box sx={{ height: 48, borderBottom: 1, borderColor: 'divider' }}>
        {textbook.isLoading ? (
          <Skeleton />
        ) : (
          <Tabs value={unitId} onChange={(evt, value) => setUnitId(value)}>
            {units.map((item) => (
              <Tab key={item.id} label={item.title} value={item.id} />
            ))}
          </Tabs>
        )}
      </Box>
      <QueryContainer sx={{ flex: 1, overflow: 'auto' }} {...unit}>
        <List>
          {unitList.map((value, index) => (
            <ListItem
              key={value.stepNum + value.stepValue}
              divider={index !== unitList.length - 1}
              disablePadding
            >
              <ListItemButton
                href={getStudyPath(textbookId, unitId, value.stepNum, value.stepValue)}
                disabled={value.finished === '0'}
              >
                <ListItemText primary={value.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </QueryContainer>
    </>
  );
}
