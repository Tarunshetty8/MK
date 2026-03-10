import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import './UserPortal.css';

export default function Shop() {
    const { products, addToBasket } = useContext(DataContext);

    const handleAdd = (product) => {
        addToBasket(product);
        
        alert(`Added ${product.name} to your basket!`);
    };

    return (
        <div style={{ paddingBottom: '6rem' }}>
            <div style={{ backgroundColor: '#f8fafc', padding: '5rem 2rem', textAlign: 'center', borderBottom: '1px solid #e2e8f0', marginBottom: '4rem' }}>
                <p className="hero-pre-heading" style={{ color: 'var(--primary)' }}>OUR PANTRY & BAKERY</p>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem' }}>Shop</h1>
                <p style={{ fontSize: '1.15rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
                    Artisan sourdough, homemade jams, and carefully sourced ingredients from our East London kitchen to yours.
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
                                backgroundPosition: 'center'
                            }}>
                            </div>
                            <div className="product-card-body">
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.25rem' }}>{p.name}</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>{p.category}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                    <p className="price" style={{ margin: 0, fontSize: '1.15rem' }}>£{p.price.toFixed(2)}</p>
                                    <button onClick={() => handleAdd(p)} className="primary-pill-btn" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>+ Add</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
