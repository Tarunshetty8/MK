import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    Users,
    Calendar,
    MessageSquare,
    Settings,
    BarChart3,
    Store,
    LogOut,
    CreditCard,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import './Sidebar.css'; 

export default function Sidebar({ isOpen = true, toggleSidebar }) {
    const { currentUser, logoutUser } = useContext(DataContext);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const navigate = useNavigate();

    const isAdmin = currentUser?.role === 'admin';

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'POS', path: '/admin/pos', icon: CreditCard },
        { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
        ...(isAdmin ? [{ name: 'Products', path: '/admin/products', icon: Package }] : []),
        ...(isAdmin ? [{ name: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare }] : []),
        ...(isAdmin ? [{ name: 'Customers', path: '/admin/customers', icon: Users }] : []),
        ...(isAdmin ? [{ name: 'Events', path: '/admin/events', icon: Calendar }] : []),
        ...(isAdmin ? [{ name: 'Reports', path: '/admin/reports', icon: BarChart3 }] : []),
        ...(isAdmin ? [{ name: 'Settings', path: '/admin/settings', icon: Settings }] : []),
    ];

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    };

    return (
        <aside className={`sidebar ${!isOpen ? 'closed' : ''}`}>
            <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', justifyContent: isOpen ? 'space-between' : 'center', flexDirection: isOpen ? 'row' : 'column', gap: isOpen ? '0.75rem' : '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Store className="brand-icon" size={32} color="var(--primary)" strokeWidth={2.5} />
                    {isOpen && <h2 style={{ marginLeft: '10px', marginBottom: 0, whiteSpace: 'nowrap', color: 'var(--text-main)' }}>Marmelo Kitchen</h2>}
                </div>
                <button onClick={toggleSidebar} className="toggle-sidebar-btn" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px', borderRadius: '4px' }}>
                    {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.name}>
                                <NavLink
                                    to={item.path}
                                    end={item.path === '/admin'}
                                    className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
                                    title={!isOpen ? item.name : undefined}
                                >
                                    <Icon size={20} style={{ minWidth: '20px' }} />
                                    {isOpen && <span>{item.name}</span>}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <div
                    className="user-profile"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    style={{ cursor: 'pointer', position: 'relative', justifyContent: isOpen ? 'flex-start' : 'center' }}
                    title={!isOpen ? (currentUser?.name || "Admin") : undefined}
                >
                    <div className="avatar">{currentUser?.name?.charAt(0) || 'A'}</div>
                    {isOpen && (
                        <div className="user-info">
                            <p className="user-name">{currentUser?.name || 'Admin User'}</p>
                            <p className="user-role">{currentUser?.role === 'admin' ? 'Super Admin' : 'Staff'}</p>
                        </div>
                    )}

                    {showProfileMenu && (
                        <div className="profile-dropdown">
                            <div className="profile-details">
                                <p><strong>Email:</strong> {currentUser?.email}</p>
                                <p><strong>Role:</strong> {currentUser?.role}</p>
                            </div>
                            <button className="logout-button" onClick={(e) => {
                                e.stopPropagation();
                                handleLogout();
                            }}>
                                <LogOut size={16} />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
