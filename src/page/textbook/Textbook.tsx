import { Box, Skeleton, Tab, Tabs, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getTextbookUnit } from 'src/api/textbook';

export function Textbook() {
  const location = useLocation();
  const navigate = useNavigate();

  const { textbookId, unitId } = useParams();

  const textbook = useQuery(['textbook', textbookId], () => getTextbookUnit(textbookId!));

  const units = textbook.data || [];

  const setUnitId = useCallback((id: string, replace = false) => {
    navigate(`unit/${id}`, { replace, state: location.state });
  }, []);

  useEffect(() => {
    if (!unitId && units.length) {
      const active = units.find((item) => item.selected === '1') || units[0];
      setUnitId(active.id, true);
    }
  }, [unitId, units]);

  return (
    <>
      <Box sx={{ px: 2, py: 1, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h5">{(location.state as any)?.title}</Typography>
      </Box>
      <Box sx={{ height: 48, borderBottom: 1, borderColor: 'divider' }}>
        {textbook.isLoading ? (
          <Skeleton />
        ) : (
          <Tabs value={unitId || false} onChange={(evt, value) => setUnitId(value)}>
            {units.map((item) => (
              <Tab key={item.id} label={item.title} value={item.id} />
            ))}
          </Tabs>
        )}
      </Box>
      <Outlet />
    </>
  );
}
