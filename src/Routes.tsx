import { Navigate, useRoutes, RouteObject } from 'react-router-dom';
import { AuthProvider } from 'src/auth/AuthProvider';
import { AuthRequired } from './auth/AuthRequired';
import { LoginPage } from './page/login/Login';
import { Layout } from './page/layout/Layout';
import { TextbookList } from './page/textbook/TextbookList';
import { Textbook } from './page/textbook/Textbook';
import { Study } from './page/study';
import { Unit } from './page/textbook/Unit';
import { StudyRecord } from './page/studyRecord';

declare module 'react-router-dom' {
  interface RouteObject {
    breadcrumbName?: string;
  }
}

export const generateStudyPath = (
  textbookId: string,
  unitId: string,
  stepId: string,
  stepValue: string
) => `/textbook/${textbookId}/unit/${unitId}/step/${stepId}/${stepValue}`;

export const routesConfig: RouteObject[] = [
  { path: '/login', element: <LoginPage /> },
  {
    path: generateStudyPath(':textbookId', ':unitId', ':stepId', ':stepValue'),
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
