import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import Modal from '../components/Modal';
import './UserPortal.css';

export default function Shop() {
    const { products, addToBasket, currentUser } = useContext(DataContext);
    const [toastMessage, setToastMessage] = useState('');

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '', user_name: currentUser ? currentUser.name : '' });
    const [reviewStatus, setReviewStatus] = useState('');
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        fetch('/api/settings/banners')
            .then(res => res.json())
            .then(data => setBanners(data.banners || []))
            .catch(err => console.error(err));
    }, []);

    const fetchReviews = async (productId) => {
        try {
            const res = await fetch(`/api/products/${productId}/reviews`);
            if (res.ok) {
                const data = await res.json();
                setReviews(data);
            }
        } catch(e) {
            console.error(e);
        }
    };

    const handleProductClick = (p) => {
        setSelectedProduct(p);
        setIsModalOpen(true);
        setReviewForm({ rating: 5, comment: '', user_name: currentUser ? currentUser.name : '' });
        fetchReviews(p.id);
    };

    const submitReview = async (e) => {
        e.preventDefault();
        setReviewStatus('Submitting...');
        try {
            const res = await fetch(`/api/products/${selectedProduct.id}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewForm)
            });
            if (res.ok) {
                setReviewStatus('Review added!');
                setReviewForm({ ...reviewForm, comment: '' });
                fetchReviews(selectedProduct.id);
                setTimeout(() => setReviewStatus(''), 3000);
            } else {
                setReviewStatus('Failed to add review.');
            }
        } catch (e) {
            setReviewStatus('Error occurred.');
        }
    };

    const handleAdd = (product, e) => {
        if (e) e.stopPropagation();
        addToBasket(product);
        setToastMessage(`Added ${product.name} to your basket!`);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
        return (sum / reviews.length).toFixed(1);
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

            {banners.length > 0 && (
                <div style={{ maxWidth: '1200px', margin: '0 auto 3rem auto', padding: '0 2rem' }}>
                    <div style={{ display: 'flex', overflowX: 'auto', gap: '1.5rem', paddingBottom: '1rem', scrollbarWidth: 'thin' }}>
                        {banners.map((url, idx) => (
                            <img key={idx} src={url} alt={`Flash Sale Banner ${idx + 1}`} style={{ minWidth: '300px', height: '250px', objectFit: 'cover', borderRadius: '16px', flex: 1, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                        ))}
                    </div>
                </div>
            )}

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                <div className="product-grid">
                    {products.filter(p => p.status === 'Active').map((p, idx) => (
                        <div key={p.id} className="product-card" onClick={() => handleProductClick(p)} style={{ cursor: 'pointer' }}>
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
                                    <button onClick={(e) => handleAdd(p, e)} className="primary-pill-btn" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>+ Add</button>
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

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title="Product Details"
                footer={
                    <button className="primary-btn" onClick={(e) => { handleAdd(selectedProduct, e); setIsModalOpen(false); }} style={{ width: '100%', padding: '0.75rem', fontSize: '1.1rem' }}>
                        Add to Basket - £{selectedProduct ? parseFloat(selectedProduct.is_flash_sale && selectedProduct.flash_sale_price ? selectedProduct.flash_sale_price : selectedProduct.price).toFixed(2) : '0.00'}
                    </button>
                }
            >
                {selectedProduct && (
                    <div>
                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                            <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
                                <div style={{
                                    width: '100%',
                                    height: '200px',
                                    borderRadius: '8px',
                                    backgroundColor: '#f1f5f9',
                                    backgroundImage: `url('${selectedProduct.images?.[0] || 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600'}')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}></div>
                            </div>
                            <div style={{ flex: '2 1 300px' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#0f172a' }}>{selectedProduct.name}</h3>
                                <p style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '1rem' }}>
                                    £{parseFloat(selectedProduct.is_flash_sale && selectedProduct.flash_sale_price ? selectedProduct.flash_sale_price : selectedProduct.price).toFixed(2)}
                                </p>
                                <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '1rem' }}>
                                    {selectedProduct.description || "Enjoy our carefully selected, premium product."}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f59e0b', fontSize: '1.1rem' }}>
                                    <span>★</span>
                                    <span style={{ fontWeight: 'bold', color: '#0f172a' }}>{calculateAverageRating()}</span>
                                    <span style={{ fontSize: '0.9rem', color: '#64748b' }}>({reviews.length} reviews)</span>
                                </div>
                            </div>
                        </div>

                        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '2rem 0' }} />

                        <div style={{ marginBottom: '2rem' }}>
                            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#0f172a' }}>Purchaser Feedback</h4>
                            {reviews.length === 0 ? (
                                <p style={{ color: '#64748b', fontStyle: 'italic' }}>No reviews yet. Be the first to review!</p>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '250px', overflowY: 'auto', paddingRight: '1rem' }}>
                                    {reviews.map(r => (
                                        <div key={r.id} style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <strong style={{ color: '#0f172a' }}>{r.user_name}</strong>
                                                <span style={{ color: '#f59e0b' }}>{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</span>
                                            </div>
                                            <p style={{ color: '#475569', margin: 0, fontSize: '0.95rem', lineHeight: '1.5', marginBottom: r.admin_reply ? '1rem' : '0' }}>{r.comment}</p>
                                            
                                            {r.admin_reply && (
                                                <div style={{ backgroundColor: 'white', padding: '0.75rem', borderRadius: '6px', borderLeft: '3px solid var(--primary)', marginTop: '0.5rem' }}>
                                                    <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>Response from Marmelo Kitchen</strong>
                                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#334155', lineHeight: '1.4' }}>{r.admin_reply}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div style={{ backgroundColor: '#f1f5f9', padding: '1.5rem', borderRadius: '8px' }}>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#0f172a' }}>Leave a Review</h4>
                            <form onSubmit={submitReview} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Name</label>
                                    <input type="text" value={reviewForm.user_name} onChange={e => setReviewForm({...reviewForm, user_name: e.target.value})} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Rating</label>
                                    <select value={reviewForm.rating} onChange={e => setReviewForm({...reviewForm, rating: parseInt(e.target.value)})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: 'white' }}>
                                        <option value="5">5 Stars - Excellent</option>
                                        <option value="4">4 Stars - Very Good</option>
                                        <option value="3">3 Stars - Good</option>
                                        <option value="2">2 Stars - Fair</option>
                                        <option value="1">1 Star - Poor</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Comment</label>
                                    <textarea value={reviewForm.comment} onChange={e => setReviewForm({...reviewForm, comment: e.target.value})} required rows="3" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', resize: 'vertical' }}></textarea>
                                </div>
                                {reviewStatus && <p style={{ color: reviewStatus.includes('added') ? 'green' : 'red', margin: 0, fontSize: '0.9rem' }}>{reviewStatus}</p>}
                                <button type="submit" className="secondary-btn" style={{ alignSelf: 'flex-start' }} disabled={reviewStatus === 'Submitting...'}>Submit Feedback</button>
                            </form>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
