const products = [
    { id: 1, name: "Lavender", description: "Aromatic Plant", price: 10, category: "Aromatic Plants", image: "lavender.jpeg" },
    { id: 2, name: "Tulsi", description: "Medicinal Plant", price: 12, category: "Medicinal Plants", image: "tulsi.jpeg" }
    // Add more products here
];

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><a href="#landing">Landing</a></li>
                <li><a href="#products">Products</a></li>
                <li><a href="#cart">Cart</a></li>
            </ul>
        </nav>
    );
};

const Landing = () => {
    return (
        <section id="landing">
            <h1>Welcome to Paradise Nursery</h1>
            <button onClick={() => window.location.href = '#products'}>Shop Now</button>
        </section>
    );
};

const ProductCard = ({ product, addToCart }) => {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
    );
};

const Products = ({ addToCart }) => {
    const aromaticPlants = products.filter(product => product.category === "Aromatic Plants");
    const medicinalPlants = products.filter(product => product.category === "Medicinal Plants");

    return (
        <section id="products">
            <h2>Aromatic Plants</h2>
            <div className="product-grid">
                {aromaticPlants.map(product => (
                    <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
            </div>
            <h2>Medicinal Plants</h2>
            <div className="product-grid">
                {medicinalPlants.map(product => (
                    <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
            </div>
        </section>
    );
};

const CartItem = ({ item, updateQuantity, removeItem }) => {
    return (
        <div className="cart-item">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>Unit Price: ${item.price}</p>
            <p>Total: ${item.price * item.quantity}</p>
            <button onClick={() => updateQuantity(item, -1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item, 1)}>+</button>
            <button onClick={() => removeItem(item)}>Delete</button>
        </div>
    );
};

const Cart = ({ cartItems, updateQuantity, removeItem }) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <section id="cart">
            <h2>Shopping Cart</h2>
            <div className="cart-items">
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    cartItems.map(item => (
                        <CartItem key={item.id} item={item} updateQuantity={updateQuantity} removeItem={removeItem} />
                    ))
                )}
            </div>
            <h3>Total: ${total}</h3>
            <button onClick={() => window.location.href = '#products'}>Continue Shopping</button>
            <button>Checkout</button>
        </section>
    );
};

const App = () => {
    const [cartItems, setCartItems] = React.useState([]);

    const addToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const updateQuantity = (product, amount) => {
        setCartItems(cartItems.map(item =>
            item.id === product.id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
        ));
    };

    const removeItem = (product) => {
        setCartItems(cartItems.filter(item => item.id !== product.id));
    };

    return (
        <div>
            <Navbar />
            <Landing />
            <Products addToCart={addToCart} />
            <Cart cartItems={cartItems} updateQuantity={updateQuantity} removeItem={removeItem} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
