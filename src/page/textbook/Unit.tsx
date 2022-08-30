import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { getTextbookUnitStep } from 'src/api/textbook';
import { QueryContainer } from 'src/component/QueryContainer';
import { generateStudyPath } from 'src/Routes';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';

export function Unit() {
  const { textbookId, unitId, type } = useParams() as {
    textbookId: string;
    unitId: string;
    type: string;
  };

  const unit = useQuery(
    ['unit', textbookId, unitId],
    () => getTextbookUnitStep({ textbookId, unitId }),
    { enabled: !!unitId }
  );

  const data = unit.data || [];

  return (
    <QueryContainer sx={{ flex: 1, overflow: 'auto' }} {...unit}>
      <List>
        {data.map((value) => {
          const disabled = value.finished === '0';
          return (
            <ListItem key={value.stepNum + value.stepValue} disablePadding>
              <ListItemButton
                component={Link}
                to={generateStudyPath(type, textbookId, unitId, value.stepNum, value.stepValue)}
                disabled={disabled}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: 1.5 }}>
                  {disabled ? (
                    <LockOutlinedIcon />
                  ) : (
                    <PlayArrowOutlinedIcon sx={{ color: 'primary.main' }} />
                  )}
                </ListItemIcon>
                <ListItemText primary={value.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </QueryContainer>
  );
}
