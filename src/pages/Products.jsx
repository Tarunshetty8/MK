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

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === '' || product.category.toLowerCase() === categoryFilter.toLowerCase();
        return matchesSearch && matchesCategory;
    });

    const handleToggleStatus = (id) => toggleProductStatus(id);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        const productData = {
            name: document.getElementById('p-name').value,
            category: document.getElementById('p-cat').value,
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
                        <input
                            type="text"
                            list="filter-categories"
                            className="form-input"
                            style={{ width: '150px' }}
                            placeholder="All Categories"
                            value={categoryFilter}
                            onChange={e => setCategoryFilter(e.target.value)}
                        />
                        <datalist id="filter-categories">
                            <option value="Bakery" />
                            <option value="Pantry" />
                            <option value="Produce" />
                            <option value="Beverages" />
                        </datalist>
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
                                            <button className="icon-btn danger" title="Archive Product" onClick={() => handleDelete(product.id)}><Trash2 size={18} /></button>
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
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Category</label>
                            <input
                                type="text"
                                id="p-cat"
                                list="modal-categories"
                                className="form-input"
                                defaultValue={editingProduct?.category || ''}
                                placeholder="Select or type category..."
                                required
                            />
                            <datalist id="modal-categories">
                                <option value="Bakery" />
                                <option value="Pantry" />
                                <option value="Produce" />
                                <option value="Beverages" />
                            </datalist>
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
        </div>
    );
}
