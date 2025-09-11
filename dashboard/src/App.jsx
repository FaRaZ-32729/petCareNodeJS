// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/admin/DashboardPage';
import UsersManagementPage from './pages/admin/UsersManagementPage';
import PetsManagementPage from './pages/admin/PetsManagementPage';
import AppointmentsManagementPage from './pages/admin/AppointmentsManagementPage';
import AdoptionsManagementPage from './pages/admin/AdoptionsManagementPage';
import HealthRecordsPage from './pages/admin/HealthRecordsPage';
import { ToastContainer } from "react-toastify";
import ListProducts from './pages/admin/ListProducts';
import AdminSidebar from './components/AdminSidebar';
import AdminApp from './pages/admin/AdminApp';

function App() {
  return (

    <>
      <AdminApp />
    </>
  );
}

export default App;