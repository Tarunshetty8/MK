import { BrowserRouter, Routes, Route } from 'react-router-dom';


import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import POS from './pages/POS';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Enquiries from './pages/Enquiries';
import Reviews from './pages/Reviews';
import Customers from './pages/Customers';
import Events from './pages/Events';
import Reports from './pages/Reports';
import Settings from './pages/Settings';


import UserLayout from './user-portal/UserLayout';
import Home from './user-portal/Home';
import Shop from './user-portal/Shop';
import Auth from './user-portal/Auth';
import Basket from './user-portal/Basket';
import Profile from './user-portal/Profile';
import About from './user-portal/About';
import Catering from './user-portal/Catering';
import VenueHire from './user-portal/VenueHire';
import UserEvents from './user-portal/UserEvents';
import Contact from './user-portal/Contact';

import './pages/PagesUI.css';
import { DataProvider } from './context/DataContext';

function App() {
    return (
        <DataProvider>
            <BrowserRouter>
                <Routes>
                    {}
                    <Route path="/" element={<UserLayout />}>
                        <Route index element={<Home />} />
                        <Route path="shop" element={<Shop />} />
                        <Route path="auth" element={<Auth />} />
                        <Route path="basket" element={<Basket />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="about" element={<About />} />
                        <Route path="catering" element={<Catering />} />
                        <Route path="venue-hire" element={<VenueHire />} />
                        <Route path="events" element={<UserEvents />} />
                        <Route path="contact" element={<Contact />} />
                    </Route>

                    {}
                    <Route path="/admin" element={<AppLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="pos" element={<POS />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="products" element={<Products />} />
                        <Route path="enquiries" element={<Enquiries />} />
                        <Route path="reviews" element={<Reviews />} />
                        <Route path="customers" element={<Customers />} />
                        <Route path="events" element={<Events />} />
                        <Route path="reports" element={<Reports />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </DataProvider>
    )
}

export default App
