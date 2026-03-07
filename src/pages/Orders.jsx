import { useState, useContext } from 'react';
import { Search, Filter, Eye, Edit2 } from 'lucide-react';
import Modal from '../components/Modal';
import { DataContext } from '../context/DataContext';
import './Pages.css';

const statusColors = {
    'Pending': 'var(--warning)',
    'In Preparation': 'var(--primary)',
    'Ready': 'var(--success)',
    'Collected': 'var(--text-muted)'
};

export default function Orders() {
    const { orders, updateOrderStatus } = useContext(DataContext);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal states
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const filteredOrders = orders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUpdateStatus = (newStatus) => {
        updateOrderStatus(selectedOrder.id, newStatus);
        setIsStatusModalOpen(false);
    };

    return (
        <div className="page-container">
            <div className="page-header" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1>Order Management</h1>
                    <p className="subtitle">View and update customer orders.</p>
                </div>
                <button className="btn btn-primary" style={{ display: 'flex', gap: '8px' }} onClick={() => alert('Filter options coming soon!')}>
                    <Filter size={16} /> Filter Orders
                </button>
            </div>

            <div className="panel">
                <div className="panel-header" style={{ background: 'var(--bg-main)' }}>
                    <div className="search-bar" style={{ width: '100%', maxWidth: '400px', backgroundColor: 'var(--bg-card)' }}>
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search by order ID or customer..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date & Time</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Collection</th>
                                <th align="right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.length === 0 && (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>No orders found matching your search.</td>
                                </tr>
                            )}
                            {filteredOrders.map(order => (
                                <tr key={order.id}>
                                    <td className="fw-600">{order.id}</td>
                                    <td>{new Date(order.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</td>
                                    <td>{order.customer}</td>
                                    <td>{order.items.length > 30 ? order.items.substring(0, 30) + '...' : order.items}</td>
                                    <td className="fw-600">£{order.amount.toFixed(2)}</td>
                                    <td>
                                        <span className="status-badge" style={{ backgroundColor: `${statusColors[order.status]}15`, color: statusColors[order.status] }}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>{order.collection}</td>
                                    <td align="right">
                                        <div className="action-buttons justify-end">
                                            <button className="icon-btn" title="View Details" onClick={() => { setSelectedOrder(order); setIsViewModalOpen(true); }}>
                                                <Eye size={18} />
                                            </button>
                                            <button className="icon-btn" title="Update Status" onClick={() => { setSelectedOrder(order); setIsStatusModalOpen(true); }}>
                                                <Edit2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="pagination">
                    <span className="page-info">Showing {filteredOrders.length} entries</span>
                    <div className="page-controls">
                        <button className="btn btn-outline btn-sm" disabled>Previous</button>
                        <button className="btn btn-primary btn-sm">1</button>
                        <button className="btn btn-outline btn-sm" disabled>Next</button>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                title={`Order Details: ${selectedOrder?.id}`}
                footer={<button className="btn btn-outline" onClick={() => setIsViewModalOpen(false)}>Close</button>}
            >
                {selectedOrder && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'var(--bg-main)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                            <div>
                                <p className="text-muted text-small">Customer Name</p>
                                <p className="fw-500">{selectedOrder.customer}</p>
                            </div>
                            <div>
                                <p className="text-muted text-small">Collection Time</p>
                                <p className="fw-500">{selectedOrder.collection}</p>
                            </div>
                            <div>
                                <p className="text-muted text-small">Total Amount</p>
                                <p className="fw-600">£{selectedOrder.amount.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-muted text-small">Status</p>
                                <span className="status-badge" style={{ backgroundColor: `${statusColors[selectedOrder.status]}15`, color: statusColors[selectedOrder.status] }}>
                                    {selectedOrder.status}
                                </span>
                            </div>
                        </div>

                        <h3 style={{ fontSize: '1rem', marginTop: '1rem' }}>Order Items</h3>
                        <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                            <p className="fw-500">{selectedOrder.items}</p>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal
                isOpen={isStatusModalOpen}
                onClose={() => setIsStatusModalOpen(false)}
                title="Update Order Status"
                footer={
                    <>
                        <button className="btn btn-outline" onClick={() => setIsStatusModalOpen(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={() => handleUpdateStatus(document.getElementById('status-select').value)}>Save Changes</button>
                    </>
                }
            >
                <div className="form-group">
                    <label className="form-label">Select New Status</label>
                    <select id="status-select" className="form-select" defaultValue={selectedOrder?.status}>
                        <option value="Pending">Pending</option>
                        <option value="In Preparation">In Preparation</option>
                        <option value="Ready">Ready</option>
                        <option value="Collected">Collected</option>
                    </select>
                </div>
            </Modal>
        </div>
    );
}
