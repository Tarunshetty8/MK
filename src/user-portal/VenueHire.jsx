import React, { useState } from 'react';
import { Users, Clock, Wifi, Coffee, Music, Camera } from 'lucide-react';
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
        } catch (err) {
            setStatus('Error sending request.');
        }
    };

    const inputStyle = { width: '100%', padding: '0.6rem', borderRadius: '0', border: '1px solid #a3a3a3', outline: 'none', fontFamily: 'inherit', fontSize: '1rem' };
    const labelStyle = { display: 'block', fontSize: '0.95rem', color: '#374151', marginBottom: '0.4rem', fontWeight: '400' };


    const featureCardStyle = {
        backgroundColor: '#f3f4f6',
        padding: '2rem',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        border: '1px solid #e5e7eb',
        transition: 'transform 0.2s',
        cursor: 'default'
    };

    const iconBoxStyle = {
        backgroundColor: '#d1fae5',
        color: 'var(--primary)',
        padding: '1rem',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    return (
        <div style={{ width: '100%', backgroundColor: '#ffffff' }}>
            {/* Hero Section */}
            <div style={{
                backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url("https://images.unsplash.com/photo-1761110787206-2cc164e4913c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwdmVudWUlMjBldmVudCUyMHNwYWNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcxNjA4ODMxfDA&ixlib=rb-4.1.0&q=80&w=1080")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '8rem 2rem',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '450px'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                    <p style={{ color: 'white', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', fontSize: '0.85rem' }}>OUR SERVICES</p>
                    <h1 style={{ color: 'white', fontSize: '4rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', letterSpacing: '-0.02em' }}>
                        Venue Hire
                    </h1>
                    <p style={{ color: 'white', fontSize: '1.2rem', maxWidth: '650px', lineHeight: '1.6', opacity: 0.9 }}>
                        Our characterful East London space — flooded with natural light, steeped in warmth. Up to 50 seated, 80 standing.
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
                {/* 6 Grid Feature Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>

                    <div style={featureCardStyle}>
                        <div style={iconBoxStyle}><Users size={24} /></div>
                        <div>
                            <h4 style={{ fontWeight: '700', fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.2rem' }}>Up to 50 guests (seated)</h4>
                            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>80 standing</p>
                        </div>
                    </div>

                    <div style={featureCardStyle}>
                        <div style={iconBoxStyle}><Clock size={24} /></div>
                        <div>
                            <h4 style={{ fontWeight: '700', fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.2rem' }}>Flexible hire times</h4>
                            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Day, evening & weekend</p>
                        </div>
                    </div>

                    <div style={featureCardStyle}>
                        <div style={iconBoxStyle}><Wifi size={24} /></div>
                        <div>
                            <h4 style={{ fontWeight: '700', fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.2rem' }}>High-speed WiFi</h4>
                            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Business grade</p>
                        </div>
                    </div>

                    <div style={featureCardStyle}>
                        <div style={iconBoxStyle}><Coffee size={24} /></div>
                        <div>
                            <h4 style={{ fontWeight: '700', fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.2rem' }}>Marmelo catering</h4>
                            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Optional add-on</p>
                        </div>
                    </div>

                    <div style={featureCardStyle}>
                        <div style={iconBoxStyle}><Music size={24} /></div>
                        <div>
                            <h4 style={{ fontWeight: '700', fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.2rem' }}>Audio system</h4>
                            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Bluetooth & aux</p>
                        </div>
                    </div>

                    <div style={featureCardStyle}>
                        <div style={iconBoxStyle}><Camera size={24} /></div>
                        <div>
                            <h4 style={{ fontWeight: '700', fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.2rem' }}>Natural light & photography</h4>
                            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Beautiful backdrop</p>
                        </div>
                    </div>

                </div>

                {/* Booking Form Layout */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ backgroundColor: 'white', padding: '3.5rem', borderRadius: '4px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', width: '100%', maxWidth: '900px' }}>
                        <h3 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '2.5rem', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>Enquire about Venue Hire</h3>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                                <div>
                                    <label style={labelStyle}>Name</label>
                                    <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required style={inputStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Email</label>
                                    <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required style={inputStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Phone</label>
                                    <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required style={inputStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Location Area / Preference</label>
                                    <input type="text" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} style={inputStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Event Date</label>
                                    <input type="date" value={formData.eventDate} onChange={e => setFormData({ ...formData, eventDate: e.target.value })} style={inputStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Time</label>
                                    <input type="time" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} style={inputStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Guests</label>
                                    <input type="number" min="1" value={formData.guests} onChange={e => setFormData({ ...formData, guests: e.target.value })} style={inputStyle} />
                                </div>
                            </div>

                            <div style={{ marginTop: '0' }}>
                                <label style={labelStyle}>Message / Requirements</label>
                                <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} required rows="4" style={{ ...inputStyle, resize: 'vertical' }}></textarea>
                            </div>

                            {status && <p style={{ color: status.includes('success') ? 'green' : 'red', margin: 0, textAlign: 'center', fontWeight: '500' }}>{status}</p>}

                            <button type="submit" className="primary-btn" disabled={status === 'Sending...'} style={{ justifyContent: 'center', marginTop: '1rem', width: '100%', fontSize: '1.05rem', padding: '1rem', borderRadius: '0' }}>
                                {status === 'Sending...' ? 'Sending...' : 'Submit Enquiry'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
