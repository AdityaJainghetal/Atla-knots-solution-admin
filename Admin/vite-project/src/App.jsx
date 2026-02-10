
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/authLogin/Login';
import Dashboard from './Pages/authLogin/Dashboard';
import Layout from './Component/Layout';
import ProtectedRoute from './Component/ProtectedRoute';
// import { Home } from 'lucide-react';
import Homepage from './Pages/Home/homepage';
// import HomeList from './Pages/Home/HomeList';
import CreateHomeContent from './Pages/Home/homepage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes - wrapped with Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/homepage" element={<Homepage/>} />
            <Route path="/homepage/edit/:id" element={<Homepage isEdit />} />
            <Route path="/homelist" element={<CreateHomeContent />} />
          </Route>
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;