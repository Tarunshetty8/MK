import React from 'react';
import './UserPortal.css';

export default function About() {
    return (
        <div className="page-container" style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <p className="hero-pre-heading" style={{ color: 'var(--primary)' }}>ABOUT US</p>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.5rem' }}>Our Story</h1>
                <p style={{ fontSize: '1.15rem', color: '#64748b', lineHeight: '1.8' }}>
                    Marmelo takes its name from the Portuguese word for quince — the fruit behind the world's first jam. We honour that tradition of turning simple, seasonal ingredients into something extraordinary.
                </p>
            </div>

            <div style={{ display: 'grid', gap: '3rem' }}>
                <div style={{ padding: '3rem', backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#0f172a' }}>Community Driven</h2>
                    <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '1rem' }}>
                        Located in the heart of East London, we are committed to building authentic relationships with our local community and the incredible producers who supply us.
                    </p>
                    <p style={{ color: '#475569', lineHeight: '1.6' }}>
                        We source our ingredients with absolute care, ensuring everything from our flour to our olive oil reflects our dedication to sustainability and flavor.
                    </p>
                </div>

                <div style={{ padding: '3rem', backgroundColor: '#094a36', borderRadius: '16px', color: 'white', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>The Kitchen</h2>
                    <p style={{ color: '#a7f3d0', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
                        Every loaf of sourdough, every jar of marmalade, and every curated event is designed to celebrate the joy of sharing good food with great people.
                    </p>
                </div>
            </div>
        </div>
    );
}
