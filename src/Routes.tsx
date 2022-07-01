import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from 'src/auth/AuthProvider';
import { AuthRequired } from './auth/AuthRequired';
import { LoginPage } from './auth/Login';
import { Layout } from './page/layout/Layout';
import { TextbookList } from './page/textbook/TextbookList';
import { UnitList } from './page/textbook/UnitList';
import { StepList } from './page/textbook/StepList';
import { Study } from './page/study';

export interface RouteConfig {
  path?: string;
  element: JSX.Element;
  children?: RouteConfig[];
  index?: boolean;
  auth?: boolean;
}

export const getUnitListPath = (id: string) => `/textbook/${id}`;
export const getStepListPath = (bookId: string, unitId: string) =>
  `/textbook/${bookId}/unit/${unitId}`;

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
      { path: getUnitListPath(':textbookId'), element: <UnitList /> },
      { path: getStepListPath(':textbookId', ':unitId'), element: <StepList /> },
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
