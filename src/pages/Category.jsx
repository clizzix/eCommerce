import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getCategories = async () => {
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
            }
        };

        getCategories();
    }, []);
    return (
        <div>
            {categories.map((c, index) => (
                <Link
                    to={`/category/${c}`}
                    key={index}
                    className="btn btn-outline btn-primary m-2"
                >
                    {c.toUpperCase()}
                </Link>
            ))}
        </div>
    );
};

export default Category;
