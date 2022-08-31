import { Navigate, useRoutes, RouteObject } from 'react-router-dom';
import { AuthProvider } from 'src/auth/AuthProvider';
import { AuthRequired } from './auth/AuthRequired';
import { LoginPage } from './page/login';
import { Layout } from './page/layout/Layout';
import { TextbookList } from './page/textbook';
import { Textbook } from './page/textbook/Textbook';
import { Study } from './page/study';
import { Unit } from './page/textbook/Unit';
import { StudyRecord } from './page/studyRecord';
import { Feedback } from './page/feedback';

declare module 'react-router-dom' {
  interface RouteObject {
    breadcrumbName?: string;
  }
}

export const generateStudyPath = ({ stepId, stepValue }: { stepId: string; stepValue: string }) => {
  return `step/${stepId}/${stepValue}`;
};

export const routesConfig: RouteObject[] = [
  { path: '/login', element: <LoginPage /> },
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
        path: 'textbook/:type/:textbookId',
        element: <Textbook />,
        children: [
          {
            path: 'unit/:unitId',
            element: <Unit />,
            children: [
              {
                path: generateStudyPath({ stepId: ':stepId', stepValue: ':stepValue' }),
                element: <Study />,
              },
            ],
          },
        ],
      },
      { path: 'history', element: <StudyRecord />, breadcrumbName: '学习记录' },
      { path: 'feedback', element: <Feedback />, breadcrumbName: '问题反馈' },
    ],
  },
];

export function Routes() {
  const element = useRoutes(routesConfig);
  return <AuthProvider>{element}</AuthProvider>;
}
