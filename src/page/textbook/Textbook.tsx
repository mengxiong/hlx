import { Box, Skeleton, Tab, Tabs } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getTextbookUnit } from 'src/api/textbook';
import { Header } from 'src/component/Header';

export function Textbook() {
  const location = useLocation();
  const navigate = useNavigate();

  const { textbookId, unitId } = useParams();

  const textbook = useQuery(['textbook', textbookId], () => getTextbookUnit(textbookId!));

  const units = textbook.data || [];

  const setUnitId = useCallback((id: string) => {
    navigate(`unit/${id}`, { replace: true, state: location.state });
  }, []);

  useEffect(() => {
    if (!unitId && units.length) {
      const active = units.find((item) => item.selected === '1') || units[0];
      setUnitId(active.id);
    }
  }, [unitId, units]);

  return (
    <>
      <Header title={(location.state as any)?.title} />
      <Box sx={{ height: 48, borderBottom: 1, borderColor: 'divider' }}>
        {textbook.isLoading ? (
          <Skeleton height={48} width={200} />
        ) : (
          <Tabs
            variant="scrollable"
            value={unitId || false}
            onChange={(evt, value) => setUnitId(value)}
          >
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
