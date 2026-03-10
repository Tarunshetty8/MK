import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const navigate = useNavigate();

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'POS', path: '/admin/pos', icon: CreditCard },
        { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
        { name: 'Products', path: '/admin/products', icon: Package },
        { name: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare },
        { name: 'Customers', path: '/admin/customers', icon: Users },
        { name: 'Events', path: '/admin/events', icon: Calendar },
        { name: 'Reports', path: '/admin/reports', icon: BarChart3 },
        { name: 'Settings', path: '/admin/settings', icon: Settings },
    ];

    const handleLogout = () => {
        
        navigate('/');
    };

    return (
        <aside className={`sidebar ${!isOpen ? 'closed' : ''}`}>
            <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', justifyContent: isOpen ? 'space-between' : 'center', flexDirection: isOpen ? 'row' : 'column', gap: isOpen ? '0.75rem' : '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Store className="brand-icon" size={32} color="#00d084" strokeWidth={2.5} />
                    {isOpen && <h2 style={{ marginLeft: '10px', marginBottom: 0, whiteSpace: 'nowrap' }}>Marmelo Kitchen</h2>}
                </div>
                <button onClick={toggleSidebar} className="toggle-sidebar-btn" style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px', borderRadius: '4px' }}>
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
                    title={!isOpen ? "Admin User" : undefined}
                >
                    <div className="avatar">A</div>
                    {isOpen && (
                        <div className="user-info">
                            <p className="user-name">Admin User</p>
                            <p className="user-role">Super Admin</p>
                        </div>
                    )}

                    {showProfileMenu && (
                        <div className="profile-dropdown">
                            <div className="profile-details">
                                <p><strong>Email:</strong> admin@marmelo.com</p>
                                <p><strong>Role:</strong> Super Admin</p>
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
