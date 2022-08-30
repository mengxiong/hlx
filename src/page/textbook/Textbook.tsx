import { Tab, Tabs } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getTextbookUnit } from 'src/api/textbook';
import { isObject } from 'src/util';
import { PageContainer } from '../layout/PageContainer';

export function Textbook() {
  const location = useLocation();
  const navigate = useNavigate();
  const { textbookId, unitId, type } = useParams();

  const replaceBreadcrumbs = () => {
    return [
      { path: `/textbooks?type=${type}`, name: '已选课程' },
      { path: location.pathname, name: isObject(location.state) ? location.state.title : '' },
    ];
  };

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
    <PageContainer replaceBreadcrumbs={replaceBreadcrumbs}>
      <Tabs
        variant="scrollable"
        value={unitId || false}
        onChange={(evt, value) => setUnitId(value)}
      >
        {units.map((item) => (
          <Tab key={item.id} label={item.title} value={item.id} />
        ))}
      </Tabs>
      <Outlet />
    </PageContainer>
  );
}
