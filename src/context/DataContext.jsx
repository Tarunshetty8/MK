import { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

const API_URL = 'http://localhost:3001/api';

export function DataProvider({ children }) {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [events, setEvents] = useState([]);

    // Auth State
    const [currentUser, setCurrentUser] = useState(null);

    // Basket State
    const [basketItems, setBasketItems] = useState([]);

    // Fetch initial data
    useEffect(() => {
        fetch(`${API_URL}/orders`).then(r => r.json()).then(setOrders).catch(console.error);
        fetch(`${API_URL}/products`).then(r => r.json()).then(setProducts).catch(console.error);
        fetch(`${API_URL}/enquiries`).then(r => r.json()).then(setEnquiries).catch(console.error);
        fetch(`${API_URL}/customers`).then(r => r.json()).then(setCustomers).catch(console.error);
        fetch(`${API_URL}/events`).then(r => r.json()).then(setEvents).catch(console.error);
    }, []);

    // Auth Handlers
    const loginUser = (user) => {
        setCurrentUser(user);
    };

    const logoutUser = () => {
        setCurrentUser(null);
    };

    // Basket Handlers
    const addToBasket = (product) => {
        setBasketItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromBasket = (productId) => {
        setBasketItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateBasketQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromBasket(productId);
            return;
        }
        setBasketItems(prev => prev.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
    }

    const clearBasket = () => {
        setBasketItems([]);
    };


    // Order Handlers
    const updateOrderStatus = async (id, status) => {
        try {
            const res = await fetch(`${API_URL}/orders/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (res.ok) {
                setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
            }
        } catch (error) { console.error(error); }
    };

    // Product Handlers
    const addProduct = async (product) => {
        try {
            const res = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...product, status: 'Active' }) // default active
            });
            if (res.ok) {
                const newProduct = await res.json();
                setProducts([newProduct, ...products]);
            }
        } catch (error) { console.error(error); }
    };

    const editProduct = async (product) => {
        try {
            const res = await fetch(`${API_URL}/products/${product.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            });
            if (res.ok) {
                setProducts(products.map(p => p.id === product.id ? product : p));
            }
        } catch (error) { console.error(error); }
    };

    const deleteProduct = async (id) => {
        try {
            const res = await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
            if (res.ok) setProducts(products.filter(p => p.id !== id));
        } catch (error) { console.error(error); }
    };

    const toggleProductStatus = async (id) => {
        const product = products.find(p => p.id === id);
        if (!product) return;
        const newStatus = product.status === 'Active' ? 'Inactive' : 'Active';
        try {
            const res = await fetch(`${API_URL}/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...product, status: newStatus })
            });
            if (res.ok) {
                setProducts(products.map(p => p.id === id ? { ...p, status: newStatus } : p));
            }
        } catch (error) { console.error(error); }
    };

    // Enquiry Handlers
    const updateEnquiryStatus = async (id, status) => {
        try {
            const res = await fetch(`${API_URL}/enquiries/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (res.ok) {
                setEnquiries(enquiries.map(e => e.id === id ? { ...e, status } : e));
            }
        } catch (error) { console.error(error); }
    };

    // Event Handlers
    const addEvent = async (event) => {
        try {
            const res = await fetch(`${API_URL}/events`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...event, attendees: 0, status: 'Upcoming' })
            });
            if (res.ok) {
                const newEvent = await res.json();
                // Return id from server but for optimism just spread what we sent + new ID
                setEvents([{ ...event, id: newEvent.id, attendees: 0, status: 'Upcoming' }, ...events]);
            }
        } catch (error) { console.error(error); }
    };

    const editEvent = async (event) => {
        try {
            const res = await fetch(`${API_URL}/events/${event.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(event)
            });
            if (res.ok) {
                setEvents(events.map(e => e.id === event.id ? event : e));
            }
        } catch (error) { console.error(error); }
    };

    const deleteEvent = async (id) => {
        try {
            const res = await fetch(`${API_URL}/events/${id}`, { method: 'DELETE' });
            if (res.ok) setEvents(events.filter(e => e.id !== id));
        } catch (error) { console.error(error); }
    };

    return (
        <DataContext.Provider value={{
            orders, updateOrderStatus,
            products, addProduct, editProduct, deleteProduct, toggleProductStatus,
            enquiries, updateEnquiryStatus,
            customers,
            events, addEvent, editEvent, deleteEvent,
            currentUser, loginUser, logoutUser,
            basketItems, addToBasket, removeFromBasket, updateBasketQuantity, clearBasket
        }}>
            {children}
        </DataContext.Provider>
    );
}
