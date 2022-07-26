import { Breadcrumbs as BreadcrumbComponent, Link, Typography } from '@mui/material';
import { matchRoutes, useLocation } from 'react-router-dom';
import { BreadcrumbLink, getBreadcrumbs, routesConfig } from 'src/Routes';

export interface BreadcrumbsProps {}

export function Breadcrumbs() {
  const location = useLocation();

  const breadcrumbs = (matchRoutes(routesConfig, location) || [])
    .filter((v) => v.route.breadcrumbName)
    .reduce((acc, cur) => {
      console.log(cur);
      return acc.concat(getBreadcrumbs(cur.route.breadcrumbName!, cur.pathname, location));
    }, [] as BreadcrumbLink[])
    .map((item, index, list) => {
      console.log(item);
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

  return <BreadcrumbComponent aria-label="breadcrumb">{breadcrumbs}</BreadcrumbComponent>;
}
