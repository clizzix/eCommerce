import { useOutletContext } from 'react-router';
import { MdDeleteOutline } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { MdArrowBack } from 'react-icons/md';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } =
        useOutletContext();
    const navigate = useNavigate();

    const total = cart.reduce(
        (acc, item) => acc + item.price * (item.quantity || 1),
        0,
    );
    return (
        <div className="p-4">
            <button
                className="btn btn-ghost mb-4 text-2xl text-accent font-bold"
                onClick={() => navigate(-1)}
            >
                <MdArrowBack />
            </button>
            <h1 className="text-2xl font-bold">Your Cart</h1>

            {cart.length === 0 ? (
                <p>Cart items will appear here.</p>
            ) : (
                <div className="flex flex-col gap-4 mt-4">
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center border p-4 rounded shadow bg-base-100"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-16 h-16 object-contain"
                                />
                                <div>
                                    {' '}
                                    <h2 className="font-semibold line-clamp-1 w-48">
                                        {item.title}
                                    </h2>
                                    <p>
                                        {new Intl.NumberFormat('de-DE', {
                                            style: 'currency',
                                            currency: 'EUR',
                                        }).format(item.price * item.quantity)}
                                    </p>
                                </div>
                            </div>{' '}
                            <div className="flex items-center gap-2">
                                {' '}
                                <button
                                    className="btn btn-sm"
                                    onClick={() =>
                                        updateQuantity(
                                            item.id,
                                            (item.quantity || 1) - 1,
                                        )
                                    }
                                >
                                    -
                                </button>
                                <span>{item.quantity || 1}</span>{' '}
                                <button
                                    className="btn btn-sm"
                                    onClick={() =>
                                        updateQuantity(
                                            item.id,
                                            (item.quantity || 1) + 1,
                                        )
                                    }
                                >
                                    +
                                </button>{' '}
                                <button
                                    className="btn btn-error ml-2 text-2xl"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    <MdDeleteOutline />
                                </button>{' '}
                            </div>
                        </div>
                    ))}
                    <div className="flex flex-row-reverse gap-12 justify-between items-end">
                        <div className="text-right font-bold text-xl mt-4">
                            Total:{' '}
                            {new Intl.NumberFormat('de-DE', {
                                style: 'currency',
                                currency: 'EUR',
                            }).format(total)}{' '}
                        </div>
                        <div>
                            <button
                                className="btn btn-error font-extrabold"
                                onClick={() => clearCart()}
                            >
                                <MdDeleteOutline />
                                Remove all Items
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
