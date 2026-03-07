import { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, CheckCircle } from 'lucide-react';
import './UserPortal.css';

export default function Basket() {
    const { basketItems, updateBasketQuantity, removeFromBasket, clearBasket, currentUser } = useContext(DataContext);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const navigate = useNavigate();

    const total = basketItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleCheckout = async () => {
        if (!currentUser) {
            // Must be logged in to checkout
            alert('Please sign in or create an account to complete your purchase.');
            navigate('/auth');
            return;
        }

        setIsCheckingOut(true);

        try {
            // 1. Structure the order
            const newOrder = {
                customer: currentUser.email.split('@')[0] || 'Customer',
                email: currentUser.email,
                items: basketItems.map(item => `${item.name} (x${item.quantity})`).join(', '),
                total_amount: total,
                status: 'Pending',
                date: new Date().toISOString().split('T')[0]
            };

            // 2. Submit to backend
            const res = await fetch('http://localhost:3001/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newOrder)
            });

            if (res.ok) {
                clearBasket();
                setOrderComplete(true);
            } else {
                alert('Failed to process order. Please try again.');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('An error occurred during checkout.');
        } finally {
            setIsCheckingOut(false);
        }
    };

    if (orderComplete) {
        return (
            <div className="basket-page" style={{ padding: '6rem 2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                <div style={{ backgroundColor: 'var(--bg-card)', padding: '4rem 2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)' }}>
                    <CheckCircle size={64} color="var(--primary)" style={{ margin: '0 auto 1.5rem auto' }} />
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Order Confirmed!</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                        Thank you for your order, {currentUser?.email?.split('@')[0]}. We'll email you a receipt shortly.
                    </p>
                    <Link to="/shop" className="primary-btn">Return to Shop</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="basket-page" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Your Basket</h2>

            <div style={{ backgroundColor: 'var(--bg-card)', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
                {basketItems.length === 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Your basket is currently empty.</p>
                        <Link to="/shop" className="primary-btn">Continue Shopping</Link>
                    </div>
                ) : (
                    <div className="basket-contents">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {basketItems.map(item => (
                                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                        <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span style={{ fontSize: '2rem' }}>🍞</span>
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>{item.name}</h4>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>£{item.price.toFixed(2)} each</p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: 'var(--radius)' }}>
                                            <button onClick={() => updateBasketQuantity(item.id, item.quantity - 1)} style={{ background: 'transparent', border: 'none', padding: '0.5rem', cursor: 'pointer', color: 'var(--text-main)', display: 'flex' }}><Minus size={16} /></button>
                                            <span style={{ padding: '0 1rem', fontWeight: '500' }}>{item.quantity}</span>
                                            <button onClick={() => updateBasketQuantity(item.id, item.quantity + 1)} style={{ background: 'transparent', border: 'none', padding: '0.5rem', cursor: 'pointer', color: 'var(--text-main)', display: 'flex' }}><Plus size={16} /></button>
                                        </div>

                                        <div style={{ textAlign: 'right', minWidth: '80px' }}>
                                            <p style={{ fontWeight: '600', fontSize: '1.1rem', marginBottom: '0.25rem' }}>£{(item.price * item.quantity).toFixed(2)}</p>
                                            <button onClick={() => removeFromBasket(item.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: 0, marginLeft: 'auto' }}>
                                                <Trash2 size={14} /> Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', paddingTop: '1rem' }}>
                            <span style={{ fontSize: '1.25rem', fontWeight: '600' }}>Total:</span>
                            <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>£{total.toFixed(2)}</span>
                        </div>

                        {!currentUser && (
                            <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius)', color: '#166534', fontSize: '0.9rem', textAlign: 'center' }}>
                                <strong>Almost there!</strong> You'll need to sign in or create an account to complete your checkout.
                            </div>
                        )}

                        <button
                            onClick={handleCheckout}
                            disabled={isCheckingOut}
                            className="primary-btn"
                            style={{ width: '100%', marginTop: '2rem', opacity: isCheckingOut ? 0.7 : 1 }}
                        >
                            {isCheckingOut ? 'Processing...' : (currentUser ? `Checkout • £${total.toFixed(2)}` : 'Sign In to Checkout')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
