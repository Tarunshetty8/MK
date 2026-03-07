import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download } from 'lucide-react';
import './Pages.css';

const salesData = [
    { name: 'Mon', revenue: 4000, orders: 120 },
    { name: 'Tue', revenue: 3000, orders: 98 },
    { name: 'Wed', revenue: 2000, orders: 76 },
    { name: 'Thu', revenue: 2780, orders: 104 },
    { name: 'Fri', revenue: 1890, orders: 85 },
    { name: 'Sat', revenue: 5390, orders: 250 },
    { name: 'Sun', revenue: 6490, orders: 310 },
];

const productData = [
    { name: 'Sourdough', sales: 450 },
    { name: 'Olive Oil', sales: 210 },
    { name: 'Babka', sales: 380 },
    { name: 'Coffee', sales: 150 },
    { name: 'Jam', sales: 290 },
];

export default function Reports() {
    return (
        <div className="page-container">
            <div className="page-header" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1>Analytics & Reports</h1>
                    <p className="subtitle">Track store performance and customer trends.</p>
                </div>
                <button className="btn btn-outline" style={{ display: 'flex', gap: '8px' }}>
                    <Download size={16} /> Export to CSV
                </button>
            </div>

            <div className="dashboard-grid">
                <div className="panel" style={{ gridColumn: '1 / -1' }}>
                    <div className="panel-header">
                        <h2>Weekly Revenue Trend</h2>
                        <div className="filter-group">
                            <select className="input-select" style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>This Year</option>
                            </select>
                        </div>
                    </div>
                    <div className="panel-content" style={{ height: '350px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} tickFormatter={(value) => `£${value}`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow)' }}
                                    itemStyle={{ color: 'var(--text-main)' }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="revenue" name="Revenue (£)" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="panel">
                    <div className="panel-header">
                        <h2>Top Selling Products</h2>
                    </div>
                    <div className="panel-content" style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={productData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--border-color)" />
                                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-main)' }} />
                                <Tooltip cursor={{ fill: 'var(--bg-main)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow)' }} />
                                <Bar dataKey="sales" name="Units Sold" fill="var(--secondary)" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="panel">
                    <div className="panel-header">
                        <h2>Customer Acquisition</h2>
                    </div>
                    <div className="panel-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>+124</h3>
                            <p>New Signups This Week</p>
                            <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)' }}>
                                <span className="text-success fw-600">↑ 14%</span> vs previous period
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
