import React, { useState, useEffect } from 'react';
import { GOSEVA_CONTACT_INFO } from '../../data/gosevaData';
import { validateDevoteeFields, buildGosevaWhatsAppUrl, useEscapeKey } from './gosevaHelpers';

export default function GoProductModal({ product, isEn, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  useEscapeKey(Boolean(product), onClose);

  useEffect(() => {
    setQuantity(1);
    setErrors({});
    setOrderSubmitted(false);
  }, [product?.id]);

  if (!product) return null;

  const productName = isEn ? product.nameEn : product.nameTe;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validateDevoteeFields(form, {
      isEn,
      requireEmail: false,
      requireAddress: true
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setOrderSubmitted(true);
  };

  const waUrl = buildGosevaWhatsAppUrl([
    '*Go Product Order / Checkout Inquiry — Srivari Dasudu*',
    `Product: ${product.nameEn}`,
    `Quantity: ${quantity}`,
    `Price Status: ${product.pricePlaceholder} (${product.unitPlaceholder})`,
    `Customer: ${form.name.trim()}`,
    `Mobile: ${form.phone.trim()}`,
    form.email.trim() ? `Email: ${form.email.trim()}` : '',
    `Delivery Address: ${form.address.trim()}`
  ]);

  return (
    <div
      className="goseva-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={onClose}
    >
      <div className="goseva-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="goseva-modal-close"
          onClick={onClose}
          aria-label="Close product checkout"
        >
          ✕
        </button>

        <div className="goseva-modal-grid">
          <div className="goseva-modal-product-col">
            <img
              src={product.image}
              alt={productName}
              className="goseva-modal-img"
            />
            <span className="goseva-product-category">{product.category}</span>
            <h3 id="product-modal-title" className="goseva-modal-title">
              {productName}
            </h3>
            <p className="goseva-modal-desc">
              {isEn ? product.detailDescEn : product.detailDescTe}
            </p>
            <div className="goseva-modal-price-box">
              <strong>{product.pricePlaceholder}</strong>
              <span>{product.unitPlaceholder}</span>
            </div>
          </div>

          <div className="goseva-modal-checkout-col">
            <h4 className="goseva-checkout-title">
              {isEn ? 'Product Details & Order Checkout' : 'ఉత్పత్తి ఆర్డర్ & చెక్అవుట్'}
            </h4>

            {!orderSubmitted ? (
              <form onSubmit={handleSubmit} noValidate className="goseva-form-stack">
                <div className="goseva-qty-row">
                  <label htmlFor="product-qty" className="form-field-label">
                    {isEn ? 'Quantity:' : 'పరిమాణం:'}
                  </label>
                  <div className="goseva-qty-controls">
                    <button
                      type="button"
                      className="goseva-qty-btn"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      id="product-qty"
                      type="number"
                      min="1"
                      max="25"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(25, Number(e.target.value) || 1)))}
                      className="goseva-qty-input"
                    />
                    <button
                      type="button"
                      className="goseva-qty-btn"
                      onClick={() => setQuantity((q) => Math.min(25, q + 1))}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="order-name" className="form-field-label">
                    {isEn ? 'Full Name *' : 'పూర్తి పేరు *'}
                  </label>
                  <input
                    id="order-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={isEn ? 'Enter recipient name' : 'మీ పేరు'}
                    className="form-input"
                    required
                  />
                  {errors.name && <p className="goseva-field-error">{errors.name}</p>}
                </div>

                <div className="form-grid-two">
                  <div>
                    <label htmlFor="order-phone" className="form-field-label">
                      {isEn ? 'Mobile Number *' : 'మొబైల్ నంబర్ *'}
                    </label>
                    <input
                      id="order-phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="form-input"
                      required
                    />
                    {errors.phone && <p className="goseva-field-error">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="order-email" className="form-field-label">
                      {isEn ? 'Email (Optional)' : 'ఈమెయిల్ (ఐచ్ఛికం)'}
                    </label>
                    <input
                      id="order-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="form-input"
                    />
                    {errors.email && <p className="goseva-field-error">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="order-address" className="form-field-label">
                    {isEn ? 'Delivery Address *' : 'డెలివరీ చిరునామా *'}
                  </label>
                  <textarea
                    id="order-address"
                    name="address"
                    rows="2"
                    value={form.address}
                    onChange={handleChange}
                    placeholder={isEn ? 'House no, street, city & PIN code' : 'ఇంటి నంబర్, వీధి, నగరం & పిన్ కోడ్'}
                    className="form-input"
                    required
                  />
                  {errors.address && <p className="goseva-field-error">{errors.address}</p>}
                </div>

                <div className="goseva-gateway-placeholder goseva-gateway-placeholder--light">
                  <span className="goseva-gateway-pill">
                    {isEn ? 'Checkout Placeholder' : 'చెక్అవుట్ ప్లేస్‌హోల్డర్'}
                  </span>
                  <p>
                    {isEn
                      ? `${GOSEVA_CONTACT_INFO.paymentGatewayPlaceholderEn}. Order price uses configurable placeholder until catalog pricing is set.`
                      : GOSEVA_CONTACT_INFO.paymentGatewayPlaceholderTe}
                  </p>
                </div>

                <button type="submit" className="btn primary form-submit-btn">
                  {isEn ? `Proceed to Checkout (${quantity}x)` : `ఆర్డర్ నిర్ధారించండి (${quantity}x)`}
                </button>
              </form>
            ) : (
              <div className="form-success-box">
                <div className="success-icon" aria-hidden="true">✓</div>
                <h4 className="success-heading">
                  {isEn ? 'Order Request Ready' : 'ఆర్డర్ అభ్యర్థన సిద్ధంగా ఉంది'}
                </h4>
                <p className="success-para">
                  {isEn
                    ? `Order request for ${quantity} × ${product.nameEn} prepared for ${form.name}. Confirm availability & configured pricing via WhatsApp.`
                    : `${form.name} గారికి ${quantity} × ${product.nameTe} ఆర్డర్ సిద్ధంగా ఉంది.`}
                </p>
                <div className="success-actions">
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn primary">
                    {isEn ? 'Complete Order on WhatsApp →' : 'వాట్సాప్‌లో ఆర్డర్ చేయండి →'}
                  </a>
                  <button
                    type="button"
                    className="btn ghost"
                    onClick={() => setOrderSubmitted(false)}
                  >
                    {isEn ? 'Back to Details' : 'వెనుకకు'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
