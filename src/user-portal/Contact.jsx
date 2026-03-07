import React from 'react';
import './UserPortal.css';

export default function Contact() {
    return (
        <div style={{ padding: '6rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <p className="hero-pre-heading" style={{ color: 'var(--primary)' }}>GET IN TOUCH</p>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.5rem' }}>Contact Us</h1>
                <p style={{ fontSize: '1.15rem', color: '#64748b', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto' }}>
                    Whether you're looking to book a table, enquire about catering, or just want to say hello, we'd love to hear from you.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr', gap: '3rem' }}>
                <div style={{ backgroundColor: '#f8fafc', padding: '3rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#0f172a' }}>Visit Us</h3>

                    <div style={{ marginBottom: '2rem' }}>
                        <p style={{ fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Address</p>
                        <p style={{ color: '#475569', lineHeight: '1.6' }}>47 Columbia Road<br />Bethnal Green<br />London E2 7RG</p>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <p style={{ fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Contact Info</p>
                        <p style={{ color: '#475569', lineHeight: '1.6' }}>+44 20 7946 0958<br />hello@marmelokitchen.com</p>
                    </div>

                    <div>
                        <p style={{ fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Business Hours</p>
                        <p style={{ color: '#475569', lineHeight: '1.6' }}>Mon: Closed<br />Tue–Fri: 9am – 6pm<br />Saturday: 8am – 7pm<br />Sunday: 9am – 4pm</p>
                    </div>
                </div>

                <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#0f172a' }}>Send a Message</h3>

                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Name</label>
                            <input type="text" placeholder="Your name" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Email</label>
                            <input type="email" placeholder="you@example.com" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Subject Inquiry</label>
                            <select style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', backgroundColor: 'white' }}>
                                <option>General Enquiry</option>
                                <option>Catering</option>
                                <option>Venue Hire</option>
                                <option>Wholesale</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Message</label>
                            <textarea rows="4" placeholder="How can we help?" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', resize: 'vertical' }}></textarea>
                        </div>

                        <button type="button" className="primary-pill-btn" style={{ justifyContent: 'center', marginTop: '1rem', border: 'none', cursor: 'pointer' }}>
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
