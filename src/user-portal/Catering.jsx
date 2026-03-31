import React, { useState } from 'react';
import './UserPortal.css';

export default function Catering() {
    const [formData, setFormData] = useState({ groupName: '', startDate: '', endDate: '', deliveryTimes: '', guests: '', email: '', phone: '', message: '' });
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');
        try {
            const token = localStorage.getItem('marmelo_token');
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const res = await fetch('/api/enquiries', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    name: formData.groupName,
                    type: 'Catering',
                    details: `Group Name: ${formData.groupName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nStart Date: ${formData.startDate}\nEnd Date: ${formData.endDate}\nDelivery Times: ${formData.deliveryTimes}\nMessage: ${formData.message}`,
                    event_date: formData.startDate,
                    guests: formData.guests
                })
            });
            if (res.ok) {
                setStatus('Message sent successfully!');
                setFormData({ groupName: '', startDate: '', endDate: '', deliveryTimes: '', guests: '', email: '', phone: '', message: '' });
                setTimeout(() => setStatus(''), 3000);
            } else {
                setStatus('Failed to send request.');
            }
        } catch(err) {
            setStatus('Error sending request.');
        }
    };
    return (
        <div style={{ padding: '6rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <p className="hero-pre-heading" style={{ color: 'var(--primary)' }}>MARMELO KITCHEN</p>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.5rem' }}>Catering</h1>
                <p style={{ fontSize: '1.15rem', color: '#64748b', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto' }}>
                    Sustainable catering for film productions, shoots and offices across London and the UK. Seasonal menus, flexible service and experienced teams. We are experienced in fast-paced production environments, offering reliable delivery.
                </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', width: '100%', maxWidth: '600px' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#0f172a', textAlign: 'center' }}>Book Catering</h3>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <div style={{ flex: '1 1 calc(50% - 0.5rem)' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Group name</label>
                                <input type="text" value={formData.groupName} onChange={e => setFormData({...formData, groupName: e.target.value})} required placeholder="Your group name" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
                            </div>
                            <div style={{ flex: '1 1 calc(50% - 0.5rem)' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Email</label>
                                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required placeholder="you@example.com" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                             <div style={{ flex: '1 1 calc(50% - 0.5rem)' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Start date</label>
                                <input type="date" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontFamily: 'inherit' }} />
                            </div>
                            <div style={{ flex: '1 1 calc(50% - 0.5rem)' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>End date</label>
                                <input type="date" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontFamily: 'inherit' }} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                             <div style={{ flex: '1 1 calc(50% - 0.5rem)' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Phone</label>
                                <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="Your phone number" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
                            </div>
                            <div style={{ flex: '1 1 calc(50% - 0.5rem)' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Number of guests</label>
                                <input type="number" value={formData.guests} onChange={e => setFormData({...formData, guests: e.target.value})} required min="1" placeholder="Number of guests" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Delivery times (please specify times for breakfast and lunch, as we make our deliveries separately)</label>
                            <input type="text" value={formData.deliveryTimes} onChange={e => setFormData({...formData, deliveryTimes: e.target.value})} required placeholder="E.g. Breakfast at 8am, Lunch at 1pm" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Message / Requirements</label>
                            <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} required rows="4" placeholder="Tell us about your event, dietary requirements, etc." style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', resize: 'vertical' }}></textarea>
                        </div>

                        {status && <p style={{ color: status.includes('success') ? 'green' : 'red', margin: 0, textAlign: 'center' }}>{status}</p>}

                        <button type="submit" className="primary-pill-btn" disabled={status === 'Sending...'} style={{ justifyContent: 'center', marginTop: '1rem', border: 'none', cursor: 'pointer', opacity: status === 'Sending...' ? 0.7 : 1 }}>
                            {status === 'Sending...' ? 'Sending...' : 'Submit Enquiry'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
