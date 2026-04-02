import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FinanceProvider } from './context/FinanceContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TransactionsView from './views/TransactionsView';
import BudgetsView from './views/BudgetsView';
import InvestmentsView from './views/InvestmentsView';
import InsightsView from './views/InsightsView';
import SettingsView from './views/SettingsView';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <FinanceProvider>
      <BrowserRouter>
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
          
          {/* Mobile Navbar */}
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

          {/* Sidebar */}
          <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
          />

          {/* Main Content */}
          <main className="flex-1 lg:ml-64 transition-all duration-300">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/transactions" element={<TransactionsView />} />
                <Route path="/budgets" element={<BudgetsView />} />
                <Route path="/investments" element={<InvestmentsView />} />
                <Route path="/insights" element={<InsightsView />} />
                <Route path="/settings" element={<SettingsView />} />
              </Routes>
            </div>
          </main>

        </div>
      </BrowserRouter>
    </FinanceProvider>
  );
}

export default App;