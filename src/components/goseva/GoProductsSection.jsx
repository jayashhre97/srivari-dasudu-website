import React, { useState, useEffect } from 'react';
import LotusDivider from '../LotusDivider';
import { GO_PRODUCTS } from '../../data/gosevaData';
import GoCartModal from './GoCartModal';

const CART_STORAGE_KEY = 'srivari_gouseva_cart_v1';

export default function GoProductsSection({ isEn }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedToast, setAddedToast] = useState(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      // LocalStorage error fallback
    }
  }, [cart]);

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce(
    (sum, item) => sum + (Number(item.product.price) || 0) * item.quantity,
    0
  );

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }
      return [...prev, { product, quantity }];
    });

    const name = isEn ? product.nameEn : product.nameTe;
    setAddedToast(name);
    setTimeout(() => {
      setAddedToast(null);
    }, 2500);
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const buyNow = (product) => {
    // Add product if not present
    setCart((prev) => {
      const exists = prev.some((item) => item.product.id === product.id);
      if (!exists) {
        return [...prev, { product, quantity: 1 }];
      }
      return prev;
    });
    setIsCartOpen(true);
  };

  return (
    <section
      id="goseva-products"
      className="goseva-section goseva-products-section"
      aria-labelledby="go-products-heading"
    >
      <div className="goseva-container">
        <div className="goseva-section-header">
          <div className="goseva-sec-eyebrow">
            <span aria-hidden="true">✦</span>
            <span>{isEn ? 'AUTHENTIC GOSHALA CREATIONS' : 'సహజ గోశాల ఉత్పత్తులు'}</span>
            <span aria-hidden="true">✦</span>
          </div>
          <h2 id="go-products-heading" className="goseva-sec-heading">
            {isEn ? 'Our Goshala Products' : 'మా గోశాల ఉత్పత్తులు'}
          </h2>
          <LotusDivider />
          <p className="goseva-sec-sub">
            {isEn
              ? 'Explore traditional cow-based products and support our daily Go Seva activities through every purchase.'
              : 'సంప్రదాయ గో-ఆధారిత ఉత్పత్తులను కొనుగోలు చేసి మా నిత్య గోసేవ కార్యక్రమాలకు తోడ్పడండి.'}
          </p>

          {/* Cart Trigger / Status Pill in Header */}
          <div className="goseva-cart-header-bar">
            <button
              type="button"
              className={`goseva-view-cart-trigger ${totalCount > 0 ? 'has-items' : ''}`}
              onClick={() => setIsCartOpen(true)}
              aria-label={isEn ? `View Cart with ${totalCount} items` : `కార్ట్ చూడండి (${totalCount} వస్తువులు)`}
            >
              <span className="cart-trigger-icon" aria-hidden="true">🛒</span>
              <span className="cart-trigger-label">
                {isEn ? 'Goshala Cart' : 'గోశాల కార్ట్'}
              </span>
              <span className="cart-trigger-badge">
                {totalCount > 0
                  ? `${totalCount} ${totalCount === 1 ? (isEn ? 'item' : 'వస్తువు') : (isEn ? 'items' : 'వస్తువులు')} · ₹${totalAmount}`
                  : (isEn ? '0 items' : '0 వస్తువులు')}
              </span>
              <span className="cart-trigger-arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="goseva-products-grid">
          {GO_PRODUCTS.map((product) => {
            const cartItem = cart.find((item) => item.product.id === product.id);
            const inCart = Boolean(cartItem);

            return (
              <article key={product.id} className={`temple-card goseva-product-card ${inCart ? 'is-in-cart' : ''}`}>
                <div className="goseva-product-media">
                  <img
                    src={product.image}
                    alt={isEn ? product.nameEn : product.nameTe}
                    loading="lazy"
                  />
                  <span className="goseva-product-tag">{product.category}</span>
                  {inCart && (
                    <span className="goseva-product-in-cart-pill" aria-label="Added to cart">
                      ✓ {cartItem.quantity} in cart
                    </span>
                  )}
                </div>

                <div className="goseva-product-body">
                  <h3 className="goseva-product-title">
                    {isEn ? product.nameEn : product.nameTe}
                  </h3>
                  <p className="goseva-product-desc">
                    {isEn ? product.shortDescEn : product.shortDescTe}
                  </p>

                  <div className="goseva-product-pricing-row">
                    <div className="goseva-product-price">
                      <strong>₹{product.price}</strong>
                      <span className="goseva-product-unit">/ {isEn ? product.unit : product.unitPlaceholder}</span>
                    </div>
                    <span className="goseva-free-delivery-badge">
                      {isEn ? 'Free Delivery' : 'ఉచిత డెలివరీ'}
                    </span>
                  </div>

                  <div className="goseva-product-footer-actions">
                    {inCart ? (
                      <div className="goseva-card-qty-wrapper">
                        <button
                          type="button"
                          className="goseva-card-qty-btn"
                          onClick={() => updateQuantity(product.id, -1)}
                          aria-label={isEn ? 'Decrease quantity' : 'తగ్గించు'}
                        >
                          −
                        </button>
                        <span className="goseva-card-qty-num" title="Current quantity">
                          {cartItem.quantity}
                        </span>
                        <button
                          type="button"
                          className="goseva-card-qty-btn"
                          onClick={() => updateQuantity(product.id, 1)}
                          aria-label={isEn ? 'Increase quantity' : 'పెంచు'}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="btn ghost goseva-add-cart-btn"
                        onClick={() => addToCart(product, 1)}
                      >
                        <span className="btn-icon" aria-hidden="true">+🛒</span>
                        <span>{isEn ? 'Add to Cart' : 'కార్ట్‌కు జోడించు'}</span>
                      </button>
                    )}

                    <button
                      type="button"
                      className="btn primary goseva-buy-now-btn"
                      onClick={() => buyNow(product)}
                    >
                      {isEn ? 'Buy Now' : 'కొనుగోలు చేయండి'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Floating Cart Button for Quick Access */}
      {totalCount > 0 && (
        <button
          type="button"
          className="goseva-floating-cart-pill"
          onClick={() => setIsCartOpen(true)}
          aria-label={isEn ? `Open cart with ${totalCount} items, total ₹${totalAmount}` : `కార్ట్ తెరవండి - ${totalCount} వస్తువులు, మొత్తం ₹${totalAmount}`}
        >
          <span className="floating-cart-icon" aria-hidden="true">🛒</span>
          <span className="floating-cart-badge">{totalCount}</span>
          <span className="floating-cart-divider" aria-hidden="true">•</span>
          <span className="floating-cart-total">₹{totalAmount}</span>
          <span className="floating-cart-chevron" aria-hidden="true">→</span>
        </button>
      )}

      {/* Toast Notification when item added */}
      {addedToast && (
        <aside className="goseva-cart-toast" role="status" aria-live="polite">
          <span className="toast-icon">✓</span>
          <span className="toast-text">
            {isEn ? `Added "${addedToast}" to cart` : `"${addedToast}" కార్ట్‌కు జోడించబడింది`}
          </span>
          <button
            type="button"
            className="toast-view-cart-link"
            onClick={() => setIsCartOpen(true)}
          >
            {isEn ? 'View Cart →' : 'కార్ట్ చూడండి →'}
          </button>
        </aside>
      )}

      {/* Cart & Checkout Modal */}
      <GoCartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        isEn={isEn}
      />
    </section>
  );
}
