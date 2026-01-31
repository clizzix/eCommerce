import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import MainLayout from './layout/Mainlayout';
import Home from './pages/Home';
import CategoryDetail from './pages/CategoryDetail';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';

const App = () => {
    return (
        <CartProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route
                            path="category/:slug"
                            element={<CategoryDetail />}
                        />
                        <Route path="cart" element={<Cart />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
};

export default App;
