import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import './UserPortal.css';

export default function Profile() {
    
    const { orders } = useContext(DataContext);
    const userOrders = orders.slice(0, 3); 

    return (
        <div className="profile-page" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2.5rem' }}>My Account</h2>
                <button className="secondary-btn">Log Out</button>
            </div>

            <div className="profile-info" style={{ backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)', marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Welcome, Guest User</h3>
                <p style={{ color: 'var(--text-muted)' }}>Manage your details and view recent orders here.</p>
            </div>

            <div className="order-history">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Recent Orders</h3>
                {userOrders.map(o => (
                    <div key={o.id} className="order-history-card" style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)', borderLeft: '4px solid var(--primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{ fontWeight: '600', color: 'var(--text-main)', marginBottom: '0.25rem' }}>Order #{o.id}</p>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Status: {o.status} • Collection: {o.collection}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontWeight: '700', fontSize: '1.25rem', color: 'var(--text-main)' }}>£{o.amount.toFixed(2)}</p>
                            <button className="primary-btn" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', marginTop: '0.5rem' }}>Reorder</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
