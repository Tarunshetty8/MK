import { useState, useContext } from 'react';
import { Search } from 'lucide-react';
import Modal from '../components/Modal';
import { DataContext } from '../context/DataContext';
import './Pages.css';

export default function Enquiries() {
    const { enquiries, updateEnquiryStatus } = useContext(DataContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);

    const filteredEnquiries = enquiries.filter(enq => {
        const matchesSearch = enq.name.toLowerCase().includes(searchTerm.toLowerCase()) || enq.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'All' || enq.type === typeFilter;
        return matchesSearch && matchesType;
    });

    const handleStatusChange = (status) => {
        updateEnquiryStatus(selectedEnquiry.id, status);
        setIsModalOpen(false);
    };

    return (
        <div className="page-container">
            <div className="page-header" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1>Service Enquiries</h1>
                    <p className="subtitle">Review and respond to Catering, Venue Hire, and Events requests.</p>
                </div>
            </div>

            <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                <div className="stats-grid" style={{ marginBottom: '0.5rem' }}>
                    <div className="stat-card" style={{ padding: '1.5rem' }}>
                        <div className="stat-header">
                            <h3>Pending Requests</h3>
                        </div>
                        <div className="stat-value" style={{ fontSize: '2rem', color: 'var(--warning)' }}>{enquiries.filter(e => e.status === 'Pending').length}</div>
                    </div>
                    <div className="stat-card" style={{ padding: '1.5rem' }}>
                        <div className="stat-header">
                            <h3>Approved (This Month)</h3>
                        </div>
                        <div className="stat-value" style={{ fontSize: '2rem', color: 'var(--success)' }}>{enquiries.filter(e => e.status === 'Approved').length}</div>
                    </div>
                    <div className="stat-card" style={{ padding: '1.5rem' }}>
                        <div className="stat-header">
                            <h3>Total Enquiries</h3>
                        </div>
                        <div className="stat-value" style={{ fontSize: '2rem', color: 'var(--primary)' }}>{enquiries.length + 152}</div>
                    </div>
                </div>

                <div className="panel">
                    <div className="panel-header" style={{ background: 'var(--bg-main)' }}>
                        <div className="search-bar" style={{ width: '100%', maxWidth: '350px', backgroundColor: 'var(--bg-card)' }}>
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Search name or ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="filter-group">
                            <button className={`btn btn-outline btn-sm ${typeFilter === 'All' ? 'active' : ''}`} onClick={() => setTypeFilter('All')}>All</button>
                            <button className={`btn btn-outline btn-sm ${typeFilter === 'Catering' ? 'active' : ''}`} onClick={() => setTypeFilter('Catering')}>Catering</button>
                            <button className={`btn btn-outline btn-sm ${typeFilter === 'Venue Hire' ? 'active' : ''}`} onClick={() => setTypeFilter('Venue Hire')}>Venue Hire</button>
                            <button className={`btn btn-outline btn-sm ${typeFilter === 'Events' ? 'active' : ''}`} onClick={() => setTypeFilter('Events')}>Events</button>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID / Received</th>
                                    <th>Type</th>
                                    <th>Contact Name</th>
                                    <th>Event Date</th>
                                    <th>Guests</th>
                                    <th>Status</th>
                                    <th align="right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEnquiries.length === 0 && (
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>No enquiries found.</td>
                                    </tr>
                                )}
                                {filteredEnquiries.map(enq => (
                                    <tr key={enq.id}>
                                        <td>
                                            <div className="fw-600">{enq.id}</div>
                                            <div className="text-small text-muted">{enq.received}</div>
                                        </td>
                                        <td>
                                            <span className={`type-badge ${enq.type === 'Catering' ? 'bg-secondary' : enq.type === 'Events' ? 'bg-warning' : 'bg-primary'}`}>
                                                {enq.type}
                                            </span>
                                        </td>
                                        <td className="fw-600">{enq.name}</td>
                                        <td>{new Date(enq.date).toLocaleDateString()}</td>
                                        <td>{enq.guests}</td>
                                        <td>
                                            <span className={`status-badge ${enq.status === 'Pending' ? 'text-warning' :
                                                    enq.status === 'Approved' ? 'text-success' : 'text-danger'
                                                }`}>
                                                {enq.status}
                                            </span>
                                        </td>
                                        <td align="right">
                                            <button className="btn btn-outline btn-sm" onClick={() => { setSelectedEnquiry(enq); setIsModalOpen(true); }}>
                                                Review & Respond
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Review Enquiry: ${selectedEnquiry?.id}`}
                footer={
                    <>
                        <button className="btn btn-outline" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={() => handleStatusChange('Declined')}>Decline Request</button>
                        <button className="btn btn-primary" onClick={() => handleStatusChange('Approved')}>Approve & Send Email</button>
                    </>
                }
            >
                {selectedEnquiry && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div className="avatar" style={{ width: '48px', height: '48px', fontSize: '1.25rem' }}>{selectedEnquiry.name.charAt(0)}</div>
                            <div>
                                <h3 style={{ margin: 0 }}>{selectedEnquiry.name}</h3>
                                <p className="text-muted text-small">{selectedEnquiry.received}</p>
                            </div>
                        </div>

                        <div style={{ background: 'var(--bg-main)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <p className="text-muted text-small">Event Type</p>
                                <p className="fw-500">{selectedEnquiry.type}</p>
                            </div>
                            <div>
                                <p className="text-muted text-small">Event Date</p>
                                <p className="fw-500">{new Date(selectedEnquiry.date).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-muted text-small">Number of Guests</p>
                                <p className="fw-500">{selectedEnquiry.guests}</p>
                            </div>
                            <div>
                                <p className="text-muted text-small">Current Status</p>
                                <p className={`fw-600 ${selectedEnquiry.status === 'Pending' ? 'text-warning' : selectedEnquiry.status === 'Approved' ? 'text-success' : 'text-danger'}`}>
                                    {selectedEnquiry.status}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-muted text-small" style={{ marginBottom: '0.25rem' }}>Message / Details</p>
                            <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                                <p>{selectedEnquiry.details}</p>
                            </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Write Response Email</label>
                            <textarea className="form-textarea" rows="4" placeholder="Draft your response to the customer here..."></textarea>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
