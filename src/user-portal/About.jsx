import React from 'react';
import './UserPortal.css';

export default function About() {
    return (
        <div style={{ width: '100%', backgroundColor: '#f9fafb' }}>
            {/* Hero Section */}
            <div style={{
                backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4)), url("https://images.unsplash.com/photo-1692553446350-2df27b31766d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwZm9vZCUyMGtpdGNoZW4lMjBmcmVzaCUyMHByb2R1Y2V8ZW58MXx8fHwxNzcxNjA4ODIzfDA&ixlib=rb-4.1.0&q=80&w=1080")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '8rem 2rem',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '400px'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                    <p style={{ color: 'white', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', fontSize: '0.85rem' }}>WHO WE ARE</p>
                    <h1 style={{ color: 'white', fontSize: '4rem', fontWeight: '800', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                        Our Story
                    </h1>
                    <p style={{ color: 'white', fontSize: '1.2rem', maxWidth: '600px', lineHeight: '1.6', opacity: 0.9 }}>
                        From a market stall to a beloved Bethnal Green institution.
                    </p>
                </div>
            </div>

            {/* Content Container */}
            <div style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
                <p style={{ fontSize: '1.15rem', color: '#475569', lineHeight: '1.8', marginBottom: '1.5rem', textAlign: 'left' }}>
                    Marmelo is a sustainable catering company in East London, creating delicious, seasonal dishes that are ethical, affordable, and full of flavor. We source fresh, organic ingredients from UK farmers and producers—meat from small Yorkshire farms, sustainably caught fish from the Cornish coast, and vegetables from independent growers across the country.
                </p>
                <p style={{ fontSize: '1.15rem', color: '#475569', lineHeight: '1.8', marginBottom: '1.5rem', textAlign: 'left' }}>
                    We offer a fully catered service for photography shoots, film and television productions, offices and events, delivering tasty, nourishing food to busy production teams as well as bespoke catering for special occasions including weddings and fashion events. Our clients include Burberry, Gucci, COS, Vogue, Sézane, Dior, and Chanel, to name a few.
                </p>
                <p style={{ fontSize: '1.15rem', color: '#475569', lineHeight: '1.8', textAlign: 'left', marginBottom: '4rem' }}>
                    If you find yourself in our neighbourhood, pop by our general store on Francis Road in Leyton, where we stock the things we love, or stop by Loop our venue space for our monthly supper club.
                </p>

                {/* Store Section */}
                <div style={{ padding: '4rem', backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '1px' }}>Store - Specialty Provisions</h2>
                    <p style={{ color: '#64748b', lineHeight: '1.8', marginBottom: '3rem', fontSize: '1.1rem' }}>
                        We stock a range of things we love from our producers, including meat, cheeses, vegetables and other kitchen essentials for you to take home. You’ll also find a selection of our own house-made products available in store. Our wines are carefully chosen from producers who farm and work with their grapes as naturally as possible, resulting in some of the tastiest and most distinctive wines we’ve come across.
                    </p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', textAlign: 'left' }}>
                        <div>
                            <h4 style={{ fontWeight: '700', color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid var(--primary)', display: 'inline-block', paddingBottom: '0.25rem' }}>VISIT US</h4>
                            <p style={{ color: '#475569', lineHeight: '1.6' }}>
                                Marmelo, 169 Francis Road,<br/>
                                E10 6QB<br/><br/>
                                <strong>PHONE:</strong> 020 3620 7580<br/>
                                (for general store enquiries only)
                            </p>
                        </div>
                        <div>
                            <h4 style={{ fontWeight: '700', color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid var(--primary)', display: 'inline-block', paddingBottom: '0.25rem' }}>HOURS</h4>
                            <div style={{ color: '#475569', lineHeight: '1.6', display: 'grid', gridTemplateColumns: '100px 1fr', rowGap: '0.35rem' }}>
                                <span style={{fontWeight: '600'}}>Monday</span><span>8am - 6pm</span>
                                <span style={{fontWeight: '600'}}>Tuesday</span><span>8am - 6pm</span>
                                <span style={{fontWeight: '600'}}>Wednesday</span><span>8am - 6pm</span>
                                <span style={{fontWeight: '600'}}>Thursday</span><span>8am - 9pm</span>
                                <span style={{fontWeight: '600'}}>Friday</span><span>8am - 6pm</span>
                                <span style={{fontWeight: '600'}}>Saturday</span><span>9am - 6pm</span>
                                <span style={{fontWeight: '600'}}>Sunday</span><span>9am - 6pm</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
