import React from 'react';
import Sidebar from '../components/Sidebar';
import styles from '../App.module.css';               
import AllAppointmentsHistory from '../components/AllAppointmentsHistory';

export default function AllAppointmentsHistoryPage() {
  return (
    <div className={styles.appContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <AllAppointmentsHistory />
      </div>
    </div>
  );
}
