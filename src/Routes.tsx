import { Navigate, useRoutes, RouteObject, Location } from 'react-router-dom';
import { AuthProvider } from 'src/auth/AuthProvider';
import { AuthRequired } from './auth/AuthRequired';
import { LoginPage } from './page/login/Login';
import { Layout } from './page/layout/Layout';
import { TextbookList } from './page/textbook/TextbookList';
import { Textbook } from './page/textbook/Textbook';
import { Study } from './page/study';
import { Unit } from './page/textbook/Unit';
import { StudyRecord } from './page/studyRecord';
import { isObject } from './util';

export interface BreadcrumbLink {
  path: string;
  name: string;
}

type BreadcrumbName =
  | string
  | BreadcrumbLink
  | ((location: Location) => BreadcrumbName)
  | BreadcrumbName[];

declare module 'react-router-dom' {
  interface RouteObject {
    breadcrumbName?: BreadcrumbName;
  }
}

export const getBreadcrumbs = (
  breadcrumbName: BreadcrumbName,
  path: string,
  location: Location
): Array<BreadcrumbLink> => {
  if (typeof breadcrumbName === 'string') {
    return [{ path, name: breadcrumbName }];
  }
  if (Array.isArray(breadcrumbName)) {
    return breadcrumbName.flatMap((v) => getBreadcrumbs(v, path, location));
  }
  if (typeof breadcrumbName === 'function') {
    return getBreadcrumbs(breadcrumbName(location), path, location);
  }

  return [breadcrumbName];
};

export const getStudyPath = (
  textbookId: string,
  unitId: string,
  stepId: string,
  stepValue: string
) => `/textbook/${textbookId}/unit/${unitId}/step/${stepId}/${stepValue}`;

export const routesConfig: RouteObject[] = [
  { path: '/login', element: <LoginPage /> },
  {
    path: getStudyPath(':textbookId', ':unitId', ':stepId', ':stepValue'),
    element: (
      <AuthRequired>
        <Study />
      </AuthRequired>
    ),
  },
  {
    path: '/',
    element: (
      <AuthRequired>
        <Layout />
      </AuthRequired>
    ),
    children: [
      { index: true, element: <Navigate to="textbooks" replace /> },
      { path: 'textbooks', element: <TextbookList />, breadcrumbName: '已选课程' },
      {
        path: 'textbook/:textbookId',
        element: <Textbook />,
        breadcrumbName: [
          { path: 'textbooks', name: '已选课程' },
          (location) => (isObject(location.state) ? location.state.title : ''),
        ],
        children: [{ path: 'unit/:unitId', element: <Unit /> }],
      },
      { path: 'history', element: <StudyRecord />, breadcrumbName: '学习记录' },
    ],
  },
];

export function Routes() {
  const element = useRoutes(routesConfig);

  return <AuthProvider>{element}</AuthProvider>;
}
