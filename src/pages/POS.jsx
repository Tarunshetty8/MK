import { useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Search, Plus, Minus, Trash2, UserPlus, ShoppingBag, CreditCard } from 'lucide-react';
import './PagesUI.css';

export default function POS() {
    const { products, customers } = useContext(DataContext);
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [customerSelectionType, setCustomerSelectionType] = useState('existing'); // 'existing', 'walk-in', 'new'
    const [selectedCustomerId, setSelectedCustomerId] = useState('');
    const [manualCustomerName, setManualCustomerName] = useState('');

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
    const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const getFinalCustomerName = () => {
        if (customerSelectionType === 'existing' && selectedCustomerId) {
            const cust = customers.find(c => c.id === selectedCustomerId);
            return cust ? cust.name : 'Walk-in Customer';
        } else if (customerSelectionType === 'new' && manualCustomerName.trim()) {
            return manualCustomerName;
        }
        return 'Walk-in Customer';
    };

    const handleCheckout = async () => {
        if (cart.length === 0) return;

        // Ensure we send a string that matches the database column expectation
        const itemsSummaryString = cart.map(item => `${item.name} (x${item.quantity})`).join(', ');

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    total_amount: totalAmount,
                    collection_time: 'In Store',
                    customer_name: getFinalCustomerName(),
                    items: itemsSummaryString
                })
            });

            if (res.ok) {
                alert('Order placed successfully!');
                setCart([]);
                setCustomerSelectionType('existing');
                setSelectedCustomerId('');
                setManualCustomerName('');
            } else {
                alert('Failed to place order. Check server console for constraints errors.');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Error connecting to server.');
        }
    };

    return (
        <div className="page-container" style={{ padding: '0', height: '100vh', display: 'flex', flexDirection: 'column' }}>

            {/* POS Top Bar */}
            <div style={{ backgroundColor: '#fff', padding: '15px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ShoppingBag className="text-primary" /> Point of Sale
                    </h1>
                    <p style={{ margin: '2px 0 0 0', color: '#64748b', fontSize: '0.875rem' }}>Fast checkout for in-store customers</p>
                </div>
                <div style={{ color: '#1e293b', fontWeight: 'bold' }}>
                    {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

                {/* Main Products Area */}
                <div style={{ flex: '1 1 65%', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc', padding: '20px' }}>

                    {/* Search & Filter Bar */}
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input
                                type="text"
                                placeholder="Search products by name or category..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 38px',
                                    borderRadius: '8px',
                                    border: '1px solid #cbd5e1',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                            />
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="pos-products-grid" style={{
                        flex: 1,
                        overflowY: 'auto',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '16px',
                        alignContent: 'start',
                        paddingRight: '8px'
                    }}>
                        {filteredProducts.map(product => (
                            <div
                                key={product.id}
                                className="pos-product-card"
                                onClick={() => addToCart(product)}
                                style={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '12px',
                                    padding: '16px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Optional Image Placeholder styling */}
                                <div style={{ height: '100px', backgroundColor: '#f1f5f9', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ShoppingBag size={32} color="#cbd5e1" />
                                </div>
                                <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', color: '#1e293b', fontWeight: '600', lineHeight: '1.3' }}>{product.name}</h4>
                                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--primary)' }}>£{product.price.toFixed(2)}</p>
                                    <p style={{ margin: 0, fontSize: '0.75rem', padding: '2px 6px', borderRadius: '12px', backgroundColor: product.stock < 10 ? '#fee2e2' : '#f1f5f9', color: product.stock < 10 ? '#ef4444' : '#64748b', fontWeight: '500' }}>
                                        {product.stock} left
                                    </p>
                                </div>
                            </div>
                        ))}
                        {filteredProducts.length === 0 && (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#64748b' }}>
                                <ShoppingBag size={48} style={{ opacity: 0.2, margin: '0 auto 16px block' }} />
                                <p>No products found matching your search.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side Cart Sidebar */}
                <div style={{ flex: '1 1 35%', minWidth: '320px', maxWidth: '450px', backgroundColor: '#fff', borderLeft: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', zIndex: 10 }}>

                    {/* Cart Header & Customer Selection */}
                    <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#1e293b' }}>Current Order</h2>
                            <span style={{ backgroundColor: 'var(--primary)', color: '#fff', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                {totalItemsCount} items
                            </span>
                        </div>

                        <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                <button
                                    onClick={() => setCustomerSelectionType('existing')}
                                    style={{ flex: 1, padding: '4px 8px', fontSize: '0.8rem', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: customerSelectionType === 'existing' ? '#fff' : 'transparent', fontWeight: customerSelectionType === 'existing' ? '600' : 'normal', color: customerSelectionType === 'existing' ? 'var(--primary)' : '#64748b', boxShadow: customerSelectionType === 'existing' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none' }}>
                                    Search
                                </button>
                                <button
                                    onClick={() => setCustomerSelectionType('walk-in')}
                                    style={{ flex: 1, padding: '4px 8px', fontSize: '0.8rem', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: customerSelectionType === 'walk-in' ? '#fff' : 'transparent', fontWeight: customerSelectionType === 'walk-in' ? '600' : 'normal', color: customerSelectionType === 'walk-in' ? 'var(--primary)' : '#64748b', boxShadow: customerSelectionType === 'walk-in' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none' }}>
                                    Walk-in
                                </button>
                                <button
                                    onClick={() => setCustomerSelectionType('new')}
                                    style={{ flex: 1, padding: '4px 8px', fontSize: '0.8rem', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: customerSelectionType === 'new' ? '#fff' : 'transparent', fontWeight: customerSelectionType === 'new' ? '600' : 'normal', color: customerSelectionType === 'new' ? 'var(--primary)' : '#64748b', boxShadow: customerSelectionType === 'new' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none' }}>
                                    New Name
                                </button>
                            </div>

                            {customerSelectionType === 'existing' && (
                                <select
                                    className="form-select"
                                    value={selectedCustomerId}
                                    onChange={(e) => setSelectedCustomerId(e.target.value)}
                                    style={{ width: '100%', padding: '8px', fontSize: '0.9rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                                >
                                    <option value="">-- Select Registered Customer --</option>
                                    {customers.map(c => (
                                        <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
                                    ))}
                                </select>
                            )}

                            {customerSelectionType === 'new' && (
                                <div style={{ position: 'relative' }}>
                                    <UserPlus size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input
                                        type="text"
                                        placeholder="Enter customer name..."
                                        value={manualCustomerName}
                                        onChange={(e) => setManualCustomerName(e.target.value)}
                                        style={{ width: '100%', padding: '8px 8px 8px 32px', fontSize: '0.9rem', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}
                                    />
                                </div>
                            )}

                            {customerSelectionType === 'walk-in' && (
                                <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b', padding: '4px 0 text-center' }}>Order will be placed as Walk-in Customer</p>
                            )}
                        </div>
                    </div>

                    {/* Cart Items List */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px', alignContent: 'start' }}>
                        {cart.length === 0 ? (
                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                                <ShoppingBag size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
                                <p style={{ margin: 0 }}>Your cart is empty</p>
                                <p style={{ fontSize: '0.8rem', mt: '4px' }}>Add products from the left side</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px 0' }}>
                                {cart.map(item => (
                                    <div key={item.id} style={{ display: 'flex', justifyItems: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px dashed #e2e8f0' }}>
                                        <div style={{ flex: 1, paddingRight: '12px' }}>
                                            <p style={{ margin: '0 0 4px 0', fontWeight: '500', fontSize: '0.95rem', color: '#1e293b' }}>{item.name}</p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>£{item.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                                            <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1rem', color: '#1e293b' }}>£{(item.price * item.quantity).toFixed(2)}</p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#f1f5f9', borderRadius: '6px', padding: '2px' }}>
                                                <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '4px 8px', background: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}><Minus size={12} /></button>
                                                <span style={{ fontSize: '0.9rem', width: '24px', textAlign: 'center', fontWeight: '500' }}>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '4px 8px', background: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}><Plus size={12} /></button>
                                            </div>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} style={{ padding: '8px', background: 'transparent', color: '#ef4444', border: 'none', borderRadius: '6px', cursor: 'pointer', marginLeft: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Checkout Footer */}
                    <div style={{ padding: '24px 20px', backgroundColor: '#fff', borderTop: '1px solid #e2e8f0', boxShadow: '0 -4px 10px rgba(0,0,0,0.02)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#64748b', fontSize: '0.95rem' }}>
                            <span>Subtotal</span>
                            <span>£{totalAmount.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: '#64748b', fontSize: '0.95rem' }}>
                            <span>Tax (Included)</span>
                            <span>£0.00</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', alignItems: 'center' }}>
                            <span>Total</span>
                            <span style={{ color: 'var(--primary)' }}>£{totalAmount.toFixed(2)}</span>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={cart.length === 0}
                            style={{
                                width: '100%',
                                padding: '16px',
                                backgroundColor: cart.length === 0 ? '#cbd5e1' : 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '8px',
                                boxShadow: cart.length === 0 ? 'none' : '0 4px 6px rgba(47, 79, 79, 0.2)'
                            }}
                        >
                            <CreditCard size={20} />
                            Charge £{totalAmount.toFixed(2)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
