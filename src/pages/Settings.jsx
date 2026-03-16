import { useState } from 'react';
import { Save, Lock, Bell, CreditCard, Home, Plus, Trash2, Upload } from 'lucide-react';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('security');

    // Role-Based Access Control State
    const availableModules = ['Dashboard', 'POS', 'Orders', 'Products', 'Customers', 'Events', 'Settings'];
    const [roles, setRoles] = useState([
        { id: 1, name: 'Administrator', permissions: ['Dashboard', 'POS', 'Orders', 'Products', 'Customers', 'Events', 'Settings'], isSystem: true },
        { id: 2, name: 'Manager', permissions: ['Dashboard', 'POS', 'Orders', 'Products', 'Customers'], isSystem: false },
        { id: 3, name: 'Staff', permissions: ['POS', 'Orders'], isSystem: false }
    ]);
    const [newRoleName, setNewRoleName] = useState('');

    const handleAddRole = () => {
        if (!newRoleName.trim()) return;
        setRoles([...roles, { id: Date.now(), name: newRoleName.trim(), permissions: [], isSystem: false }]);
        setNewRoleName('');
    };

    const handleDeleteRole = (id) => {
        setRoles(roles.filter(r => r.id !== id));
    };

    const togglePermission = (roleId, module) => {
        setRoles(roles.map(role => {
            if (role.id === roleId && !role.isSystem) {
                const hasPermission = role.permissions.includes(module);
                const updatedPermissions = hasPermission 
                    ? role.permissions.filter(p => p !== module)
                    : [...role.permissions, module];
                return { ...role, permissions: updatedPermissions };
            }
            return role;
        }));
    };

    const tabs = [
        { id: 'store', label: 'Store Profile', icon: <Home size={18} /> },
        { id: 'payments', label: 'Payment Methods', icon: <CreditCard size={18} /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
        { id: 'security', label: 'Security & Access', icon: <Lock size={18} /> }
    ];

    return (
        <div style={{ padding: '0 24px 24px 24px', fontFamily: 'sans-serif', height: '100%', width: '100%', maxWidth: '1200px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingTop: '10px' }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '24px', color: '#0f172a', fontWeight: 'bold' }}>Store Settings</h1>
                    <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '14px' }}>Manage application configuration and integrations.</p>
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>
                    <Save size={16} /> Save Changes
                </button>
            </div>

            {/* Grid */}
            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                {/* Left Sidebar */}
                <div style={{ width: '250px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '16px 8px', flexShrink: 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {tabs.map(tab => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        width: '100%',
                                        padding: '12px 16px',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        backgroundColor: isActive ? '#dcfce7' : 'transparent',
                                        color: isActive ? '#059669' : '#334155',
                                        fontWeight: isActive ? '500' : 'normal',
                                        fontSize: '14px',
                                        textAlign: 'left',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {tab.icon} {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Right Panel */}
                <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0' }}>
                        <h2 style={{ margin: 0, fontSize: '16px', color: '#0f172a', fontWeight: 'bold' }}>
                            {activeTab === 'store' ? 'Store Profile' : activeTab === 'payments' ? 'Payment Integration' : activeTab === 'notifications' ? 'Alert Preferences' : 'Security Settings'}
                        </h2>
                    </div>
                    <div style={{ padding: '40px 20px', minHeight: '300px' }}>
                        {activeTab === 'store' && (
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
                                {/* Logos Upload section */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    {/* Website Logo */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>Website Logo</label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                            <div style={{ width: '160px', height: '60px', borderRadius: '8px', backgroundColor: '#f1f5f9', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', border: '1px dashed #cbd5e1' }}>
                                                <span style={{ fontSize: '16px', color: '#94a3b8', fontWeight: 'bold' }}>Logo</span>
                                            </div>
                                            <div>
                                                <input type="file" id="websiteLogoUpload" style={{ display: 'none' }} accept="image/*" />
                                                <label htmlFor="websiteLogoUpload" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: '#334155', transition: 'all 0.2s', width: 'fit-content' }}>
                                                    <Upload size={16} /> Upload Website Logo
                                                </label>
                                                <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: '#64748b' }}>Recommended format: Rectangular</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile App Logo */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>Mobile App Logo</label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                            <div style={{ width: '80px', height: '80px', borderRadius: '12px', backgroundColor: '#f1f5f9', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', border: '1px dashed #cbd5e1' }}>
                                                <span style={{ fontSize: '20px', color: '#94a3b8', fontWeight: 'bold' }}>App</span>
                                            </div>
                                            <div>
                                                <input type="file" id="mobileAppLogoUpload" style={{ display: 'none' }} accept="image/*" />
                                                <label htmlFor="mobileAppLogoUpload" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: '#334155', transition: 'all 0.2s', width: 'fit-content' }}>
                                                    <Upload size={16} /> Upload App Logo
                                                </label>
                                                <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: '#64748b' }}>Recommended format: 500px x 500px</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>Store Name</label>
                                        <input type="text" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', color: '#334155' }} defaultValue="Marmelo Kitchen" />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>Contact Email</label>
                                        <input type="email" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', color: '#334155' }} defaultValue="hello@marmelokitchen.com" />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>Store Address</label>
                                    <input type="text" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', color: '#334155' }} defaultValue="123 High Street, London, UK" />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>Order Confirmation Notification Email</label>
                                    <input type="email" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', color: '#334155' }} defaultValue="orders@marmelokitchen.com" />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>Opening Hours</label>
                                    <textarea rows="4" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', color: '#334155' }} defaultValue={"Mon: Closed\nTue-Fri: 9am - 6pm\nSat: 8am - 7pm\nSun: 9am - 4pm"} />
                                </div>
                            </form>
                        )}

                        {activeTab === 'payments' && (
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
                                <div>
                                    <h3 style={{ fontSize: '15px', color: '#0f172a', marginBottom: '12px' }}>Stripe API Keys</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <label style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>Publishable Key</label>
                                            <input type="text" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', color: '#334155' }} defaultValue="pk_test_marmelo_mock_key" />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <label style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>Secret Key</label>
                                            <input type="password" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', color: '#334155' }} defaultValue="sk_test_marmelo_mock_secret" />
                                        </div>
                                    </div>
                                </div>
                                <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />
                                <div>
                                    <h3 style={{ fontSize: '15px', color: '#0f172a', marginBottom: '12px' }}>Razorpay API Keys</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <label style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>Key ID</label>
                                            <input type="text" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', color: '#334155' }} placeholder="rzp_test_xxxxxx" />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <label style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>Key Secret</label>
                                            <input type="password" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', color: '#334155' }} placeholder="************" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}

                        {activeTab === 'notifications' && (
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                                        <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                                        <span style={{ fontSize: '15px', color: '#1e293b', fontWeight: '500' }}>Enable Customer Push Notifications</span>
                                    </label>
                                    <p style={{ margin: '4px 0 0 30px', fontSize: '13px', color: '#64748b' }}>Send updates to mobile app users when order status changes.</p>
                                </div>
                                
                                <div>
                                    <h3 style={{ fontSize: '15px', color: '#0f172a', marginBottom: '12px' }}>Firebase Messaging Keys</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>Server Key</label>
                                        <input type="text" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', color: '#334155' }} placeholder="AAA..." />
                                    </div>
                                </div>
                            </form>
                        )}

                        {activeTab === 'security' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                {/* Role Based Access Control */}
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                        <h3 style={{ fontSize: '16px', color: '#0f172a', fontWeight: 'bold', margin: 0 }}>Role-Based Access Control (RBAC)</h3>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <input 
                                                type="text" 
                                                placeholder="New Role Name" 
                                                value={newRoleName}
                                                onChange={(e) => setNewRoleName(e.target.value)}
                                                style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', width: '200px' }}
                                            />
                                            <button 
                                                onClick={handleAddRole}
                                                type="button"
                                                style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}
                                            >
                                                <Plus size={16} /> Add Role
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        {roles.map(role => (
                                            <div key={role.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', backgroundColor: '#f8fafc' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                                    <h4 style={{ margin: 0, fontSize: '15px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        {role.name}
                                                        {role.isSystem && <span style={{ fontSize: '11px', backgroundColor: '#e2e8f0', color: '#475569', padding: '2px 6px', borderRadius: '4px' }}>System Default</span>}
                                                    </h4>
                                                    {!role.isSystem && (
                                                        <button onClick={() => handleDeleteRole(role.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}>
                                                            <Trash2 size={16} />
                                                        </button>
                                                    )}
                                                </div>
                                                
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                                                    {availableModules.map(module => (
                                                        <label key={module} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: role.isSystem ? 'not-allowed' : 'pointer', opacity: role.isSystem ? 0.7 : 1 }}>
                                                            <input 
                                                                type="checkbox" 
                                                                checked={role.permissions.includes(module)}
                                                                onChange={() => togglePermission(role.id, module)}
                                                                disabled={role.isSystem}
                                                                style={{ width: '16px', height: '16px', cursor: role.isSystem ? 'not-allowed' : 'pointer', margin: 0 }}
                                                            />
                                                            <span style={{ fontSize: '14px', color: '#334155' }}>{module}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

                                {/* Password Change Form */}
                                <form style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
                                    <div>
                                        <h3 style={{ fontSize: '15px', color: '#0f172a', marginBottom: '12px' }}>Change Administrator Password</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <label style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>Current Password</label>
                                                <input type="password" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', color: '#334155' }} />
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    <label style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>New Password</label>
                                                    <input type="password" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', color: '#334155' }} />
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    <label style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>Confirm New Password</label>
                                                    <input type="password" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', color: '#334155' }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
