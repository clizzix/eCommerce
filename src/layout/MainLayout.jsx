import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router';

const MainLayout = () => {
    const [counter, setCounter] = useState(0);
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (item) => item.id === product.id,
            );
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item,
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return removeFromCart(productId);
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity } : item,
            ),
        );
    };

    return (
        <>
            <Navbar cart={cart} />
            <div className="container mx-auto mt-4">
                <Outlet
                    context={{
                        cart,
                        addToCart,
                        removeFromCart,
                        updateQuantity,
                    }}
                />
            </div>
        </>
    );
};

export default MainLayout;
