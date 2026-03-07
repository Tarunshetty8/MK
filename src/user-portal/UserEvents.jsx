import React, { useEffect, useState } from 'react';
import './UserPortal.css';

export default function UserEvents() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/events')
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(err => console.error("Could not fetch events:", err));
    }, []);

    // Helper to format date into Month and Day for the badge
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
                                {/* Use generic placeholder class from CSS */}
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
                                        <a href="/contact" className="event-book">Enquire <span style={{ marginLeft: '4px' }}>→</span></a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
}
