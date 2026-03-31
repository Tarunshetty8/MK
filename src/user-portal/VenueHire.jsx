import React, { useState } from 'react';
import './UserPortal.css';

export default function VenueHire() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', eventDate: '', time: '', guests: '', location: '', message: '' });
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
                    name: formData.name,
                    type: 'Venue Hire',
                    details: `Email: ${formData.email}\nPhone: ${formData.phone}\nTime: ${formData.time}\nLocation Config: ${formData.location}\nMessage: ${formData.message}`,
                    event_date: formData.eventDate || null,
                    guests: formData.guests || null
                })
            });
            if (res.ok) {
                setStatus('Message sent successfully!');
                setFormData({ name: '', email: '', phone: '', eventDate: '', time: '', guests: '', location: '', message: '' });
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
                <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.5rem' }}>Venue Hire</h1>
                <p style={{ fontSize: '1.15rem', color: '#64748b', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto' }}>
                    Looking for the perfect space for your next gathering? Marmelo offers exclusive venue hire for private parties, corporate events, and special occasions.
                </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', width: '100%', maxWidth: '600px' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#0f172a', textAlign: 'center' }}>Enquire about Venue Hire</h3>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Name</label>
                                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required placeholder="Your name" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Email</label>
                                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required placeholder="you@example.com" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Phone</label>
                                <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required placeholder="Your phone number" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Location Area / Preference</label>
                                <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="e.g. Main Cafe, Cellar" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Event Date</label>
                                <input type="date" value={formData.eventDate} onChange={e => setFormData({...formData, eventDate: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontFamily: 'inherit' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Time</label>
                                <input type="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontFamily: 'inherit' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Guests</label>
                                <input type="number" min="1" value={formData.guests} onChange={e => setFormData({...formData, guests: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Message / Requirements</label>
                            <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} required rows="4" placeholder="Tell us about the occasion..." style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', resize: 'vertical' }}></textarea>
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
