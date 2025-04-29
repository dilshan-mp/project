import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SellerRegistrationPage from './pages/SellerRegistrationPage';
import AddProductPage from './pages/AddProductPage';
import MainLayout from './components/layout/MainLayout';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="seller-registration" element={<SellerRegistrationPage />} />
              <Route path="add-product" element={<AddProductPage />} />
            </Route>
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;