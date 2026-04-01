import { Users, ChefHat, Leaf, Star, CheckCircle2 } from 'lucide-react';
import './UserPortal.css';

export default function Catering() {


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

            {/* Booking Layout */}
            <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 65%', backgroundColor: 'white', padding: '3.5rem', borderRadius: '4px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <p style={{ color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', fontSize: '0.85rem' }}>CATERING ENQUIRIES</p>
                    <h2 style={{ fontSize: '3rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.5rem' }}>Looking for custom production or event catering?</h2>
                    <p style={{ fontSize: '1.15rem', color: '#64748b', lineHeight: '1.8', marginBottom: '2.5rem', maxWidth: '600px' }}>
                        We offer bespoke food experiences tailored specifically to your needs. Reach out to us directly to discuss your menu.
                    </p>
                    <a href="mailto:natalie@marmelokitchen.com" className="primary-btn" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem', alignSelf: 'flex-start', textDecoration: 'none' }}>
                        Email: natalie@marmelokitchen.com
                    </a>
                </div>

                <div style={{ flex: '1 1 25%', backgroundColor: '#f8fafc', padding: '2.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', height: 'fit-content' }}>
                    <h4 style={{ fontWeight: '700', fontSize: '1.25rem', color: '#0f172a', marginBottom: '1.5rem' }}>We can accommodate</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569', fontSize: '1.05rem' }}><CheckCircle2 size={20} color="#16a34a" /> Vegetarian &amp; vegan</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569', fontSize: '1.05rem' }}><CheckCircle2 size={20} color="#16a34a" /> Gluten-free</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569', fontSize: '1.05rem' }}><CheckCircle2 size={20} color="#16a34a" /> Nut allergies</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569', fontSize: '1.05rem' }}><CheckCircle2 size={20} color="#16a34a" /> Halal requirements</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569', fontSize: '1.05rem' }}><CheckCircle2 size={20} color="#16a34a" /> Dairy-free</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569', fontSize: '1.05rem' }}><CheckCircle2 size={20} color="#16a34a" /> Children's menus</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
