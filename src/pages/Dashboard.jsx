import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ShoppingCart, AlertCircle, Calendar } from 'lucide-react';
import { DataContext } from '../context/DataContext';
import './Pages.css';

export default function Dashboard() {
    const { orders, products, enquiries } = useContext(DataContext);
    const navigate = useNavigate();

    // Calculate dynamic stats
    const todayOrders = orders.filter(o => o.date.includes('2026-03-04')); // Mock logic for "today"
    const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length;

    const lowStockCount = products.filter(p => p.stock < 10).length;
    const newEnquiriesCount = enquiries.filter(e => e.status === 'Pending').length;

    const stats = [
        { title: "Today's Revenue", value: "£1,245.00", trend: "+12.5%", isPositive: true, icon: TrendingUp, color: "var(--success)" },
        { title: "Orders Today", value: todayOrders.length.toString(), trend: `${pendingOrdersCount} Pending`, isPositive: false, icon: ShoppingCart, color: "var(--primary)" },
        { title: "New Enquiries", value: newEnquiriesCount.toString(), trend: "Needs review", isPositive: true, icon: Calendar, color: "var(--secondary)" },
        { title: "Low Stock Items", value: lowStockCount.toString(), trend: "Needs attention", isPositive: false, icon: AlertCircle, color: "var(--danger)" },
    ];

    const recentOrders = orders.slice(0, 5);

    const statusColors = {
        'Pending': 'var(--warning)',
        'In Preparation': 'var(--primary)',
        'Ready': 'var(--success)',
        'Collected': 'var(--text-muted)'
    };

    return (
        <div className="page-container dashboard-page">
            <div className="page-header">
                <h1>Dashboard Overview</h1>
                <p className="subtitle">Welcome back, here's what's happening at Marmelo Kitchen today.</p>
            </div>

            <div className="stats-grid">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div className="stat-card" key={i}>
                            <div className="stat-header">
                                <h3>{stat.title}</h3>
                                <div className="icon-wrapper" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                                    <Icon size={20} />
                                </div>
                            </div>
                            <div className="stat-value">{stat.value}</div>
                            <div className={`stat-trend ${stat.isPositive ? 'positive' : 'negative'}`}>
                                {stat.trend}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="dashboard-grid">
                <div className="panel recent-orders">
                    <div className="panel-header">
                        <h2>Recent Orders</h2>
                        <button className="btn btn-outline" onClick={() => navigate('/orders')}>View All</button>
                    </div>
                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Status</th>
                                    <th align="right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map(order => (
                                    <tr key={order.id}>
                                        <td className="fw-600">{order.id}</td>
                                        <td>{order.customer}</td>
                                        <td>
                                            <span className="status-badge" style={{ backgroundColor: `${statusColors[order.status]}15`, color: statusColors[order.status] }}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td align="right" className="fw-600">£{order.amount.toFixed(2)}</td>
                                    </tr>
                                ))}
                                {recentOrders.length === 0 && (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center', padding: '1.5rem' }}>No recent orders.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="panel quick-actions">
                    <div className="panel-header">
                        <h2>Quick Actions</h2>
                    </div>
                    <div className="panel-content actions-list">
                        <button className="action-btn" onClick={() => navigate('/products')}>
                            <span className="action-icon add">+</span>
                            Add New Product
                        </button>
                        <button className="action-btn" onClick={() => navigate('/orders')}>
                            <span className="action-icon check">✓</span>
                            Update Order Status
                        </button>
                        <button className="action-btn" onClick={() => navigate('/events')}>
                            <span className="action-icon event">📅</span>
                            Create Event
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
