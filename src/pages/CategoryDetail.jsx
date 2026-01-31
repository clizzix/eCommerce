import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router';
import Card from '../components/Card';

const CategoryDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { addToCart, cart, updateQuantity } = useOutletContext();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://fakestoreapi.com/products/category/${slug}`,
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
    }, [slug]);

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <>
            <button className="btn btn-ghost mb-4" onClick={() => navigate(-1)}>
                Back
            </button>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-6">
                {products.map((p) => (
                    <Card
                        key={p.id}
                        product={p}
                        addToCart={addToCart}
                        cart={cart}
                        updateQuantity={updateQuantity}
                    />
                ))}
            </div>
        </>
    );
};

export default CategoryDetail;
