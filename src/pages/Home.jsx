import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Category from './Category';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    'https://fakestoreapi.com/products',
                );
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
        console.log(products);
    }, []);
    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <>
            <Category />
            <div
                className="grid md:grid-cols-3 lg:grid-cols-4
            grid-cols-1 gap-6"
            >
                {products.map((product) => (
                    <Card key={product.id} product={product} />
                ))}
            </div>
        </>
    );
};

export default Home;
