import { useState } from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import './Header.css'; 

export default function Header({ onToggleSidebar }) {
    const [showNotifications, setShowNotifications] = useState(false);

    const notifications = [
        { id: 1, text: 'New catering enquiry from Jessica', time: '5m ago' },
        { id: 2, text: 'Stock alert: Chocolate Babka is low', time: '1h ago' },
        { id: 3, text: 'Order #ORD-7290 ready for collection', time: '2h ago' },
    ];

    return (
        <header className="app-header">
            <div className="header-left">
                <button className="mobile-menu-btn" onClick={onToggleSidebar}>
                    <Menu size={24} />
                </button>
                <div className="search-bar">
                    <Search className="search-icon" size={20} />
                    <input type="text" placeholder="Search orders, products, customers..." />
                </div>
            </div>

            <div className="header-right">
                <div className="notification-wrapper">
                    <button
                        className="icon-button notification-btn"
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <Bell size={20} />
                        <span className="badge">{notifications.length}</span>
                    </button>

                    {showNotifications && (
                        <div className="notification-dropdown">
                            <div className="dropdown-header">
                                <h3>Notifications</h3>
                                <button className="clear-btn" onClick={() => setShowNotifications(false)}>Close</button>
                            </div>
                            <div className="dropdown-body">
                                {notifications.map(n => (
                                    <div key={n.id} className="notification-item">
                                        <p>{n.text}</p>
                                        <span className="time">{n.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
