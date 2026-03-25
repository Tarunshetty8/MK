import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import './Auth.css';
import Logo from '../components/Logo';

export default function Auth() {
    const navigate = useNavigate();
    const { loginUser } = useContext(DataContext);
    const [isSignUp, setIsSignUp] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [animateForm, setAnimateForm] = useState(false);

    useEffect(() => {
        setAnimateForm(true);
        const timer = setTimeout(() => setAnimateForm(false), 500);
        return () => clearTimeout(timer);
    }, [isSignUp]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                // Success
                localStorage.setItem('marmelo_token', data.token);
                loginUser({ email: data.email, name: data.name, role: data.role });

                // Route based on role
                if (data.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/basket');
                }
            } else {
                setErrorMessage(data.error || 'Login failed. Please verify credentials.');
            }
        } catch (error) {
            console.error('Login Error:', error);
            setErrorMessage('Error connecting to the server for authentication.');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        const name = e.target.name.value;
        const phone = e.target.phone.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, email, password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('marmelo_token', data.token);
                loginUser({ email: data.email, name: data.name, role: 'customer' });
                navigate('/basket');
            } else {
                setErrorMessage(data.error || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration Error:', error);
            setErrorMessage('Error connecting to the server.');
        }
    };

    const toggleMode = () => {
        setErrorMessage('');
        setIsSignUp(!isSignUp);
    };

    return (
        <div className="auth-container">
            {/* Left Image Panel (Desktop Only) */}
            <div className="auth-image-panel">
                <div className="auth-image-content">
                    <Logo color="white" size="2rem" style={{ marginBottom: '2rem' }} />
                    <h1>Experience the extraordinary, everyday.</h1>
                    <p>Join the Marmelo community for exclusive access to curated groceries, natural wines, and special events.</p>
                </div>
            </div>

            {/* Right Form Panel */}
            <div className="auth-form-panel">
                <div className="auth-form-wrapper" key={isSignUp ? 'signup' : 'login'}>
                    <div className="auth-header" style={{ animation: animateForm ? 'fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'none' }}>
                        <h2>{isSignUp ? 'Create an Account' : 'Welcome Back'}</h2>
                        <p>{isSignUp ? 'Sign up to shop and book events.' : 'Please enter your details to sign in.'}</p>
                    </div>
                    
                    {errorMessage && (
                        <div className="auth-error">
                            {errorMessage}
                        </div>
                    )}

                    <form 
                        onSubmit={isSignUp ? handleRegister : handleLogin} 
                        style={{ animation: animateForm ? 'fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both' : 'none' }}
                    >

                        {isSignUp && (
                            <div className="form-transition-wrapper">
                                <div className="input-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input className="auth-input" type="text" id="name" name="name" placeholder="John Doe" required={isSignUp} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="phone">Phone Number (Optional)</label>
                                    <input className="auth-input" type="tel" id="phone" name="phone" placeholder="+44 20 7946 0958" />
                                </div>
                            </div>
                        )}

                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <input className="auth-input" type="email" id="email" name="email" placeholder="you@example.com" required />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input className="auth-input" type="password" id="password" name="password" placeholder="••••••••" required />
                        </div>

                        <button type="submit" className="auth-submit-btn">
                            {isSignUp ? 'Create Account' : 'Sign In'}
                        </button>

                        <div className="auth-switch">
                            {isSignUp ? (
                                <>
                                    Already have an account? 
                                    <button type="button" onClick={toggleMode}>Sign in</button>
                                </>
                            ) : (
                                <>
                                    Don't have an account? 
                                    <button type="button" onClick={toggleMode}>Sign up</button>
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
