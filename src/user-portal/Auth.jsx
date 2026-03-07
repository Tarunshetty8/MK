import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import './UserPortal.css';

export default function Auth() {
    const navigate = useNavigate();
    const { loginUser } = useContext(DataContext);

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (email === 'admin@marmelo.com' || email.startsWith('admin')) {
            if (password === 'admin123') {
                loginUser({ email, role: 'admin' });
                navigate('/admin');
            } else {
                alert('Invalid admin credentials. Please try again.');
            }
        } else {
            // Mock Customer login
            loginUser({ email, role: 'customer' });
            // Redirect to basket to continue checkout or home if empty
            navigate('/basket');
        }
    };

    return (
        <div className="auth-page" style={{ padding: '6rem 2rem', display: 'flex', justifyContent: 'center' }}>
            <div className="auth-box" style={{ width: '100%', maxWidth: '400px', backgroundColor: 'var(--bg-card)', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Welcome Back</h2>
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="email" style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-main)' }}>Email Address</label>
                        <input type="email" id="email" name="email" placeholder="you@example.com" required style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)', outline: 'none' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="password" style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-main)' }}>Password</label>
                        <input type="password" id="password" name="password" placeholder="••••••••" required style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)', outline: 'none' }} />
                    </div>
                    <button type="submit" className="primary-btn" style={{ width: '100%', marginTop: '0.5rem' }}>Sign In</button>
                    <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Don't have an account? <a href="#" style={{ color: 'var(--primary)', fontWeight: '500' }}>Sign Up</a></p>
                </form>
            </div>
        </div>
    );
}
