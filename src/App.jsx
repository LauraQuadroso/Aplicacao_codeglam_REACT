import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import styles from './App.module.css';

import Sidebar from './components/Sidebar';
import TopCards from './components/TopCards';
import ChartArea from './components/ChartArea';
import BirthdayList from './components/BirthdayList';


import ClientPage from './pages/ClientPage';
import ClientListPage from './Pages/ClientListPage';
import EditClientPage from './Pages/EditClientPage';
import AddClientPage from './Pages/AddClientPage';

import SchedulePage from './pages/SchedulePage';
import EmployeePage from './pages/EmployeePage';
import EditEmployeePage from './pages/EditEmployeePage';
import EmployeeListPage from './pages/EmployeeListPage';
import AddEmployeePage from './Pages/AddEmployeePage';

function Dashboard() {
  return (
    <div className={styles.appContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <div className={styles.topBar}></div>
        <TopCards />
        <div className={styles.gridArea}>
          <ChartArea />
          <BirthdayList />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

    
        {/* AGENDA */}
        <Route
          path="/schedule"
          element={
            <div className={styles.appContainer}>
              <Sidebar />
              <div className={styles.mainContent}>
                <SchedulePage />
              </div>
            </div>
          }
        />

        {/* CLIENTES */}
        <Route path="/cliente/:id" element={<ClientPage />} />
        <Route path="/clientes" element={<ClientListPage />} />
        <Route path="/cliente/editar/:id" element={<EditClientPage />} />
        <Route path="/add-cliente" element={<AddClientPage />} />
        

        

        {/* FUNCIONÁRIOS */}
        <Route path="/funcionarios" element={<EmployeeListPage />} />
        <Route path="/funcionario" element={<Navigate to="/funcionarios" replace />} />
        <Route path="/funcionario/:id" element={<EmployeePage />} />
        <Route path="/funcionario/editar/:id" element={<EditEmployeePage />} />
        <Route path="/add-funcionario" element={<AddEmployeePage />} />
      </Routes>
    </BrowserRouter>
  );
}
