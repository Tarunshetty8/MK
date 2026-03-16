import { useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Search, Plus, User, ScanLine, Minus, Trash2 } from 'lucide-react';

export default function POS() {
    const { products, customers } = useContext(DataContext);
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('Categories'); 
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [customerInput, setCustomerInput] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [statusType, setStatusType] = useState('');

    const categories = ['Fruits & Vegetables', 'Bakery', 'Pantry', 'Beverages'];
    // For demo using some Marmelo categories + reference ones
    const displayCategories = activeTab === 'Categories' ? ['Fruits & Vegetables', 'shwapno', 'Daraz', 'Ghorer bazar'] : ['Daraz'];

    const activeProducts = products.filter(p => p.status === 'Active');
    const filteredProducts = activeProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
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

    const handleCheckout = async () => {
        if (cart.length === 0) return;
        const itemsSummaryString = cart.map(item => `${item.name} (x${item.quantity})`).join(', ');

        try {
            const token = localStorage.getItem('marmelo_token');
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify({
                    total_amount: totalAmount,
                    collection_time: 'In Store',
                    customer_name: customerInput || 'Walk-in Customer',
                    items: itemsSummaryString,
                    raw_items: cart.map(item => ({ id: item.id, quantity: item.quantity, price: item.price }))
                })
            });

            if (res.ok) {
                setStatusMessage('Order placed successfully!');
                setStatusType('success');
                setCart([]);
                setCustomerInput('');
            } else {
                setStatusMessage('Failed to place order. Please try again.');
                setStatusType('error');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            setStatusMessage('Error connecting to server.');
            setStatusType('error');
        }
        
        setTimeout(() => {
            setStatusMessage('');
            setStatusType('');
        }, 3500);
    };

    return (
        <div style={{ display: 'flex', height: '100%', minHeight: '80vh', backgroundColor: '#f4f6f9', padding: '10px', gap: '15px', fontFamily: 'sans-serif' }}>
            {/* Left Sidebar - Categories */}
            <div style={{ width: '180px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                    <button 
                        onClick={() => setActiveTab('Categories')}
                        style={{ flex: 1, backgroundColor: activeTab === 'Categories' ? '#5cb85c' : '#fff', color: activeTab === 'Categories' ? '#fff' : '#5cb85c', padding: '10px 5px', border: activeTab === 'Categories' ? 'none' : '1px solid #5cb85c', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                        Categories
                    </button>
                    <button 
                        onClick={() => setActiveTab('Brands')}
                        style={{ flex: 1, backgroundColor: activeTab === 'Brands' ? '#5cb85c' : '#fff', color: activeTab === 'Brands' ? '#fff' : '#5cb85c', padding: '10px 5px', border: activeTab === 'Brands' ? 'none' : '1px solid #5cb85c', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                        Brands
                    </button>
                </div>
                
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '5px' }}>
                    {displayCategories.map(cat => (
                        <div key={cat} onClick={() => setSelectedCategory(cat)} style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '15px 10px', textAlign: 'center', cursor: 'pointer', border: selectedCategory === cat ? '2px solid #5cb85c' : '1px solid #eee', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                            <div style={{ width: '60px', height: '60px', margin: '0 auto', backgroundColor: '#f0f0f0', borderRadius: '8px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                {/* Using distinct colored blocks or icon based on name to simulate images */}
                                <div style={{ fontSize: '24px', color: '#888' }}>
                                    {cat === 'Fruits & Vegetables' ? '🍎' : cat === 'shwapno' ? '🛒' : cat === 'Daraz' ? '📦' : '🏠'}
                                </div>
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e293b' }}>{cat}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Middle Column - Products Grid */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ backgroundColor: '#fff', padding: '15px', textAlign: 'center', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    <h2 style={{ color: '#5cb85c', margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Products</h2>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input 
                        placeholder="Scan/Search featured product by name or code" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ flex: 1, padding: '15px', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', fontSize: '14px' }} 
                    />
                    <button style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', padding: '0 15px', borderRadius: '4px', cursor: 'pointer', color: '#333' }}>
                        <ScanLine size={20} />
                    </button>
                </div>
                
                <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '15px', alignContent: 'start', paddingRight: '5px' }}>
                    {filteredProducts.map(p => (
                        <div key={p.id} onClick={() => addToCart(p)} style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '15px', textAlign: 'center', cursor: 'pointer', border: '1px solid #eee', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'transform 0.1s' }}>
                            <div style={{ width: '100%', height: '110px', backgroundColor: '#f8fafc', marginBottom: '12px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>
                                {p.name.includes('Loaf') ? '🍞' : p.name.includes('Babka') ? '🍩' : p.name.includes('Oil') ? '🫒' : p.name.includes('Jam') ? '🍯' : p.name.includes('Coffee') ? '☕' : '🥦'}
                            </div>
                            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '4px' }}>{p.name}</div>
                            <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '8px' }}>CODE{p.id}</div>
                            <div style={{ fontSize: '12px', color: '#5cb85c', fontWeight: 'bold' }}>In Stock: {p.stock}</div>
                        </div>
                    ))}
                    {filteredProducts.length === 0 && (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No products found.</div>
                    )}
                </div>
            </div>

            {/* Right Column - POS Cart & Order Summary */}
            <div style={{ width: '450px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                {statusMessage && (
                    <div style={{ 
                        padding: '12px 15px', 
                        borderRadius: '4px', 
                        backgroundColor: statusType === 'success' ? '#dcfce7' : '#fee2e2', 
                        color: statusType === 'success' ? '#166534' : '#991b1b',
                        border: `1px solid ${statusType === 'success' ? '#bbf7d0' : '#fecaca'}`,
                        fontSize: '14px',
                        fontWeight: '600',
                        textAlign: 'center'
                    }}>
                        {statusMessage}
                    </div>
                )}

                <div style={{ display: 'flex', backgroundColor: '#fff', borderRadius: '4px', alignItems: 'center', border: '1px solid #e2e8f0' }}>
                    <div style={{ padding: '12px 15px', color: '#1e293b' }}><User size={20} /></div>
                    <input 
                        placeholder="Enter Customer name or phone number" 
                        value={customerInput}
                        onChange={(e) => setCustomerInput(e.target.value)}
                        style={{ flex: 1, border: 'none', outline: 'none', padding: '15px 0', fontSize: '14px' }} 
                    />
                    <button style={{ border: 'none', backgroundColor: '#fff', padding: '15px', cursor: 'pointer', borderLeft: '1px solid #e2e8f0', color: '#64748b' }}>
                        <Plus size={20} />
                    </button>
                </div>
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e2e8f0', backgroundColor: '#fff' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px', minWidth: '400px' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#cce5ff', color: '#5cb85c' }}>
                                    <th style={{ padding: '12px', fontWeight: 'bold' }}>Product</th>
                                    <th style={{ padding: '12px', fontWeight: 'bold' }}>IMEI/Variant</th>
                                    <th style={{ padding: '12px', fontWeight: 'bold' }}>Tax</th>
                                    <th style={{ padding: '12px', fontWeight: 'bold' }}>Price</th>
                                    <th style={{ padding: '12px', fontWeight: 'bold', width: '80px' }}>QTY</th>
                                    <th style={{ padding: '12px', fontWeight: 'bold' }}>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>No products available in the list</td>
                                    </tr>
                                ) : (
                                    cart.map(item => (
                                        <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '12px', maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</td>
                                            <td style={{ padding: '12px' }}>-</td>
                                            <td style={{ padding: '12px' }}>0.00</td>
                                            <td style={{ padding: '12px' }}>$ {item.price.toFixed(2)}</td>
                                            <td style={{ padding: '12px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '2px', cursor: 'pointer', border: '1px solid #e2e8f0', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}><Minus size={12}/></button>
                                                    <span style={{ fontSize: '12px', width: '16px', textAlign: 'center' }}>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '2px', cursor: 'pointer', border: '1px solid #e2e8f0', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}><Plus size={12}/></button>
                                                </div>
                                            </td>
                                            <td style={{ padding: '12px' }}>$ {(item.price * item.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div style={{ backgroundColor: '#dcf6fa', padding: '15px', color: '#0f172a', fontSize: '14px', fontWeight: '600' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span>Total Products:</span>
                        <span>{cart.length}({totalItemsCount})</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span>Total Amount:</span>
                        <span>$ {totalAmount.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#ef4444' }}>
                        <span>Discount</span>
                        <span>- $ 0.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Coupon 
                            <button style={{ padding: '2px 8px', backgroundColor: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', color: '#64748b', fontSize: '14px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>+</button>
                        </span>
                        <span>$ 0.00</span>
                    </div>
                </div>

                <div style={{ backgroundColor: '#5cb85c', padding: '15px 20px', color: '#fff', display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold', borderRadius: '4px' }}>
                    <span>Grand Total:</span>
                    <span>$ {totalAmount.toFixed(2)}</span>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'nowrap', margin: '5px 0' }}>
                    <button style={{ flex: 1, padding: '12px', backgroundColor: '#b2dfdb', color: '#00796b', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>Cash</button>
                    <button style={{ flex: 1, padding: '12px', backgroundColor: '#fff', color: '#6772e5', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>stripe</button>
                    <button style={{ flex: 1, padding: '12px', backgroundColor: '#ffebee', color: '#003087', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>PayPal</button>
                    <button style={{ flex: 1, padding: '12px', backgroundColor: '#e3f2fd', color: '#0f4a8a', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>Razorpay</button>
                    <button style={{ flex: 1, padding: '12px', backgroundColor: '#e0f7fa', color: '#00c3f8', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>paystack</button>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => setCart([])} style={{ flex: 1, padding: '16px', backgroundColor: '#ffcdd2', color: '#d32f2f', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
                    <button style={{ flex: 1, padding: '16px', backgroundColor: '#ffcc80', color: '#e65100', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>Draft</button>
                    <button onClick={handleCheckout} style={{ flex: 2, padding: '16px', backgroundColor: '#5cb85c', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>Save & Complete</button>
                </div>
            </div>
        </div>
    );
}
