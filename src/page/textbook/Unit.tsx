import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { getTextbookUnitStep } from 'src/api/textbook';
import { QueryContainer } from 'src/component/QueryContainer';
import { getStudyPath } from 'src/Routes';

export function Unit() {
  const { textbookId, unitId } = useParams() as { textbookId: string; unitId: string };

  const unit = useQuery(
    ['unit', textbookId, unitId],
    () => getTextbookUnitStep({ textbookId, unitId }),
    { enabled: !!unitId }
  );

  const data = unit.data || [];

  return (
    <QueryContainer sx={{ flex: 1, overflow: 'auto' }} {...unit}>
      <List>
        {data.map((value) => (
          <ListItem key={value.stepNum + value.stepValue} disablePadding>
            <ListItemButton
              component={Link}
              to={getStudyPath(textbookId, unitId, value.stepNum, value.stepValue)}
              disabled={value.finished === '0'}
            >
              <ListItemText primary={value.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </QueryContainer>
  );
}
