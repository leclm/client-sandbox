import type { ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/Login/LoginPage';
// import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { useAuthAtom } from './hooks/useAuthAtom';
import { AppLayout } from './layout/AppLayout';
import { CreateItemPage } from './pages/CreateItem/CreateItemPage';
import { ItensPage } from './pages/Itens/ItensPage';
import { EditItemPage } from './pages/EditItem/EditItemPage';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuthAtom();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ItensPage />} />
          <Route path="create-item" element={<CreateItemPage />} />
          <Route path="edit-item/:id" element={<EditItemPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
