import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FinanceProvider } from './context/FinanceContext';
import { AppLayout } from './components/layout/AppLayout';

import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
const Reports = () => <h1 className="text-2xl font-bold dark:text-white">Reports</h1>;

function App() {
  return (
    <Router>
      <FinanceProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </AppLayout>
      </FinanceProvider>
    </Router>
  );
}

export default App;
