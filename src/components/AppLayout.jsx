import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

export default function AppLayout() {
    const { currentUser } = useContext(DataContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();

    if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'staff')) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return (
        <div className="app-layout">
            <div className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
            <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            </div>
            <div className="main-container">
                <Header onToggleSidebar={() => setIsSidebarOpen(true)} />
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
