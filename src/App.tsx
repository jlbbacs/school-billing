import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import LoginPage from './components/LoginPage';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import StudentManagement from '../src/components/StudentManagment';
import PaymentManagement from '../src/components/PaymentManagment';
import FeeManagement from '../src/components/FreeManagement';
import Reports from './components/Reports';

function App() {
  const { isAuthenticated, user, loading, login, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated || !user) {
    return <LoginPage onLogin={login} loading={loading} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <StudentManagement />;
      case 'payments':
        return <PaymentManagement />;
      case 'fees':
        return <FeeManagement />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout 
      currentPage={currentPage} 
      onNavigate={setCurrentPage}
      user={user}
      onLogout={logout}
    >
      {renderCurrentPage()}
    </Layout>
  );
}

export default App;