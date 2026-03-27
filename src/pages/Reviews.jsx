import { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import './Pages.css';

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [selectedReview, setSelectedReview] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [saving, setSaving] = useState(false);
    const [filter, setFilter] = useState('All'); // All, Replied, Needs Reply

    const fetchReviews = async () => {
        try {
            const res = await fetch('/api/reviews');
            if (res.ok) {
                const data = await res.json();
                setReviews(data);
            }
        } catch(e) { console.error('Failed to fetch reviews', e); }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleRowClick = (rev) => {
        setSelectedReview(rev);
        setReplyText(rev.admin_reply || '');
        setIsModalOpen(true);
    };

    const handleReplySubmit = async () => {
        setSaving(true);
        try {
            const res = await fetch(`/api/reviews/${selectedReview.id}/reply`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reply: replyText })
            });
            if (res.ok) {
                setIsModalOpen(false);
                fetchReviews(); // Refresh list to get updated data
            }
        } catch (e) { console.error('Failed to submit reply', e); }
        setSaving(false);
    };

    const filteredReviews = reviews.filter(rev => {
        if (filter === 'All') return true;
        if (filter === 'Replied') return !!rev.admin_reply;
        if (filter === 'Needs Reply') return !rev.admin_reply;
        return true;
    });

    return (
        <div className="page-container">
            <div className="page-header" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                <div>
                    <h1>Product Reviews</h1>
                    <p className="subtitle">Manage customer feedback and publish official replies.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className={`btn btn-outline btn-sm ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All</button>
                    <button className={`btn btn-outline btn-sm ${filter === 'Needs Reply' ? 'active' : ''}`} onClick={() => setFilter('Needs Reply')}>Needs Reply</button>
                    <button className={`btn btn-outline btn-sm ${filter === 'Replied' ? 'active' : ''}`} onClick={() => setFilter('Replied')}>Replied</button>
                </div>
            </div>

            <div className="panel">
                <div className="table-responsive">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Product</th>
                                <th>Customer</th>
                                <th>Rating</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReviews.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No reviews found.</td>
                                </tr>
                            ) : (
                                filteredReviews.map(rev => (
                                    <tr key={rev.id} onClick={() => handleRowClick(rev)} style={{ cursor: 'pointer' }}>
                                        <td><div className="text-small text-muted">{new Date(rev.created_at).toLocaleDateString()}</div></td>
                                        <td><strong>{rev.product_name || 'Unknown Product'}</strong></td>
                                        <td>{rev.user_name}</td>
                                        <td style={{ color: '#f59e0b', fontSize: '1.1rem' }}>{'★'.repeat(rev.rating)}{'☆'.repeat(5-rev.rating)}</td>
                                        <td>
                                            <span className={`type-badge ${rev.admin_reply ? 'bg-success' : 'bg-warning'}`}>
                                                {rev.admin_reply ? 'Replied' : 'Needs Reply'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Review Details"
                footer={
                    <button 
                        className="primary-btn" 
                        onClick={handleReplySubmit} 
                        style={{ width: '100%' }}
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save Reply'}
                    </button>
                }
            >
                {selectedReview && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <strong>{selectedReview.user_name}</strong>
                                <span style={{ color: '#f59e0b', fontSize: '1.1rem' }}>{'★'.repeat(selectedReview.rating)}{'☆'.repeat(5-selectedReview.rating)}</span>
                            </div>
                            <p style={{ margin: 0, color: '#475569', lineHeight: '1.5' }}>
                                "{selectedReview.comment}"
                            </p>
                            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '1rem', marginBottom: 0 }}>
                                Product: {selectedReview.product_name} • Received: {new Date(selectedReview.created_at).toLocaleString()}
                            </p>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#0f172a' }}>Official Marmelo Reply</label>
                            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>This reply will be publicly visible under the user's review on the Shop page.</p>
                            <textarea 
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                rows="4" 
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', resize: 'vertical' }}
                                placeholder="Write your response here..."
                            ></textarea>
                            {selectedReview.admin_reply && (
                                <p style={{ fontSize: '0.85rem', color: 'var(--success)', marginTop: '0.5rem', fontWeight: 'bold' }}>✓ Currently published</p>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
