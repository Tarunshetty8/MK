import { useState, useContext } from 'react';
import { Search, Mail, Phone, ShoppingBag, MoreVertical } from 'lucide-react';
import { DataContext } from '../context/DataContext';
import './Pages.css';

export default function Customers() {
    const { customers } = useContext(DataContext);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="page-container">
            <div className="page-header" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1>Customer Directory</h1>
                    <p className="subtitle">Manage user accounts and view order history.</p>
                </div>
            </div>

            <div className="panel">
                <div className="panel-header" style={{ background: 'var(--bg-main)' }}>
                    <div className="search-bar" style={{ width: '100%', maxWidth: '400px', backgroundColor: 'var(--bg-card)' }}>
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search customers by name, email, or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th width="40"></th>
                                <th>Customer Details</th>
                                <th>Contact Info</th>
                                <th>Total Orders</th>
                                <th>Total Spent</th>
                                <th>Status</th>
                                <th align="right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.length === 0 && (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>No customers found.</td>
                                </tr>
                            )}
                            {filteredCustomers.map(customer => (
                                <tr key={customer.id}>
                                    <td>
                                        <div className="avatar" style={{ width: '32px', height: '32px', fontSize: '0.8rem', background: 'var(--secondary)' }}>
                                            {customer.name?.charAt(0) || '?'}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="fw-600">{customer.name}</div>
                                        <div className="text-small text-muted">{customer.id}</div>
                                    </td>
                                    <td>
                                        <div className="flex-center" style={{ gap: '0.5rem', marginBottom: '0.25rem' }}>
                                            <Mail size={14} className="text-muted" /> <a href={`mailto:${customer.email}`} className="text-small">{customer.email}</a>
                                        </div>
                                        <div className="flex-center" style={{ gap: '0.5rem' }}>
                                            <Phone size={14} className="text-muted" /> <span className="text-small">{customer.phone}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex-center fw-500" style={{ gap: '0.5rem' }}>
                                            <ShoppingBag size={14} className="text-muted" /> {customer.orders}
                                        </div>
                                    </td>
                                    <td className="fw-600">£{customer.spent.toFixed(2)}</td>
                                    <td>
                                        <span className={`status-badge ${customer.status === 'VIP' ? 'bg-primary' :
                                            customer.status === 'Active' ? 'bg-success' : 'bg-muted'
                                            }`}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td align="right">
                                        <button className="icon-btn" title="More Options" onClick={() => alert('Customer options menu would open here.')}>
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
