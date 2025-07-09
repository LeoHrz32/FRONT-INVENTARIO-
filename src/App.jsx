// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Tu ProtectedRoute
import ProtectedRoute from './components/ProtectedRoute';

// Layouts & Pages
import LayoutAdmin from './layouts/LayoutAdmin';
import UserTable from './pages/users/userPage';
import DynamicTableView from './pages/tablas/tablasPage';
import RegistrosPage from './pages/registros/registrosPage';
import Error404 from './pages/404/Error404';
import LoginPage from './pages/users/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta raíz pública: redirige siempre al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Ruta pública de login */}
        <Route path="/login" element={<LoginPage />} />
        {/* Rutas protegidas por JWT */}
        <Route element={<ProtectedRoute />}>
          <Route path="/users" element={<LayoutAdmin />}>
            <Route index element={<UserTable />} />
          </Route>
          <Route path="/tablas" element={<LayoutAdmin />}>
            <Route index element={<DynamicTableView />} />
          </Route>
          <Route path="/registros" element={<LayoutAdmin />}>
            <Route index element={<RegistrosPage />} />
          </Route>
        </Route>
        {/* Página 404 para cualquier otra ruta */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;