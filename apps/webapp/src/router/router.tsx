import HomePage from '@/router/pages/home';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import ThemeProvider from '@/contexts/providers/theme';
import NotFoundPage from './pages/not-found';

export const Router = createBrowserRouter([
  {
    element: (
      <>
        <ThemeProvider>
          <Toaster />
          <Outlet />
        </ThemeProvider>
      </>
    ),
    children: [{ path: '/', element: <HomePage /> }],
  },
  // Fallback 404 route
  { path: '*', element: <NotFoundPage /> },
]);
