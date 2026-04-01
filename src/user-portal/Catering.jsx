import React, { useState } from 'react';
import { Users, ChefHat, Leaf, Star } from 'lucide-react';
import './UserPortal.css';

export default function Catering() {
    const initialFormData = {
        groupName: '',
        startDate: '',
        endDate: '',
        deliveryTimes: '',
        guests: '',
        email: '',
        phone: '',
        message: '',
        compostableCutlery: '',
        additionalServices: [],
        cutleryOptions: '',
        serviceRequired: [],
        dietaryPreferences: '',
        additionalOptions: []
    };

    const [formData, setFormData] = useState(initialFormData);
    const [status, setStatus] = useState('');

    const handleCheckboxChange = (field, value) => {
        setFormData(prev => {
            const currentList = prev[field];
            if (currentList.includes(value)) {
                return { ...prev, [field]: currentList.filter(item => item !== value) };
            } else {
                return { ...prev, [field]: [...currentList, value] };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');
        try {
            const token = localStorage.getItem('marmelo_token');
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const parsedDetails = `Group Name: ${formData.groupName}
Email: ${formData.email}
Phone: ${formData.phone}
Start Date: ${formData.startDate}
End Date: ${formData.endDate}
Delivery Times: ${formData.deliveryTimes}
Guests: ${formData.guests}
Message: ${formData.message}

-- Preferences & Options --
Compostable Cutlery: ${formData.compostableCutlery || 'N/A'}
Cutlery Options: ${formData.cutleryOptions || 'N/A'}
Dietary Preferences: ${formData.dietaryPreferences || 'N/A'}
Service Required: ${formData.serviceRequired.length > 0 ? formData.serviceRequired.join(', ') : 'None'}
Additional Services: ${formData.additionalServices.length > 0 ? formData.additionalServices.join(', ') : 'None'}
Additional Options: ${formData.additionalOptions.length > 0 ? formData.additionalOptions.join(', ') : 'None'}`;

            const res = await fetch('/api/enquiries', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    name: formData.groupName,
                    type: 'Catering',
                    details: parsedDetails,
                    event_date: formData.startDate,
                    guests: formData.guests
                })
            });

            if (res.ok) {
                setStatus('Message sent successfully!');
                setFormData(initialFormData);
                setTimeout(() => setStatus(''), 3000);
            } else {
                setStatus('Failed to send request.');
            }
        } catch (err) {
            setStatus('Error sending request.');
        }
    };

    const inputStyle = { width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1', outline: 'none', fontFamily: 'inherit', fontSize: '1rem' };
    const labelStyle = { display: 'block', fontSize: '1rem', color: '#334155', marginBottom: '0.75rem' };
    const checkLabelStyle = { display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', color: '#1e293b', marginBottom: '0.75rem', cursor: 'pointer', fontWeight: '400' };

    return (
        <div style={{ width: '100%', backgroundColor: '#f8fafc' }}>
            {/* Hero Section */}
            <div style={{
                backgroundImage: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.3)), url("https://images.unsplash.com/photo-1690299564243-9879e2f22654?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGVycmFuZWFuJTIwY2F0ZXJpbmclMjBldmVudCUyMGJ1ZmZldHxlbnwxfHx8fDE3NzE2MDg4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '8rem 2rem',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                minHeight: '400px'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                    <p style={{ color: 'white', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', fontSize: '0.85rem' }}>OUR SERVICES</p>
                    <h1 style={{ color: 'white', fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', letterSpacing: '-0.02em' }}>
                        Catering
                    </h1>
                    <p style={{ color: 'white', fontSize: '1.15rem', maxWidth: '600px', lineHeight: '1.6', opacity: 0.9 }}>
                        Portuguese-inspired feasts for events across London. From intimate birthday parties to 200-person corporate events.
                    </p>
                </div>
            </div>

            {/* Stats Banner */}
            <div style={{ backgroundColor: 'var(--primary)', padding: '1.5rem 2rem', color: 'white' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
                    <div style={{ textAlign: 'center', flex: 1, minWidth: '200px' }}>
                        <Users size={28} style={{ marginBottom: '1rem', margin: '0 auto', opacity: 0.9 }} />
                        <h4 style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.25rem', color: 'white' }}>10–200 guests</h4>
                        <p style={{ fontSize: '0.85rem', opacity: 0.8, color: 'white' }}>Any size event</p>
                    </div>
                    <div style={{ textAlign: 'center', flex: 1, minWidth: '200px' }}>
                        <ChefHat size={28} style={{ marginBottom: '1rem', margin: '0 auto', opacity: 0.9 }} />
                        <h4 style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.25rem', color: 'white' }}>Head chef led</h4>
                        <p style={{ fontSize: '0.85rem', opacity: 0.8, color: 'white' }}>Expert curation</p>
                    </div>
                    <div style={{ textAlign: 'center', flex: 1, minWidth: '200px' }}>
                        <Leaf size={28} style={{ marginBottom: '1rem', margin: '0 auto', opacity: 0.9 }} />
                        <h4 style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.25rem', color: 'white' }}>Seasonal menu</h4>
                        <p style={{ fontSize: '0.85rem', opacity: 0.8, color: 'white' }}>Locally sourced</p>
                    </div>
                    <div style={{ textAlign: 'center', flex: 1, minWidth: '200px' }}>
                        <Star size={28} style={{ marginBottom: '1rem', margin: '0 auto', opacity: 0.9 }} />
                        <h4 style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.25rem', color: 'white' }}>5★ reviews</h4>
                        <p style={{ fontSize: '0.85rem', opacity: 0.8, color: 'white' }}>200+ events</p>
                    </div>
                </div>
            </div>


            {/* Reviews Section */}
            <div style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '3rem', color: '#0f172a' }}>What our clients say</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    
                    <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', textAlign: 'left' }}>
                        <div style={{ display: 'flex', gap: '4px', marginBottom: '1.5rem', color: '#fbbf24' }}>
                            <Star size={20} fill="currentColor" strokeWidth={0} />
                            <Star size={20} fill="currentColor" strokeWidth={0} />
                            <Star size={20} fill="currentColor" strokeWidth={0} />
                            <Star size={20} fill="currentColor" strokeWidth={0} />
                            <Star size={20} fill="currentColor" strokeWidth={0} />
                        </div>
                        <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: '1.7', marginBottom: '2rem', fontStyle: 'italic' }}>
                            "Marmelo catered our company summer party for 60 people. The food was sensational — the pastel de nata dessert was a particular highlight. Would absolutely recommend."
                        </p>
                        <div>
                            <h4 style={{ fontWeight: '700', color: '#0f172a', marginBottom: '0.25rem' }}>Rebecca Chen</h4>
                            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Events Manager, Hoxton Co.</p>
                        </div>
                    </div>

                    <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', textAlign: 'left' }}>
                        <div style={{ display: 'flex', gap: '4px', marginBottom: '1.5rem', color: '#fbbf24' }}>
                            <Star size={20} fill="currentColor" strokeWidth={0} />
                            <Star size={20} fill="currentColor" strokeWidth={0} />
                            <Star size={20} fill="currentColor" strokeWidth={0} />
                            <Star size={20} fill="currentColor" strokeWidth={0} />
                            <Star size={20} fill="currentColor" strokeWidth={0} />
                        </div>
                        <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: '1.7', marginBottom: '2rem', fontStyle: 'italic' }}>
                            "We couldn't have imagined a more perfect wedding feast. The team were professional, the food was extraordinary, and our guests are still talking about it months later."
                        </p>
                        <div>
                            <h4 style={{ fontWeight: '700', color: '#0f172a', marginBottom: '0.25rem' }}>James & Lucy Whitmore</h4>
                            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Wedding couple, October 2023</p>
                        </div>
                    </div>

                    <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', textAlign: 'left' }}>
                        <div style={{ display: 'flex', gap: '4px', marginBottom: '1.5rem', color: '#fbbf24' }}>
                            <Star size={20} fill="currentColor" strokeWidth={0} />
                            <Star size={20} fill="currentColor" strokeWidth={0} />
                            <Star size={20} fill="currentColor" strokeWidth={0} />
                            <Star size={20} fill="currentColor" strokeWidth={0} />
                            <Star size={20} fill="currentColor" strokeWidth={0} />
                        </div>
                        <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: '1.7', marginBottom: '2rem', fontStyle: 'italic' }}>
                            "Third year running we've used Marmelo for our annual conference. Consistent, delicious, and the team are an absolute pleasure to work with."
                        </p>
                        <div>
                            <h4 style={{ fontWeight: '700', color: '#0f172a', marginBottom: '0.25rem' }}>Dr. Sarah Okonkwo</h4>
                            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Conference organiser</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Booking Form Layout */}
            <div style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ backgroundColor: 'white', padding: '3.5rem', borderRadius: '4px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '2.5rem', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>Catering Enquiry Form</h3>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

                        {/* Standard Information */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            <div>
                                <label style={labelStyle}>Group name</label>
                                <input type="text" value={formData.groupName} onChange={e => setFormData({ ...formData, groupName: e.target.value })} required style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Email address</label>
                                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Phone number</label>
                                <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Number of guests</label>
                                <input type="number" value={formData.guests} onChange={e => setFormData({ ...formData, guests: e.target.value })} required min="1" style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Start date</label>
                                <input type="date" value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })} required style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>End date</label>
                                <input type="date" value={formData.endDate} onChange={e => setFormData({ ...formData, endDate: e.target.value })} required style={inputStyle} />
                            </div>
                        </div>

                        <div>
                            <label style={labelStyle}>Delivery times (please specify times for breakfast and lunch, as we make our deliveries separately)</label>
                            <input type="text" value={formData.deliveryTimes} onChange={e => setFormData({ ...formData, deliveryTimes: e.target.value })} required style={inputStyle} />
                        </div>

                        {/* Extended Preferences and Services Options */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '2.5rem' }}>

                            <div>
                                <label style={labelStyle}>Service required (tick as many as appropriate)</label>
                                {['2 Breakfast options + Lunch (£TBC)', '3 Breakfast options + Lunch (£TBC)', '2 Breakfast options (£TBC)', '3 Breakfast options (£TBC)', 'Lunch (£TBC)', 'Dessert (£TBC)'].map(opt => (
                                    <label key={opt} style={checkLabelStyle}>
                                        <input type="checkbox" checked={formData.serviceRequired.includes(opt)} onChange={() => handleCheckboxChange('serviceRequired', opt)} style={{ transform: 'scale(1.2)' }} />
                                        {opt}
                                    </label>
                                ))}
                            </div>

                            <div>
                                <label style={labelStyle}>Compostable cutlery</label>
                                <label style={checkLabelStyle}>
                                    <input type="radio" name="compostableCutlery" checked={formData.compostableCutlery === 'Yes'} onChange={() => setFormData({ ...formData, compostableCutlery: 'Yes' })} style={{ transform: 'scale(1.2)' }} />
                                    Yes
                                </label>
                                <label style={checkLabelStyle}>
                                    <input type="radio" name="compostableCutlery" checked={formData.compostableCutlery === 'No'} onChange={() => setFormData({ ...formData, compostableCutlery: 'No' })} style={{ transform: 'scale(1.2)' }} />
                                    No
                                </label>
                            </div>

                            <div>
                                <label style={labelStyle}>Cutlery options</label>
                                <label style={checkLabelStyle}>
                                    <input type="radio" name="cutleryOptions" checked={formData.cutleryOptions === 'PLATTERS ENVIRONMENTALLY FRIENDLY DISPOSABLE'} onChange={() => setFormData({ ...formData, cutleryOptions: 'PLATTERS ENVIRONMENTALLY FRIENDLY DISPOSABLE' })} style={{ transform: 'scale(1.2)' }} />
                                    PLATTERS ENVIRONMENTALLY FRIENDLY DISPOSABLE
                                </label>
                            </div>

                            <div>
                                <label style={labelStyle}>Additional services requested (tick as many as appropriate)</label>
                                {['Waitstaff', 'Bartenders', 'Food stations', 'Decorations', 'Event planning / coordination', 'Other'].map(opt => (
                                    <label key={opt} style={checkLabelStyle}>
                                        <input type="checkbox" checked={formData.additionalServices.includes(opt)} onChange={() => handleCheckboxChange('additionalServices', opt)} style={{ transform: 'scale(1.2)' }} />
                                        {opt}
                                    </label>
                                ))}
                            </div>

                            <div>
                                <label style={labelStyle}>Additional options (tick as many as appropriate)</label>
                                {['Soft drinks (£TBC)'].map(opt => (
                                    <label key={opt} style={checkLabelStyle}>
                                        <input type="checkbox" checked={formData.additionalOptions.includes(opt)} onChange={() => handleCheckboxChange('additionalOptions', opt)} style={{ transform: 'scale(1.2)' }} />
                                        {opt}
                                    </label>
                                ))}
                            </div>

                            <div>
                                <label style={labelStyle}>Dietary preferences and restrictions</label>
                                <input type="text" value={formData.dietaryPreferences} onChange={e => setFormData({ ...formData, dietaryPreferences: e.target.value })} style={inputStyle} />
                            </div>

                            <div>
                                <label style={labelStyle}>Message / Addtional Requirements</label>
                                <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} required rows="4" style={{ ...inputStyle, resize: 'vertical' }}></textarea>
                            </div>

                        </div>

                        {status && <p style={{ color: status.includes('success') ? 'green' : 'red', margin: 0, textAlign: 'center', fontWeight: '500' }}>{status}</p>}

                        <button type="submit" className="primary-btn" disabled={status === 'Sending...'} style={{ justifyContent: 'center', marginTop: '1rem', width: '100%', fontSize: '1.05rem', padding: '1rem', borderRadius: '4px' }}>
                            {status === 'Sending...' ? 'Sending...' : 'Submit Form'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
