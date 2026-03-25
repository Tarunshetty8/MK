import React from 'react';
import './UserPortal.css';

export default function Services() {
    return (
        <div style={{ padding: '6rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <p className="hero-pre-heading" style={{ color: 'var(--primary)' }}>OUR OFFERINGS</p>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.5rem' }}>Services</h1>
                <p style={{ fontSize: '1.15rem', color: '#64748b', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto' }}>
                    Beyond our daily cafe and grocery, Marmelo offers curated experiences tailored to your taste.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <div style={{ width: '48px', height: '48px', backgroundColor: '#dcfce7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '24px' }}>🏛️</span>
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#0f172a' }}>Venue Hire</h3>
                    <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                        Looking for the perfect space for your next gathering? Marmelo offers exclusive venue hire for private parties, corporate events, and special occasions.
                    </p>
                    <a href="/contact" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Enquire about Venue Hire →</a>
                </div>

                <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <div style={{ width: '48px', height: '48px', backgroundColor: '#dcfce7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '24px' }}>🍽️</span>
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#0f172a' }}>Catering</h3>
                    <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                        From intimate dinners to large celebrations, our catering team brings the Marmelo experience directly to your table with bespoke seasonal menus.
                    </p>
                    <a href="/contact" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>View Catering Options →</a>
                </div>

                <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <div style={{ width: '48px', height: '48px', backgroundColor: '#dcfce7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '24px' }}>🎉</span>
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#0f172a' }}>Events</h3>
                    <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                        Join us for our curated events, including wine tastings, supper clubs, and seasonal celebrations right here at Marmelo Kitchen.
                    </p>
                    <a href="/contact" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>See Upcoming Events →</a>
                </div>
            </div>
        </div>
    );
}
