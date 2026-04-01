import React, { useState } from 'react';
import './UserPortal.css';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', type: 'General Enquiry', message: '' });
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');
        try {
            const res = await fetch('/api/enquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    type: formData.type,
                    details: `Email: ${formData.email}\nMessage: ${formData.message}`,
                    event_date: null,
                    guests: null
                })
            });
            if (res.ok) {
                setStatus('Message sent successfully!');
                setFormData({ name: '', email: '', type: 'General Enquiry', message: '' });
                setTimeout(() => setStatus(''), 3000);
            } else {
                setStatus('Failed to send message.');
            }
        } catch(err) {
            setStatus('Error sending message.');
        }
    };
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
                        <p style={{ color: '#475569', lineHeight: '1.6' }}>169 Francis Rd<br />London E10 6NT</p>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <p style={{ fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Contact Info</p>
                        <p style={{ color: '#475569', lineHeight: '1.6' }}>020 3620 7580<br />Natalie@marmelokitchen.com</p>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <p style={{ fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Business Hours</p>
                        <p style={{ color: '#475569', lineHeight: '1.6' }}>Mon–Thu: 8am – 6pm<br />Friday: 8am – 8pm<br />Saturday: 8am – 6pm<br />Sunday: 9am – 6pm</p>
                    </div>
                </div>

                <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#0f172a' }}>Send a Message</h3>

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
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Subject Inquiry</label>
                            <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', backgroundColor: 'white' }}>
                                <option>General Enquiry</option>
                                <option>Catering</option>
                                <option>Venue Hire</option>
                                <option>Wholesale</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Message</label>
                            <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} required rows="4" placeholder="How can we help?" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', resize: 'vertical' }}></textarea>
                        </div>

                        {status && <p style={{ color: status.includes('success') ? 'green' : 'red', margin: 0 }}>{status}</p>}

                        <button type="submit" disabled={status === 'Sending...'} style={{ backgroundColor: '#000000', color: '#ffffff', padding: '0.85rem', width: '100%', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginTop: '1rem', opacity: status === 'Sending...' ? 0.7 : 1 }}>
                            {status === 'Sending...' ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
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
