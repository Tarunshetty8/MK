import { useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogIn, Store, LogOut, User } from 'lucide-react';
import { DataContext } from '../context/DataContext';
import './UserPortal.css';

export default function UserLayout() {
    const { basketItems, currentUser, logoutUser } = useContext(DataContext);
    const navigate = useNavigate();

    const totalCartItems = basketItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    };

    return (
        <div className="user-layout">
            <nav className="user-navbar">
                <div className="user-nav-brand" style={{ display: 'flex', alignItems: 'center' }}>
                    <Store size={32} color="var(--primary)" strokeWidth={2.5} />
                    <Link to="/" style={{ marginLeft: '10px' }}>Marmelo Kitchen</Link>
                </div>
                <div className="user-nav-links">
                    <Link to="/shop">Shop</Link>
                    <div className="nav-dropdown">
                        <Link to="/services" style={{ margin: '0 1.25rem' }}>Services <span style={{ fontSize: '0.6rem', verticalAlign: 'middle', marginLeft: '2px' }}>▼</span></Link>
                        <div className="nav-dropdown-content">
                            <Link to="/services#catering" className="nav-dropdown-item">
                                <span className="dropdown-icon-wrapper">🍽️</span> <span>Catering</span>
                            </Link>
                            <Link to="/services#venue" className="nav-dropdown-item">
                                <span className="dropdown-icon-wrapper">🏠</span> <span>Venue Hire</span>
                            </Link>
                            <Link to="/services#wholesale" className="nav-dropdown-item">
                                <span className="dropdown-icon-wrapper">📦</span> <span>Wholesale</span>
                            </Link>
                        </div>
                    </div>
                    <Link to="/events">Events</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </div>
                <div className="user-nav-icons">
                    <Link to="/basket" className="header-icon" style={{ position: 'relative' }}>
                        <ShoppingCart size={20} />
                        {totalCartItems > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                backgroundColor: 'var(--primary)',
                                color: 'white',
                                fontSize: '0.7rem',
                                fontWeight: '700',
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {totalCartItems}
                            </span>
                        )}
                    </Link>
                    {currentUser ? (
                        <div className="nav-dropdown" style={{ marginLeft: '1rem', cursor: 'pointer' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
                                <User size={18} />
                                <span style={{ fontWeight: '500' }}>{currentUser.email.split('@')[0]}</span>
                                <span style={{ fontSize: '0.6rem', marginTop: '2px' }}>▼</span>
                            </div>
                            <div className="nav-dropdown-content" style={{ right: 0, left: 'auto', transform: 'none', minWidth: '150px' }}>
                                <Link to="/profile" className="nav-dropdown-item">
                                    <User size={16} /> <span>My Profile</span>
                                </Link>
                                <button onClick={handleLogout} className="nav-dropdown-item" style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}>
                                    <LogOut size={16} /> <span>Sign Out</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/auth" className="header-auth-btn">
                            <LogIn size={18} style={{ marginRight: '6px' }} /> Sign In
                        </Link>
                    )}
                </div>
            </nav>

            <main className="user-content">
                <Outlet />
            </main>

            <footer className="user-footer">
                <div className="footer-col brand-col">
                    <div className="footer-logo" style={{ display: 'flex', alignItems: 'center' }}>
                        <Store size={32} color="var(--primary-light)" strokeWidth={2.5} />
                        <h4 style={{ marginLeft: '10px', marginBottom: 0 }}>Marmelo Kitchen</h4>
                    </div>
                    <p>Artisan Portuguese-inspired food,<br />catering & venue hire in East London.</p>
                </div>
                <div className="footer-col">
                    <h4 className="footer-heading">Quick Links</h4>
                    <Link to="/shop">Shop</Link>
                    <Link to="/services">Catering</Link>
                    <Link to="/services">Venue Hire</Link>
                    <Link to="/events">Events</Link>
                </div>
                <div className="footer-col">
                    <h4 className="footer-heading">Opening Hours</h4>
                    <div className="hours-row"><span>Mon</span><span>Closed</span></div>
                    <div className="hours-row"><span>Tue–Fri</span><span>9am – 6pm</span></div>
                    <div className="hours-row"><span>Saturday</span><span>8am – 7pm</span></div>
                    <div className="hours-row"><span>Sunday</span><span>9am – 4pm</span></div>
                </div>
                <div className="footer-col">
                    <h4 className="footer-heading">Get in Touch</h4>
                    <p>📍 47 Columbia Road, Bethnal Green,<br />London E2 7RG</p>
                    <p>📞 +44 20 7946 0958</p>
                    <p>✉️ hello@marmelokitchen.com</p>
                </div>
            </footer>
        </div>
    );
}
