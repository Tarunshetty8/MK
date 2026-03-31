import React, { useEffect, useState } from 'react';
import './UserPortal.css';

export default function UserEvents() {
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
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
                    type: 'Events',
                    details: `Email: ${formData.email}\nMessage: ${formData.message}`,
                    event_date: null,
                    guests: null
                })
            });
            if (res.ok) {
                setStatus('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus(''), 3000);
            } else {
                setStatus('Failed to send request.');
            }
        } catch(err) {
            setStatus('Error sending request.');
        }
    };

    useEffect(() => {
        fetch('/api/events')
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(err => console.error("Could not fetch events:", err));
    }, []);

    
    const formatEventDate = (dateString) => {
        if (!dateString) return { month: 'TBD', day: '--' };
        const d = new Date(dateString);
        if (isNaN(d)) return { month: 'TBD', day: '--' };

        return {
            month: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
            day: d.getDate()
        };
    };

    return (
        <div style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <p className="hero-pre-heading" style={{ color: 'var(--primary)' }}>WHAT'S ON</p>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.5rem' }}>Upcoming Events</h1>
                <p style={{ fontSize: '1.15rem', color: '#64748b', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto' }}>
                    Join us for curated evenings of food, wine, and community. Booking is essential as spaces are limited.
                </p>
            </div>

            <div className="events-gallery" style={{ marginBottom: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <img src="https://images.squarespace-cdn.com/content/v1/655a0aefcc06663665faecbe/031739f1-e709-4c7c-8a83-96ad1335265c/SUPER-CLUB.jpg?format=1500w" alt="Event Gallery 1" style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <img src="https://images.squarespace-cdn.com/content/v1/655a0aefcc06663665faecbe/a79f2660-cd8a-4eae-ae3d-093081c594e8/LOOP-EVENTS.jpg?format=1500w" alt="Event Gallery 2" style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
            </div>

            {events.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
                    <p>Loading events...</p>
                </div>
            ) : (
                <div className="events-grid">
                    {events.map(event => {
                        const dateBadge = formatEventDate(event.date);
                        return (
                            <div key={event.id} className="event-card">
                                {}
                                <div className={`event-image img-${['wine', 'sourdough', 'market'][event.title.length % 3]}`}>
                                    <div className="event-date-badge">
                                        <span className="event-month">{dateBadge.month}</span>
                                        <span className="event-day">{dateBadge.day}</span>
                                    </div>
                                </div>
                                <div className="event-card-body">
                                    <h3>{event.title}</h3>
                                    <p className="event-desc">{event.location}</p>
                                    <div className="event-footer">
                                        <span className="event-meta">19:00 · {event.maxAttendees} spots</span>
                                        <a href="#enquire" className="event-book">Enquire <span style={{ marginLeft: '4px' }}>→</span></a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            <div id="enquire" style={{ marginTop: '6rem', display: 'flex', justifyContent: 'center' }}>
                <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', width: '100%', maxWidth: '600px' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#0f172a', textAlign: 'center' }}>Private Event Enquiry</h3>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Name</label>
                            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required placeholder="Your name" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Email</label>
                            <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required placeholder="you@example.com" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
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
