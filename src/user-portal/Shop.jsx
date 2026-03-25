import { useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import './UserPortal.css';

export default function Shop() {
    const { products, addToBasket } = useContext(DataContext);
    const [toastMessage, setToastMessage] = useState('');

    const handleAdd = (product) => {
        addToBasket(product);
        setToastMessage(`Added ${product.name} to your basket!`);
        setTimeout(() => setToastMessage(''), 3000);
    };

    return (
        <div style={{ paddingBottom: '6rem' }}>
            <div style={{ backgroundColor: '#f8fafc', padding: '5rem 2rem', textAlign: 'center', borderBottom: '1px solid #e2e8f0', marginBottom: '4rem' }}>
                <p className="hero-pre-heading" style={{ color: 'var(--primary)' }}>ORGANIC PRODUCE, WINE & BEER</p>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem' }}>Shop</h1>
                <p style={{ fontSize: '1.15rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
                    Explore our curated selection of organic produce, fine wines, craft beers, and specialty coffee beans.
                </p>
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                <div className="product-grid">
                    {products.filter(p => p.status === 'Active').map((p, idx) => (
                        <div key={p.id} className="product-card">
                            <div style={{
                                height: '240px',
                                backgroundColor: '#f1f5f9',
                                backgroundImage: `url('https://images.unsplash.com/photo-${['1509440159596-0249088772ff', '1589367920969-abce89111888', '1550583724-b2692b85b150', '1587049352847-81a56d773c1c'][idx % 4]}?auto=format&fit=crop&q=80&w=600')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                position: 'relative'
                            }}>
                                {p.is_flash_sale ? (
                                    <div style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: 'var(--danger)', color: 'white', padding: '6px 12px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', zIndex: 10, letterSpacing: '0.5px' }}>FLASH SALE</div>
                                ) : null}
                            </div>
                            <div className="product-card-body">
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.25rem' }}>{p.name}</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>{p.category}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                    <div className="price" style={{ margin: 0, fontSize: '1.15rem' }}>
                                        {p.is_flash_sale && p.flash_sale_price ? (
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ color: 'var(--danger)', fontWeight: 'bold' }}>£{parseFloat(p.flash_sale_price).toFixed(2)}</span>
                                                <span style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '0.9rem' }}>£{parseFloat(p.price).toFixed(2)}</span>
                                            </div>
                                        ) : (
                                            `£${parseFloat(p.price).toFixed(2)}`
                                        )}
                                    </div>
                                    <button onClick={() => handleAdd(p)} className="primary-pill-btn" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>+ Add</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {toastMessage && (
                <div style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#10b981', color: 'white', padding: '12px 24px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 1000, fontWeight: 'bold' }}>
                    {toastMessage}
                </div>
            )}
        </div>
    );
}
