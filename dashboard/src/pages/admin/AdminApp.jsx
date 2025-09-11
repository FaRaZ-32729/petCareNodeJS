import React from 'react'
import './AdminApp.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import AdminSidebar from '../../components/AdminSidebar'
import DashboardPage from './DashboardPage'
import UsersManagementPage from './UsersManagementPage'
import PetsManagementPage from './PetsManagementPage'
import ListProducts from './ListProducts'
import AppointmentsManagementPage from './AppointmentsManagementPage'
import AdoptionsManagementPage from './AdoptionsManagementPage'
import HealthRecordsPage from './HealthRecordsPage'

const AdminApp = () => {
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/admin" replace />} />
                    <Route path="/admin/*" element={<AdminSidebar />}>
                        <Route index element={<DashboardPage />} />
                        <Route path="users" element={<UsersManagementPage />} />
                        <Route path="pets" element={<PetsManagementPage />} />
                        <Route path="products" element={<ListProducts />} />
                        <Route path="appointments" element={<AppointmentsManagementPage />} />
                        <Route path="adoptions" element={<AdoptionsManagementPage />} />
                        <Route path="health-records" element={<HealthRecordsPage />} />
                    </Route>
                    <Route path="*" element={<div className="p-10 text-center">404 - Page Not Found</div>} />
                </Routes>
            </Router>
        </>
    )
}

export default AdminApp
