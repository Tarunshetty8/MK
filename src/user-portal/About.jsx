import React from 'react';
import './UserPortal.css';

export default function About() {
    return (
        <div className="page-container" style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <p className="hero-pre-heading" style={{ color: 'var(--primary)', letterSpacing: '2px', fontWeight: '700' }}>ABOUT</p>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.5rem', textTransform: 'uppercase' }}>The Story So Far</h1>
                <p style={{ fontSize: '1.15rem', color: '#64748b', lineHeight: '1.8', marginBottom: '1.5rem', textAlign: 'left' }}>
                    Marmelo is a sustainable catering company in East London, creating delicious, seasonal dishes that are ethical, affordable, and full of flavor. We source fresh, organic ingredients from UK farmers and producers—meat from small Yorkshire farms, sustainably caught fish from the Cornish coast, and vegetables from independent growers across the country.
                </p>
                <p style={{ fontSize: '1.15rem', color: '#64748b', lineHeight: '1.8', marginBottom: '1.5rem', textAlign: 'left' }}>
                    We offer a fully catered service for photography shoots, film and television productions, offices and events, delivering tasty, nourishing food to busy production teams as well as bespoke catering for special occasions including weddings and fashion events. Our clients include Burberry, Gucci, COS, Vogue, Sézane, Dior, and Chanel, to name a few.
                </p>
                <p style={{ fontSize: '1.15rem', color: '#64748b', lineHeight: '1.8', textAlign: 'left' }}>
                    If you find yourself in our neighbourhood, pop by our general store on Francis Road in Leyton, where we stock the things we love, or stop by Loop our venue space for our monthly supper club.
                </p>
            </div>

            <div style={{ padding: '4rem', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '1px' }}>Store - Specialty Provisions</h2>
                <p style={{ color: '#475569', lineHeight: '1.8', marginBottom: '3rem', fontSize: '1.1rem' }}>
                    We stock a range of things we love from our producers, including meat, cheeses, vegetables and other kitchen essentials for you to take home. You’ll also find a selection of our own house-made products available in store. Our wines are carefully chosen from producers who farm and work with their grapes as naturally as possible, resulting in some of the tastiest and most distinctive wines we’ve come across.
                </p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) minmax(200px, 1fr)', gap: '2rem', textAlign: 'left' }}>
                    <div>
                        <h4 style={{ fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem' }}>VISIT US</h4>
                        <p style={{ color: '#475569', lineHeight: '1.6' }}>
                            Marmelo, 169 Francis Road,<br/>
                            E10 6QB<br/><br/>
                            <strong>PHONE:</strong> 020 3620 7580<br/>
                            (for general store enquiries only)
                        </p>
                    </div>
                    <div>
                        <h4 style={{ fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem' }}>HOURS</h4>
                        <div style={{ color: '#475569', lineHeight: '1.6', display: 'grid', gridTemplateColumns: '100px 1fr', rowGap: '0.25rem' }}>
                            <span>Monday</span><span>8am - 6pm</span>
                            <span>Tuesday</span><span>8am - 6pm</span>
                            <span>Wednesday</span><span>8am - 6pm</span>
                            <span>Thursday</span><span>8am - 9pm</span>
                            <span>Friday</span><span>8am - 6pm</span>
                            <span>Saturday</span><span>9am - 6pm</span>
                            <span>Sunday</span><span>9am - 6pm</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
