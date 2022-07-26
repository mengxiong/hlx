import { Box } from '@mui/material';
import { Sx } from 'src/types';
import { Breadcrumbs } from './Breadcrumbs';

export interface PageContainerProps {
  children: React.ReactNode;
  contentStyle?: Sx;
}

export function PageContainer({ children, contentStyle }: PageContainerProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          borderBottomColor: 'divider',
          borderBottomWidth: 1,
          borderBottomStyle: 'solid',
        }}
      >
        <Breadcrumbs></Breadcrumbs>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'auto',
          ...contentStyle,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
