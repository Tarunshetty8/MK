import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import './UserPortal.css';

export default function Auth() {
    const navigate = useNavigate();
    const { loginUser } = useContext(DataContext);
    const [isSignUp, setIsSignUp] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const res = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                // Success
                loginUser({ email: data.email, name: data.name, role: data.role });

                // Route based on role
                if (data.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/basket');
                }
            } else {
                alert(data.error || 'Login failed. Please verify credentials.');
            }
        } catch (error) {
            console.error('Login Error:', error);
            alert('Error connecting to the server for authentication.');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const phone = e.target.phone.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const res = await fetch('/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, email, password })
            });

            const data = await res.json();

            if (res.ok) {

                loginUser({ email: data.email, role: 'customer' });
                navigate('/basket');
            } else {
                alert(data.error || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration Error:', error);
            alert('Error connecting to the server.');
        }
    };

    return (
        <div className="auth-page" style={{ padding: '6rem 2rem', display: 'flex', justifyContent: 'center' }}>
            <div className="auth-box" style={{ width: '100%', maxWidth: '400px', backgroundColor: 'var(--bg-card)', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>
                    {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h2>
                <form onSubmit={isSignUp ? handleRegister : handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {isSignUp && (
                        <>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="name" style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-main)' }}>Full Name</label>
                                <input type="text" id="name" name="name" placeholder="John Doe" required style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)', outline: 'none' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="phone" style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-main)' }}>Phone Number (Optional)</label>
                                <input type="tel" id="phone" name="phone" placeholder="+1234567890" style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)', outline: 'none' }} />
                            </div>
                        </>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="email" style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-main)' }}>Email Address</label>
                        <input type="email" id="email" name="email" placeholder="you@example.com" required style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)', outline: 'none' }} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="password" style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-main)' }}>Password</label>
                        <input type="password" id="password" name="password" placeholder="••••••••" required style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)', outline: 'none' }} />
                    </div>

                    <button type="submit" className="primary-btn" style={{ width: '100%', marginTop: '0.5rem' }}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>

                    <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
                        <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            style={{ background: 'none', border: 'none', padding: 0, color: 'var(--primary)', fontWeight: '500', cursor: 'pointer', outline: 'none', textDecoration: 'underline' }}
                        >
                            {isSignUp ? 'Sign In' : 'Sign Up'}
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}
