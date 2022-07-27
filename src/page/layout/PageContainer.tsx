import { Box } from '@mui/material';
import { Sx } from 'src/types';
import { Breadcrumbs, BreadcrumbsProps } from './Breadcrumbs';

export interface PageContainerProps extends BreadcrumbsProps {
  children: React.ReactNode;
  contentStyle?: Sx;
}

export function PageContainer({ children, contentStyle, ...restProps }: PageContainerProps) {
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
        <Breadcrumbs {...restProps}></Breadcrumbs>
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
