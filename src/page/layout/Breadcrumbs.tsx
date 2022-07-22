import { Breadcrumbs as BreadcrumbComponent, Link, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { BreadcrumbLink } from 'src/Routes';

export interface BreadcrumbsProps {
  list: BreadcrumbLink[];
}

export function Breadcrumbs({ list }: BreadcrumbsProps) {
  const breadcrumbs = list.map((item, index) => {
    if (index !== list.length - 1) {
      return (
        <Link underline="hover" key={item.path} color="inherit" href={item.path}>
          {item.name}
        </Link>
      );
    }
    return (
      <Typography variant="h6" key={item.path} fontSize="1rem" color="text.primary">
        {item.name}
      </Typography>
    );
  });

  return (
    <BreadcrumbComponent aria-label="breadcrumb" sx={{ p: 2, mb: -1 }}>
      <Link
        sx={{ display: 'flex', alignItems: 'center' }}
        underline="hover"
        color="inherit"
        href="/"
      >
        <HomeIcon></HomeIcon>
      </Link>
      {breadcrumbs}
    </BreadcrumbComponent>
  );
}
