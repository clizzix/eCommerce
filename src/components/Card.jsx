import { Link } from 'react-router';

const Card = ({ product, addToCart, cart, updateQuantity }) => {
    const cartItem = cart?.find((item) => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity || 1 : 0;

    return (
        <div className="card bg-base-300 border-base-400 w-full h-full shadow-md">
            <figure>
                <img
                    src={product.image}
                    alt="Product Image"
                    className="h-48 w-full object-contain bg-zinc-300"
                />
            </figure>
            <div className="card-body flex flex-col justify-center items-center">
                <h2 className="card-title text-center line-clamp-1">
                    {product.title}
                </h2>
                <Link
                    to={`/category/${product.category}`}
                    className="text-secondary hover:underline"
                >
                    {product.category}
                </Link>
                <p>
                    {new Intl.NumberFormat('de-DE', {
                        style: 'currency',
                        currency: 'EUR',
                    }).format(product.price)}
                </p>
                <div className="card-actions mt-auto">
                    {quantity > 0 ? (
                        <div className="flex items-center gap-2">
                            <button
                                className="btn btn-sm"
                                onClick={() =>
                                    updateQuantity(product.id, quantity - 1)
                                }
                            >
                                -
                            </button>
                            <span className="font-bold text-lg">
                                {quantity}
                            </span>
                            <button
                                className="btn btn-sm"
                                onClick={() =>
                                    updateQuantity(product.id, quantity + 1)
                                }
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        <button
                            className="btn btn-primary"
                            onClick={() => addToCart(product)}
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;
