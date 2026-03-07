import { useState } from 'react';
import { Save, Lock, Bell, CreditCard, Store as StoreIcon } from 'lucide-react';
import './Pages.css';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('store');

    return (
        <div className="page-container">
            <div className="page-header" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1>Store Settings</h1>
                    <p className="subtitle">Manage application configuration and integrations.</p>
                </div>
                <button className="btn btn-primary" style={{ display: 'flex', gap: '8px' }}>
                    <Save size={16} /> Save Changes
                </button>
            </div>

            <div className="dashboard-grid" style={{ gridTemplateColumns: '250px 1fr' }}>
                <div className="panel" style={{ height: 'fit-content' }}>
                    <div className="sidebar-nav" style={{ padding: '0.5rem' }}>
                        <ul style={{ gap: '0.5rem', display: 'flex', flexDirection: 'column' }}>
                            <li>
                                <button
                                    className={`action-btn ${activeTab === 'store' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('store')}
                                    style={{ width: '100%', padding: '0.75rem', background: activeTab === 'store' ? 'var(--primary-light)' : 'transparent', border: 'none' }}
                                >
                                    <StoreIcon size={18} /> Store Profile
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`action-btn ${activeTab === 'payments' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('payments')}
                                    style={{ width: '100%', padding: '0.75rem', background: activeTab === 'payments' ? 'var(--primary-light)' : 'transparent', border: 'none' }}
                                >
                                    <CreditCard size={18} /> Payment Methods
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`action-btn ${activeTab === 'notifications' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('notifications')}
                                    style={{ width: '100%', padding: '0.75rem', background: activeTab === 'notifications' ? 'var(--primary-light)' : 'transparent', border: 'none' }}
                                >
                                    <Bell size={18} /> Notifications
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`action-btn ${activeTab === 'security' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('security')}
                                    style={{ width: '100%', padding: '0.75rem', background: activeTab === 'security' ? 'var(--primary-light)' : 'transparent', border: 'none' }}
                                >
                                    <Lock size={18} /> Security & Access
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="panel">
                    <div className="panel-header">
                        <h2>{activeTab === 'store' ? 'Store Profile' : activeTab === 'payments' ? 'Payment Integration' : activeTab === 'notifications' ? 'Alert Preferences' : 'Security Settings'}</h2>
                    </div>
                    <div className="panel-content">

                        {activeTab === 'store' && (
                            <form className="settings-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label className="fw-500">Store Name</label>
                                        <input type="text" className="search-bar" style={{ width: '100%', backgroundColor: 'var(--bg-main)' }} defaultValue="Marmelo Kitchen" />
                                    </div>
                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label className="fw-500">Contact Email</label>
                                        <input type="email" className="search-bar" style={{ width: '100%', backgroundColor: 'var(--bg-main)' }} defaultValue="hello@marmelokitchen.com" />
                                    </div>
                                </div>

                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label className="fw-500">Store Address</label>
                                    <input type="text" className="search-bar" style={{ width: '100%', backgroundColor: 'var(--bg-main)' }} defaultValue="123 High Street, London, UK" />
                                </div>

                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label className="fw-500">Order Confirmation Notification Email</label>
                                    <input type="email" className="search-bar" style={{ width: '100%', backgroundColor: 'var(--bg-main)' }} defaultValue="orders@marmelokitchen.com" />
                                </div>
                            </form>
                        )}

                        {activeTab !== 'store' && (
                            <div style={{ padding: '2rem 0', color: 'var(--text-muted)' }}>
                                Configuration options for {activeTab} will appear here. This section is currently mocked for the initial prototype.
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
