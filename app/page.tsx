"use client";

import { useMemo, useState } from "react";

type Dish = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: string;
  image: string;
  tag?: string;
};

const dishes: Dish[] = [
  {
    id: 1,
    name: "Doro wat",
    description: "Slow-cooked chicken, berbere, egg & fresh injera",
    price: 420,
    category: "Bestsellers",
    rating: "4.9",
    image: "photo-1547592180-85f173990554",
    tag: "House favorite",
  },
  {
    id: 2,
    name: "Veggie beyaynetu",
    description: "A little bit of everything, served on injera",
    price: 360,
    category: "Vegetarian",
    rating: "4.8",
    image: "photo-1512621776951-a57141f2eefd",
    tag: "Plant based",
  },
  {
    id: 3,
    name: "Tibs fitfit",
    description: "Sizzling beef, torn injera, tomato & awaze",
    price: 390,
    category: "Bestsellers",
    rating: "4.9",
    image: "photo-1547592180-85f173990554",
  },
  {
    id: 4,
    name: "Shiro tegamino",
    description: "Silky chickpea stew with a warm berbere finish",
    price: 280,
    category: "Vegetarian",
    rating: "4.7",
    image: "photo-1547592180-85f173990554",
    tag: "Vegan",
  },
  {
    id: 5,
    name: "Kitfo special",
    description: "Seasoned minced beef, ayib & collard greens",
    price: 480,
    category: "Bestsellers",
    rating: "4.8",
    image: "photo-1565299624946-b28f40a0ae38",
  },
  {
    id: 6,
    name: "Fresh mango juice",
    description: "Ripe mango, squeezed fresh to order",
    price: 100,
    category: "Drinks",
    rating: "4.9",
    image: "photo-1622597467836-f3285f2131b8",
    tag: "Fresh today",
  },
];

const categories = ["All dishes", "Bestsellers", "Vegetarian", "Drinks"];
const deliveryFee = 45;
const formatPrice = (price: number) => `${price.toLocaleString()} ETB`;

function foodImage(image: string) {
  return `https://images.unsplash.com/${image}?auto=format&fit=crop&w=900&q=85`;
}

export default function Home() {
  const [category, setCategory] = useState("All dishes");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const visibleDishes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return dishes.filter((dish) => {
      const categoryMatches = category === "All dishes" || dish.category === category;
      const searchMatches =
        !normalizedQuery ||
        `${dish.name} ${dish.description} ${dish.category}`
          .toLowerCase()
          .includes(normalizedQuery);
      return categoryMatches && searchMatches;
    });
  }, [category, query]);

  const cartItems = dishes.filter((dish) => cart[dish.id]);
  const itemCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  const subtotal = cartItems.reduce((total, dish) => total + dish.price * cart[dish.id], 0);

  function changeQuantity(dishId: number, amount: number) {
    setCart((current) => {
      const quantity = (current[dishId] ?? 0) + amount;
      const next = { ...current };
      if (quantity <= 0) delete next[dishId];
      else next[dishId] = quantity;
      return next;
    });
  }

  function openCheckout() {
    setCartOpen(false);
    setCheckoutOpen(true);
    setOrderPlaced(false);
  }

  function placeOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOrderPlaced(true);
    setCart({});
  }

  return (
    <main>
      <div className="announcement">
        <span className="announcement-dot" />
        <span>Fresh from our kitchen, straight to your door</span>
        <span className="announcement-location">Addis Ababa · Delivery 11:00–22:00</span>
      </div>

      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Addis Eats home">
          <span className="wordmark-mark">a</span>
          <span>addis<span className="wordmark-light">eats</span></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a className="nav-active" href="#menu">Order food</a>
          <a href="#story">Our kitchen</a>
          <a href="#delivery">Delivery</a>
        </nav>
        <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${itemCount} items`}>
          <span className="bag-icon" aria-hidden="true">▢</span>
          <span className="cart-label">Your order</span>
          <span className="cart-count">{itemCount}</span>
        </button>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span /> A taste of home</div>
          <h1>Good food.<br /><em>Good company.</em></h1>
          <p className="hero-description">The dishes you grew up around, made with love and delivered while they’re still warm.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#menu">Find your favorites <span aria-hidden="true">↗</span></a>
            <span className="hero-delivery"><span className="delivery-clock">◷</span> At your door in 30–45 min</span>
          </div>
          <div className="hero-note"><span className="avatar-stack"><i>H</i><i>M</i><i>A</i></span><span>Loved around Addis <strong>4.9/5</strong></span></div>
        </div>
        <div className="hero-visual" role="img" aria-label="A colorful Ethiopian meal served fresh">
          <div className="hero-image" />
          <div className="image-stamp"><span>Made with</span><strong>እንኳን ደህና መጡ</strong><span>care, always</span></div>
          <div className="hero-order-note"><span className="note-spark">✳</span><span><strong>Made fresh,</strong><br />never rushed.</span></div>
        </div>
      </section>

      <section className="service-strip" id="delivery" aria-label="Delivery details">
        <div className="service-item"><span className="service-number">01</span><span><strong>Real ingredients</strong><small>Locally sourced, always</small></span></div>
        <div className="service-item"><span className="service-number">02</span><span><strong>Made to order</strong><small>Not sitting on a shelf</small></span></div>
        <div className="service-item"><span className="service-number">03</span><span><strong>Across Addis</strong><small>From our kitchen to yours</small></span></div>
        <div className="service-promo">Free delivery on orders over 700 ETB <span aria-hidden="true">↗</span></div>
      </section>

      <section className="menu-section" id="menu">
        <div className="section-heading">
          <div><div className="eyebrow"><span /> The good stuff</div><h2>A table full of <em>favorites.</em></h2></div>
          <p>Big flavors, familiar faces.<br />Pick something that feels like you.</p>
        </div>
        <div className="menu-controls">
          <div className="category-tabs" role="tablist" aria-label="Filter dishes by category">
            {categories.map((item) => (
              <button key={item} role="tab" aria-selected={category === item} className={category === item ? "category-tab selected" : "category-tab"} onClick={() => setCategory(item)}>{item}</button>
            ))}
          </div>
          <label className="search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a dish" aria-label="Search dishes" />{query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}>×</button>}</label>
        </div>

        {visibleDishes.length ? <div className="dish-grid">
          {visibleDishes.map((dish) => (
            <article className="dish-card" key={dish.id}>
              <div className="dish-image" style={{ backgroundImage: `url("${foodImage(dish.image)}")` }} role="img" aria-label={dish.name}>
                {dish.tag && <span className="dish-tag">{dish.tag}</span>}
                <span className="dish-rating"><span aria-hidden="true">★</span> {dish.rating}</span>
                <button className="add-button" onClick={() => changeQuantity(dish.id, 1)} aria-label={`Add ${dish.name} to order`}>+</button>
              </div>
              <div className="dish-details"><div><h3>{dish.name}</h3><span className="dish-category">{dish.category}</span></div><strong className="dish-price">{formatPrice(dish.price)}</strong></div>
              <p className="dish-description">{dish.description}</p>
              {cart[dish.id] > 0 && <div className="quantity-control" aria-label={`${cart[dish.id]} ${dish.name} in order`}><button onClick={() => changeQuantity(dish.id, -1)} aria-label={`Remove one ${dish.name}`}>−</button><span>{cart[dish.id]} in your order</span><button onClick={() => changeQuantity(dish.id, 1)} aria-label={`Add one ${dish.name}`}>+</button></div>}
            </article>
          ))}
        </div> : <div className="empty-results"><span>Nothing on the menu by that name.</span><button onClick={() => { setQuery(""); setCategory("All dishes"); }}>Show all dishes</button></div>}
        <div className="menu-bottom"><span>Good things take a little time. Our kitchen is open daily, 11–22.</span><button className="text-link" onClick={() => setCartOpen(true)}>View your order <span aria-hidden="true">→</span></button></div>
      </section>

      <section className="story-section" id="story">
        <div className="story-image" role="img" aria-label="Fresh ingredients ready in the Addis Eats kitchen" />
        <div className="story-copy"><div className="eyebrow"><span /> From our kitchen to yours</div><h2>It tastes better<br />when we <em>share.</em></h2><p>We started Addis Eats with one simple idea: the food that brings us together should be easy to find, wherever the day takes you.</p><a href="#menu" className="story-link">Come eat with us <span aria-hidden="true">↗</span></a></div>
      </section>

      <footer className="site-footer"><a className="wordmark footer-mark" href="#home"><span className="wordmark-mark">a</span><span>addis<span className="wordmark-light">eats</span></span></a><span>Good food finds its way home.</span><span>Made with care in Addis Ababa <span aria-hidden="true">♥</span></span></footer>

      {cartOpen && <div className="overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}>
        <aside className="side-panel" aria-label="Your order">
          <div className="panel-heading"><div><span className="eyebrow"><span /> Your table</span><h2>Your order <span className="panel-count">{itemCount}</span></h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close order">×</button></div>
          {cartItems.length ? <>
            <div className="cart-lines">{cartItems.map((dish) => <div className="cart-line" key={dish.id}><div className="cart-line-image" style={{ backgroundImage: `url("${foodImage(dish.image)}")` }} /><div className="cart-line-info"><strong>{dish.name}</strong><span>{formatPrice(dish.price)}</span><div className="line-quantity"><button onClick={() => changeQuantity(dish.id, -1)} aria-label={`Remove one ${dish.name}`}>−</button><span>{cart[dish.id]}</span><button onClick={() => changeQuantity(dish.id, 1)} aria-label={`Add one ${dish.name}`}>+</button></div></div><strong className="line-total">{formatPrice(dish.price * cart[dish.id])}</strong></div>)}</div>
            <div className="cart-summary"><div><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div><div><span>Delivery</span><span>{subtotal >= 700 ? "Free" : formatPrice(deliveryFee)}</span></div><div className="cart-total"><strong>Total</strong><strong>{formatPrice(subtotal + (subtotal >= 700 ? 0 : deliveryFee))}</strong></div>{subtotal < 700 && <p>Add {formatPrice(700 - subtotal)} more for free delivery.</p>}<button className="button button-primary checkout-button" onClick={openCheckout}>Continue to delivery <span aria-hidden="true">→</span></button><span className="demo-note">Demo checkout · no payment will be collected</span></div>
          </> : <div className="empty-cart"><span className="empty-bowl">○</span><h3>Your table is waiting.</h3><p>Add something delicious from the menu and we’ll take it from here.</p><button className="button button-primary" onClick={() => setCartOpen(false)}>Explore the menu</button></div>}
        </aside>
      </div>}

      {checkoutOpen && <div className="overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setCheckoutOpen(false); }}>
        <section className="checkout-panel" aria-label="Delivery details">
          <div className="panel-heading"><div><span className="eyebrow"><span /> Almost there</span><h2>{orderPlaced ? "Order received." : "Where to?"}</h2></div><button className="close-button" onClick={() => setCheckoutOpen(false)} aria-label="Close checkout">×</button></div>
          {orderPlaced ? <div className="order-success"><span className="success-mark">✓</span><h3>We’re on it.</h3><p>Your demo order is in. In a real checkout, your kitchen and delivery updates would show up here.</p><button className="button button-primary" onClick={() => setCheckoutOpen(false)}>Back to Addis Eats</button></div> : <form className="checkout-form" onSubmit={placeOrder}><p className="checkout-intro">A few details and we’ll get your order moving.</p><label>Your name<input name="name" autoComplete="name" placeholder="Name for the order" required /></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="09…" required /></label><label>Delivery address<textarea name="address" autoComplete="street-address" placeholder="Area, street, building or a nearby landmark" rows={3} required /></label><div className="checkout-total"><span>Order total</span><strong>{formatPrice(subtotal + (subtotal >= 700 ? 0 : deliveryFee))}</strong></div><button className="button button-primary checkout-button" type="submit">Place demo order <span aria-hidden="true">→</span></button><span className="demo-note">This is a demo. No payment or real delivery is processed.</span></form>}
        </section>
      </div>}
    </main>
  );
}
