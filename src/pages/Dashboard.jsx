import { useContext, useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ShoppingBag, MessageSquare, AlertTriangle, Clock, ChevronDown } from 'lucide-react';
import { DataContext } from '../context/DataContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './Pages.css';

const statusColors = {
    'Pending': 'var(--warning)',
    'In Preparation': 'var(--primary)',
    'Ready': 'var(--success)',
    'Collected': 'var(--text-muted)',
    'Cancelled': 'var(--danger)'
};

const CustomDropdown = ({ value, options, onChange, colorMap }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedColor = colorMap[value] || 'var(--text-muted)';
    
    return (
        <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
            <div 
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    border: `1px solid ${selectedColor}30`,
                    backgroundColor: `${selectedColor}15`,
                    color: selectedColor,
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    whiteSpace: 'nowrap'
                }}
            >
                {value}
                <ChevronDown size={14} style={{ opacity: 0.7 }} />
            </div>

            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '4px',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-md)',
                    zIndex: 10,
                    minWidth: '100%',
                    overflow: 'hidden',
                    textAlign: 'left'
                }}>
                    {options.map(option => (
                        <div
                            key={option}
                            onClick={() => {
                                onChange(option);
                                setIsOpen(false);
                            }}
                            style={{
                                padding: '8px 12px',
                                fontSize: '0.75rem',
                                fontWeight: '500',
                                color: colorMap[option] || 'var(--text-main)',
                                cursor: 'pointer',
                                backgroundColor: 'transparent',
                                borderBottom: option !== options[options.length - 1] ? '1px solid var(--border-color)' : 'none',
                                whiteSpace: 'nowrap'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = `${colorMap[option] || 'var(--text-muted)'}15`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Helper function to get initials
const getInitials = (name) => {
    if (!name) return 'GU';
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
};

// Helper for status colors
const getStatusColors = (status) => {
    switch (status?.toUpperCase()) {
        case 'CONFIRMED': return { color: '#3b82f6', bg: '#dbeafe' };
        case 'PREPARING': return { color: '#f59e0b', bg: '#fef3c7' };
        case 'IN PREPARATION': return { color: '#f59e0b', bg: '#fef3c7' };
        case 'READY': return { color: '#10b981', bg: '#d1fae5' };
        case 'COLLECTED': return { color: '#64748b', bg: '#f1f5f9' };
        case 'CANCELLED': return { color: '#ef4444', bg: '#fee2e2' };
        case 'PENDING': return { color: '#f59e0b', bg: '#fef3c7' };
        default: return { color: '#64748b', bg: '#f1f5f9' };
    }
};

export default function Dashboard() {
    const { orders, products, enquiries } = useContext(DataContext);
    const navigate = useNavigate();
    const [timeframe, setTimeframe] = useState('Week');

    const todayStr = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    // --- Computed Data ---
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Date filtering
    const weekOrders = useMemo(() => orders.filter(o => new Date(o.date) >= oneWeekAgo), [orders, oneWeekAgo]);

    // Metrics
    const weekRevenue = weekOrders.reduce((sum, o) => sum + (o.amount || 0), 0);
    const ordersThisWeek = weekOrders.length;
    const pendingEnquiries = enquiries.filter(e => e.status === 'Pending').length;
    
    // Low stock items
    const lowStockItems = useMemo(() => products.filter(p => p.stock < 10), [products]);
    const lowStockCount = lowStockItems.length;

    // Line Chart Data (Last 7 days revenue)
    const revenueData = useMemo(() => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dataMap = {};
        
        // Initialize last 7 days
        for (let i = 6; i >= 0; i--) {
            const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            dataMap[days[d.getDay()]] = 0;
        }

        weekOrders.forEach(o => {
            const d = new Date(o.date);
            const dayName = days[d.getDay()];
            if (dataMap[dayName] !== undefined) {
                dataMap[dayName] += (o.amount || 0);
            }
        });

        return Object.keys(dataMap).map(key => ({ name: key, value: dataMap[key] }));
    }, [weekOrders, now]);

    // Pie Chart Data (Orders by Status - All time)
    const statusData = useMemo(() => {
        const counts = { 'Confirmed': 0, 'Preparing': 0, 'Ready': 0, 'Collected': 0, 'Cancelled': 0, 'Pending': 0 };
        orders.forEach(o => {
            const st = o.status === 'In Preparation' ? 'Preparing' : o.status;
            if (counts[st] !== undefined) counts[st]++;
            else counts[st] = 1;
        });
        
        return [
            { name: 'Confirmed', value: counts['Confirmed'] || 0, color: '#3b82f6' },
            { name: 'Preparing', value: (counts['Preparing'] || 0) + (counts['Pending'] || 0), color: '#f59e0b' },
            { name: 'Ready', value: counts['Ready'] || 0, color: '#10b981' },
            { name: 'Collected', value: counts['Collected'] || 0, color: '#64748b' },
            { name: 'Cancelled', value: counts['Cancelled'] || 0, color: '#ef4444' }
        ].filter(item => item.value > 0);
    }, [orders]);

    // Top Products parsing logic (Fallback to dummy if no orders matching)
    const topProducts = useMemo(() => {
        const prodRevenue = {};
        
        // Attempt to parse items_summary "Product Name (xQty)"
        orders.forEach(o => {
            if (o.items) {
                const itemsList = o.items.split(',').map(s => s.trim());
                itemsList.forEach(itemStr => {
                    const match = itemStr.match(/(.+?)\s*\(x(\d+)\)/);
                    if (match) {
                        const prodName = match[1].trim();
                        const qty = parseInt(match[2], 10);
                        // Find product price
                        const prodListMatch = products.find(p => p.name === prodName);
                        if (prodListMatch) {
                            if (!prodRevenue[prodName]) prodRevenue[prodName] = 0;
                            prodRevenue[prodName] += (prodListMatch.price * qty);
                        }
                    }
                });
            }
        });

        // Convert to array and sort
        const sorted = Object.keys(prodRevenue)
            .map(name => ({ name, value: prodRevenue[name] }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5);

        // If no parsed data, return empty to not break UI, or use dummy if products are empty to show design
        if (sorted.length === 0 && products.length > 0) {
            // Fallback: just list top 5 most expensive items
            return products.sort((a, b) => b.price - a.price).slice(0, 5).map(p => ({
                name: p.name,
                value: p.price * 10
            }));
        }
        return sorted;
    }, [orders, products]);

    const maxProductValue = topProducts.length > 0 ? Math.max(...topProducts.map(p => p.value)) : 1000;
    const xAxisScale = [0, maxProductValue * 0.25, maxProductValue * 0.5, maxProductValue * 0.75, maxProductValue].map(v => Math.round(v));

    // Recent Orders
    const recentOrdersList = orders.slice(0, 5);

    return (
        <div className="page-container dashboard-page">
            <div className="page-header" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)' }}>Dashboard</h1>
                    <p className="subtitle" style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>{todayStr}</p>
                </div>
                {/* Timeframe toggle is visually present but currently drives UI loosely as we default to "Week" for revenue */}
                <div className="timeframe-toggle" style={{ display: 'flex', backgroundColor: 'var(--bg-muted)', padding: '4px', borderRadius: '8px', gap: '4px' }}>
                    {['Day', 'Week', 'Month'].map(t => (
                        <button 
                            key={t}
                            onClick={() => setTimeframe(t)}
                            style={{
                                padding: '6px 16px',
                                border: 'none',
                                borderRadius: '6px',
                                backgroundColor: timeframe === t ? 'white' : 'transparent',
                                color: timeframe === t ? 'var(--text-main)' : 'var(--text-muted)',
                                fontWeight: timeframe === t ? 600 : 500,
                                fontSize: '0.875rem',
                                cursor: 'pointer',
                                boxShadow: timeframe === t ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                            }}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stat Cards */}
            <div className="stats-grid-new">
                {/* Revenue Card */}
                <div className="stat-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', backgroundColor: '#d1fae5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
                            <TrendingUp size={20} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#d1fae5', color: '#059669', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>
                            Last 7 Days
                        </div>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: 'auto', letterSpacing: '0.05em' }}>WEEK REVENUE</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>£{weekRevenue.toFixed(2)}</div>
                </div>

                {/* Orders Card */}
                <div className="stat-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', backgroundColor: '#dbeafe', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                            <ShoppingBag size={20} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#dbeafe', color: '#3b82f6', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>
                            Last 7 Days
                        </div>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: 'auto', letterSpacing: '0.05em' }}>ORDERS THIS WEEK</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>{ordersThisWeek}</div>
                </div>

                {/* Enquiries Card */}
                <div className="stat-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', backgroundColor: '#fef3c7', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
                            <MessageSquare size={20} />
                        </div>
                        <div style={{ color: 'var(--text-muted)', padding: '4px 0', fontSize: '0.8rem', fontWeight: 500 }}>
                            {pendingEnquiries} pending
                        </div>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: 'auto', letterSpacing: '0.05em' }}>PENDING ENQUIRIES</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>{pendingEnquiries}</div>
                </div>

                {/* Low Stock Card */}
                <div className="stat-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', backgroundColor: '#fee2e2', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                            <AlertTriangle size={20} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#fee2e2', color: '#ef4444', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>
                            <span style={{ fontSize: '10px' }}>~</span> needs attention
                        </div>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: 'auto', letterSpacing: '0.05em' }}>LOW STOCK ITEMS</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>{lowStockCount}</div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="dashboard-row-chart">
                <div className="panel" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Revenue Trend</h2>
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Last 7 days</span>
                        </div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>£{weekRevenue.toFixed(2)}</div>
                    </div>
                    <div style={{ height: '240px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(value) => `£${value}`} />
                                <Line type="monotone" dataKey="value" stroke="#059669" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="panel" style={{ padding: '1.5rem' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Orders by Status</h2>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>All time</span>
                    </div>
                    <div style={{ height: '160px', width: '100%', position: 'relative' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={75}
                                    stroke="none"
                                    dataKey="value"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '1rem' }}>
                        {statusData.map(status => (
                            <div key={status.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: status.color }}></div>
                                    {status.name}
                                </div>
                                <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{status.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="dashboard-row-split">
                <div className="panel">
                    <div className="panel-header" style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Recent Orders</h2>
                        <button onClick={() => navigate('/admin/orders')} style={{ color: 'var(--primary)', background: 'none', border: 'none', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>View all &rarr;</button>
                    </div>
                    <div className="panel-content" style={{ padding: '0 1.5rem' }}>
                        {recentOrdersList.length > 0 ? recentOrdersList.map((order, idx) => {
                            const { color: statusColor, bg: statusBg } = getStatusColors(order.status);
                            return (
                                <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 0', borderBottom: idx !== recentOrdersList.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--bg-muted)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                            {getInitials(order.customer)}
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.95rem' }}>{order.id}</span>
                                            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{order.customer}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                                        <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>£{(order.amount || 0).toFixed(2)}</span>
                                        <CustomDropdown 
                                            value={order.status}
                                            options={['Pending', 'In Preparation', 'Ready', 'Collected', 'Cancelled']}
                                            colorMap={statusColors}
                                            onChange={(newStatus) => updateOrderStatus(order.id, newStatus)}
                                        />
                                    </div>
                                </div>
                            );
                        }) : (
                            <p style={{ textAlign: 'center', color: 'var(--text-muted)', margin: '2rem 0' }}>No recent orders.</p>
                        )}
                    </div>
                </div>

                <div className="panel">
                    <div className="panel-header" style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Top Products (by Revenue)</h2>
                        <button onClick={() => navigate('/admin/products')} style={{ color: 'var(--primary)', background: 'none', border: 'none', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>View all &rarr;</button>
                    </div>
                    <div className="panel-content" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                            {topProducts.length > 0 ? topProducts.map((product) => (
                                <div key={product.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '120px', textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={product.name}>
                                        {product.name}
                                    </div>
                                    <div style={{ flex: 1, height: '20px', backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                                        <div style={{ height: '100%', width: `${maxProductValue > 0 ? (product.value / maxProductValue) * 100 : 0}%`, backgroundColor: 'var(--primary)', borderRadius: '0 4px 4px 0', minWidth: '4px' }}></div>
                                    </div>
                                </div>
                            )) : (
                                <p style={{ textAlign: 'center', color: 'var(--text-muted)', margin: '1rem 0' }}>Not enough order data to calculate top products.</p>
                            )}
                            
                            {/* X Axis scale */}
                            {topProducts.length > 0 && (
                                <div style={{ display: 'flex', marginLeft: '136px', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.75rem' }}>
                                    {xAxisScale.map((val, i) => (
                                        <span key={i}>£{val}</span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                            <Clock size={16} />
                            Upcoming orders summary auto-generated
                        </div>
                    </div>
                </div>
            </div>

            {/* Restocking Alert Banner */}
            {lowStockCount > 0 && (
                <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                        <AlertTriangle size={24} color="#d97706" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <div style={{ fontWeight: 600, color: '#92400e', fontSize: '1rem' }}>
                                {lowStockCount} product{lowStockCount > 1 ? 's' : ''} need restocking
                            </div>
                            <div style={{ color: '#b45309', fontSize: '0.875rem' }}>
                                {lowStockItems.slice(0, 3).map(p => `${p.name} (${p.stock === 0 ? 'out of stock' : p.stock + ' remaining'})`).join(' · ')}
                                {lowStockCount > 3 ? ' · and more...' : ''}
                            </div>
                        </div>
                    </div>
                    <button onClick={() => navigate('/admin/products')} style={{ color: '#92400e', background: 'none', border: 'none', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                        Manage &rarr;
                    </button>
                </div>
            )}
            
        </div>
    );
}
