import React from 'react';
import { Users, Clock, Wifi, Coffee, Music, Camera } from 'lucide-react';
import './UserPortal.css';

export default function VenueHire() {

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

                {/* Direct CTA Block */}
                <div style={{ textAlign: 'center', backgroundColor: '#f8fafc', padding: '5rem 2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <p style={{ color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', fontSize: '0.85rem' }}>VENUE HIRE</p>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.5rem', maxWidth: '800px', margin: '0 auto 1.5rem auto', textTransform: 'uppercase', lineHeight: '1.2' }}>HIRE SPACE FOR SUPPER CLUBS, WEDDINGS, PARTIES, SHOOT LOCATION.</h2>
                    <a href="mailto:natalie@marmelokitchen.com" className="primary-btn" style={{ fontSize: '1.15rem', padding: '1rem 3rem', display: 'inline-block', textDecoration: 'none', marginTop: '1.5rem' }}>
                        Email: natalie@marmelokitchen.com
                    </a>
                </div>
            </div>
        </div>
    );
}
