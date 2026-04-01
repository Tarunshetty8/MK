import React from 'react';
import './UserPortal.css';

export default function Contact() {
    return (
        <div style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <p className="hero-pre-heading" style={{ color: 'var(--primary)' }}>GET IN TOUCH</p>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.5rem' }}>Contact Us</h1>
                <p style={{ fontSize: '1.15rem', color: '#64748b', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto' }}>
                    Whether you're looking to book a table, enquire about catering, or just want to say hello, we'd love to hear from you.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
                <div style={{ backgroundColor: '#f8fafc', padding: '3rem', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <p style={{ fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem', fontSize: '1.25rem' }}>Address</p>
                    <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '1.1rem' }}>169 Francis Rd<br />London E10 6NT</p>
                </div>

                <div style={{ backgroundColor: '#f8fafc', padding: '3rem', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <p style={{ fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem', fontSize: '1.25rem' }}>Contact Info</p>
                    <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '1.1rem' }}>020 3620 7580<br />
                    <a href="mailto:Natalie@marmelokitchen.com" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Natalie@marmelokitchen.com</a></p>
                </div>

                <div style={{ backgroundColor: '#f8fafc', padding: '3rem', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <p style={{ fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem', fontSize: '1.25rem' }}>Business Hours</p>
                    <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '1.1rem' }}>Mon–Thu: 8am – 6pm<br />Friday: 8am – 8pm<br />Saturday: 8am – 6pm<br />Sunday: 9am – 6pm</p>
                </div>
            </div>

            <div style={{ marginTop: '4rem', overflow: 'hidden', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.5654523963283!2d-0.007559184228943793!3d51.55783357964409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761d76b1fcaedd%3A0xc4aa9aa9bb3b0b57!2s169%20Francis%20Rd%2C%20London%20E10%206NT!5e0!3m2!1sen!2suk!4v1711204000000!5m2!1sen!2suk" 
                    width="100%" 
                    height="450" 
                    style={{ border: 0, display: 'block' }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
    );
}
