import { useState, useEffect } from 'react';
import { Link } from 'react-router';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    'https://fakestoreapi.com/products/categories',
                );
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getCategories();
    }, []);

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="flex justify-center items-center">
            {categories.map((c, index) => (
                <Link
                    to={`/category/${c}`}
                    key={index}
                    className="btn btn-outline btn-primary m-4 mb-8"
                >
                    {c.toUpperCase()}
                </Link>
            ))}
        </div>
    );
};

export default Category;
