import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FinanceProvider } from './context/FinanceContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TransactionsView from './views/TransactionsView';
import BudgetsView from './views/BudgetsView';
import InvestmentsView from './views/InvestmentsView';
import InsightsView from './views/InsightsView';
import SettingsView from './views/SettingsView';

function App() {
  return (
    <FinanceProvider>
      <BrowserRouter>
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
          
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 lg:ml-64 p-4 sm:p-6 transition-all duration-300">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<TransactionsView />} />
              <Route path="/budgets" element={<BudgetsView />} />
              <Route path="/investments" element={<InvestmentsView />} />
              <Route path="/insights" element={<InsightsView />} />
              <Route path="/settings" element={<SettingsView />} />
            </Routes>
          </main>

        </div>
      </BrowserRouter>
    </FinanceProvider>
  );
}

export default App;