import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from 'src/auth/AuthProvider';
import { AuthRequired } from './auth/AuthRequired';
import { LoginPage } from './page/login/Login';
import { Layout } from './page/layout/Layout';
import { TextbookList } from './page/textbook/TextbookList';
import { Textbook } from './page/textbook/Textbook';
import { Study } from './page/study';
import { Unit } from './page/textbook/Unit';
import { StudyRecord } from './page/studyRecord';

export interface RouteConfig {
  path?: string;
  element: JSX.Element;
  children?: RouteConfig[];
  index?: boolean;
  auth?: boolean;
}

export const getStudyPath = (
  textbookId: string,
  unitId: string,
  stepId: string,
  stepValue: string
) => `/textbook/${textbookId}/unit/${unitId}/step/${stepId}/${stepValue}`;

const routes: RouteConfig[] = [
  { path: '/login', element: <LoginPage />, auth: false },
  {
    path: getStudyPath(':textbookId', ':unitId', ':stepId', ':stepValue'),
    element: <Study />,
    auth: true,
  },
  {
    path: '/',
    element: <Layout />,
    auth: true,
    children: [
      { index: true, element: <Navigate to="textbooks" replace /> },
      { path: 'textbooks', element: <TextbookList /> },
      {
        path: 'textbook/:textbookId',
        element: <Textbook />,
        children: [{ path: 'unit/:unitId', element: <Unit /> }],
      },
      { path: 'history', element: <StudyRecord /> },
    ],
  },
];

export function Router() {
  const getRouteComponent = (item: RouteConfig, index: number) => {
    return (
      <Route
        key={item.path || index}
        path={item.path}
        index={item.index}
        element={item.auth ? <AuthRequired>{item.element}</AuthRequired> : item.element}
      >
        {item.children?.map(getRouteComponent)}
      </Route>
    );
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>{routes.map(getRouteComponent)}</Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
