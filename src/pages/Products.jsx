import { useState, useContext } from 'react';
import { Search, Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import Modal from '../components/Modal';
import { DataContext } from '../context/DataContext';
import './Pages.css';

export default function Products() {
    const { products, addProduct, editProduct, deleteProduct, toggleProductStatus } = useContext(DataContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const [customCategories, setCustomCategories] = useState(['Bakery', 'Pantry', 'Produce', 'Beverages']);
    const allCategories = Array.from(new Set([...customCategories, ...products.map(p => p.category)]));
    
    const [modalCategory, setModalCategory] = useState('');
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === '' || product.category.toLowerCase() === categoryFilter.toLowerCase();
        return matchesSearch && matchesCategory;
    });

    const handleToggleStatus = (id) => toggleProductStatus(id);

    const handleDelete = (product) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (productToDelete) {
            deleteProduct(productToDelete.id);
            setIsDeleteModalOpen(false);
            setProductToDelete(null);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        const productData = {
            name: document.getElementById('p-name').value,
            category: modalCategory,
            price: parseFloat(document.getElementById('p-price').value),
            stock: parseInt(document.getElementById('p-stock').value, 10),
        };

        if (editingProduct) {
            editProduct({ ...editingProduct, ...productData });
        } else {
            addProduct(productData);
        }
        setIsModalOpen(false);
    };

    const openEditModal = (product = null) => {
        setEditingProduct(product);
        setModalCategory(product?.category || '');
        setIsAddingCategory(false);
        setNewCategoryName('');
        setIsModalOpen(true);
    };

    return (
        <div className="page-container">
            <div className="page-header" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1>Product Management</h1>
                    <p className="subtitle">Manage store inventory, pricing, and active status.</p>
                </div>
                <button className="btn btn-primary" style={{ display: 'flex', gap: '8px' }} onClick={() => openEditModal()}>
                    <Plus size={16} /> Add New Product
                </button>
            </div>

            <div className="panel">
                <div className="panel-header" style={{ background: 'var(--bg-main)' }}>
                    <div className="search-bar" style={{ width: '100%', maxWidth: '400px', backgroundColor: 'var(--bg-card)' }}>
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search products by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <select
                            className="form-input"
                            style={{ width: '180px', paddingRight: '30px' }}
                            value={categoryFilter}
                            onChange={e => setCategoryFilter(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {allCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th width="50">Img</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Status</th>
                                <th align="right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>No products found.</td>
                                </tr>
                            )}
                            {filteredProducts.map(product => (
                                <tr key={product.id}>
                                    <td>
                                        <div className="product-img-placeholder" style={{ width: '32px', height: '32px', background: 'var(--bg-main)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <ImageIcon size={16} color="var(--text-muted)" />
                                        </div>
                                    </td>
                                    <td className="fw-600">{product.name}</td>
                                    <td>{product.category}</td>
                                    <td className="fw-500">£{product.price.toFixed(2)}</td>
                                    <td>
                                        <span className={`status-badge ${product.stock < 10 ? 'bg-danger text-danger' : 'bg-muted'}`} style={{ padding: '0.15rem 0.5rem' }}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td>
                                        <label className="toggle-switch">
                                            <input type="checkbox" checked={product.status === 'Active'} onChange={() => handleToggleStatus(product.id)} />
                                            <span className="slider round"></span>
                                            <span className="toggle-label" style={{ color: product.status === 'Active' ? 'var(--success)' : 'var(--text-muted)' }}>{product.status}</span>
                                        </label>
                                    </td>
                                    <td align="right">
                                        <div className="action-buttons justify-end">
                                            <button className="icon-btn" title="Edit Product" onClick={() => openEditModal(product)}><Edit size={18} /></button>
                                            <button className="icon-btn danger" title="Archive Product" onClick={() => handleDelete(product)}><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingProduct ? 'Edit Product' : 'Add New Product'}
                footer={
                    <>
                        <button className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleSave}>Save Product</button>
                    </>
                }
            >
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleSave}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Product Name</label>
                        <input type="text" id="p-name" className="form-input" defaultValue={editingProduct?.name || ''} placeholder="e.g. Sourdough Loaf" required />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div 
                            className="form-group" 
                            style={{ marginBottom: 0, position: 'relative' }}
                            onBlur={(e) => {
                                if (!e.currentTarget.contains(e.relatedTarget)) {
                                    setShowCategoryDropdown(false);
                                    setIsAddingCategory(false);
                                }
                            }}
                        >
                            <label className="form-label">Category</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    id="p-cat"
                                    className="form-input"
                                    value={modalCategory}
                                    onChange={(e) => {
                                        setModalCategory(e.target.value);
                                        setShowCategoryDropdown(true);
                                    }}
                                    onFocus={() => setShowCategoryDropdown(true)}
                                    placeholder="Select or type category..."
                                    required
                                    autoComplete="off"
                                    style={{ paddingRight: '30px', cursor: 'pointer' }}
                                />
                                <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', fontSize: '10px', color: '#64748b' }}>▼</span>
                            </div>
                            
                            {showCategoryDropdown && (
                                <div style={{
                                    position: 'absolute', 
                                    top: '100%', 
                                    left: 0, 
                                    right: 0, 
                                    marginTop: '8px',
                                    backgroundColor: '#231d1d', 
                                    borderRadius: '8px', 
                                    zIndex: 100,
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)', 
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    {allCategories.filter(c => c.toLowerCase().includes(modalCategory.toLowerCase())).map(cat => (
                                        <div 
                                            key={cat} 
                                            style={{ 
                                                padding: '10px 16px', 
                                                cursor: 'pointer', 
                                                color: '#e2a588',
                                                fontSize: '14px',
                                                fontWeight: '600'
                                            }}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                setModalCategory(cat);
                                                setShowCategoryDropdown(false);
                                            }}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = '#382f2f'}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                        >
                                            {cat}
                                        </div>
                                    ))}
                                    {isAddingCategory ? (
                                        <div style={{ padding: '12px 16px', borderTop: '1px solid #382f2f', backgroundColor: '#231d1d', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <input 
                                                type="text" 
                                                autoFocus
                                                value={newCategoryName}
                                                onChange={(e) => setNewCategoryName(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        if (newCategoryName.trim()) {
                                                            setCustomCategories([...customCategories, newCategoryName.trim()]);
                                                            setModalCategory(newCategoryName.trim());
                                                            setIsAddingCategory(false);
                                                            setNewCategoryName('');
                                                            setShowCategoryDropdown(false);
                                                        }
                                                    }
                                                }}
                                                placeholder="Category name..."
                                                style={{ width: '100%', padding: '6px 10px', borderRadius: '4px', border: '1px solid #382f2f', backgroundColor: '#1a1515', color: 'white', outline: 'none', fontSize: '13px' }}
                                                onClick={(e) => e.stopPropagation()}
                                                onMouseDown={(e) => e.stopPropagation()}
                                            />
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                <button 
                                                    type="button" 
                                                    style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '12px', cursor: 'pointer' }}
                                                    onClick={(e) => { e.preventDefault(); setIsAddingCategory(false); setNewCategoryName(''); }}
                                                    onMouseDown={(e) => { e.preventDefault(); setIsAddingCategory(false); setNewCategoryName(''); }}
                                                >Cancel</button>
                                                <button 
                                                    type="button" 
                                                    style={{ background: 'var(--primary)', border: 'none', color: 'white', borderRadius: '4px', padding: '4px 10px', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (newCategoryName.trim()) {
                                                            setCustomCategories([...customCategories, newCategoryName.trim()]);
                                                            setModalCategory(newCategoryName.trim());
                                                            setIsAddingCategory(false);
                                                            setNewCategoryName('');
                                                            setShowCategoryDropdown(false);
                                                        }
                                                    }}
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        if (newCategoryName.trim()) {
                                                            setCustomCategories([...customCategories, newCategoryName.trim()]);
                                                            setModalCategory(newCategoryName.trim());
                                                            setIsAddingCategory(false);
                                                            setNewCategoryName('');
                                                            setShowCategoryDropdown(false);
                                                        }
                                                    }}
                                                >Add</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div 
                                            style={{ 
                                                padding: '12px 16px', 
                                                cursor: 'pointer', 
                                                color: '#ffffff', 
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                borderTop: '1px solid #382f2f',
                                                backgroundColor: '#231d1d'
                                            }}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                setIsAddingCategory(true);
                                            }}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = '#382f2f'}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = '#231d1d'}
                                        >
                                            + Add New Category
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Price (£)</label>
                            <input type="number" id="p-price" step="0.01" className="form-input" defaultValue={editingProduct?.price || ''} required />
                        </div>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Initial Stock</label>
                        <input type="number" id="p-stock" className="form-input" defaultValue={editingProduct?.stock || 0} required />
                    </div>
                </form>
            </Modal>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Product"
                footer={
                    <>
                        <button className="btn btn-outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
                        <button className="btn btn-primary bg-danger" style={{ border: 'none', color: 'white' }} onClick={confirmDelete}>Delete</button>
                    </>
                }
            >
                <div style={{ padding: '1rem 0' }}>
                    <p style={{ margin: 0, color: 'var(--text-main)' }}>
                        Are you sure you want to delete <strong>{productToDelete?.name}</strong>? 
                        This action cannot be undone.
                    </p>
                </div>
            </Modal>
        </div>
    );
}
