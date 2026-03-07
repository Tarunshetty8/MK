import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { Search, Plus, Minus, Trash2 } from 'lucide-react';
import './PagesUI.css';

export default function POS() {
    const { products, updateOrderStatus } = useContext(DataContext);
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [customerName, setCustomerName] = useState('Walk-in Customer');

    const activeProducts = products.filter(p => p.status === 'Active');

    const filteredProducts = activeProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const addToCart = (product) => {
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const updateQuantity = (id, delta) => {
        setCart(cart.map(item => {
            if (item.id === id) {
                const newQ = item.quantity + delta;
                return newQ > 0 ? { ...item, quantity: newQ } : item;
            }
            return item;
        }));
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleCheckout = async () => {
        if (cart.length === 0) return;

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    total_amount: totalAmount,
                    collection_time: 'In Store',
                    customer_name: customerName,
                    items: cart // backend might map this later
                })
            });

            if (res.ok) {
                alert('Order placed successfully!');
                setCart([]);
                setCustomerName('Walk-in Customer');
                // Could refresh orders context here if necessary, though it fetches on mount
            } else {
                alert('Failed to place order.');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Error connecting to server.');
        }
    };

    return (
        <div className="page-container pos-container" style={{ display: 'flex', gap: '2rem', height: 'calc(100vh - 100px)' }}>

            {/* Products Section */}
            <div className="pos-products" style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
                <div className="header-actions" style={{ marginBottom: '1rem' }}>
                    <h2>Point of Sale</h2>
                    <div className="search-bar" style={{ width: '100%', maxWidth: '400px' }}>
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search products to add..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="product-grid" style={{ overflowY: 'auto', paddingRight: '10px' }}>
                    {filteredProducts.map(product => (
                        <div
                            key={product.id}
                            className="product-card"
                            onClick={() => addToCart(product)}
                            style={{ cursor: 'pointer', border: '1px solid #eee', padding: '1rem', borderRadius: '8px', textAlign: 'center', backgroundColor: '#fff' }}
                        >
                            <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#2F4F4F' }}>{product.name}</h4>
                            <p style={{ margin: 0, fontWeight: 'bold' }}>£{product.price.toFixed(2)}</p>
                            <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: '#888' }}>Stock: {product.stock}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cart Section */}
            <div className="pos-cart" style={{ flex: 1, backgroundColor: '#fff', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                <h3 style={{ marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>Current Order</h3>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '5px', color: '#555' }}>Customer Name</label>
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
                    />
                </div>

                <div className="cart-items" style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem' }}>
                    {cart.length === 0 ? (
                        <p style={{ color: '#888', textAlign: 'center', marginTop: '2rem' }}>Cart is empty</p>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f5f5f5' }}>
                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: 0, fontWeight: '500', fontSize: '0.9rem' }}>{item.name}</p>
                                    <p style={{ margin: 0, color: '#888', fontSize: '0.85rem' }}>£{item.price.toFixed(2)}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '4px', background: '#eee', border: 'none', borderRadius: '4px', cursor: 'pointer' }}><Minus size={14} /></button>
                                    <span style={{ fontSize: '0.9rem', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '4px', background: '#eee', border: 'none', borderRadius: '4px', cursor: 'pointer' }}><Plus size={14} /></button>
                                    <button onClick={() => removeFromCart(item.id)} style={{ padding: '4px', background: '#ffebeb', color: 'red', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '5px' }}><Trash2 size={14} /></button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-summary" style={{ borderTop: '2px dashed #eee', paddingTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                        <span>Total</span>
                        <span>£{totalAmount.toFixed(2)}</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        disabled={cart.length === 0}
                        style={{ width: '100%', padding: '1rem', backgroundColor: cart.length === 0 ? '#ccc' : '#2F4F4F', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: cart.length === 0 ? 'not-allowed' : 'pointer', transition: 'background-color 0.2s' }}
                    >
                        Checkout & Pay
                    </button>
                </div>
            </div>

        </div>
    );
}
