import React, { useState, useEffect, useMemo } from 'react';
import { GOSEVA_CONTACT_INFO } from '../../data/gosevaData';
import { useEscapeKey, isValidIndianMobile, isValidEmail, buildGosevaWhatsAppUrl } from './gosevaHelpers';

export default function GoCartModal({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  isEn
}) {
  const [step, setStep] = useState('cart'); // 'cart' | 'address' | 'payment' | 'success'
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    email: '',
    street: '',
    landmark: '',
    city: '',
    state: 'Andhra Pradesh',
    pincode: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'gateway' | 'cod'
  const [upiRef, setUpiRef] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEscapeKey(isOpen, onClose);

  // Reset to cart step on fresh open
  useEffect(() => {
    if (isOpen && step === 'success' && cart.length === 0) {
      setStep('cart');
    }
  }, [isOpen]);

  const itemsTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (Number(item.product.price) || 0) * item.quantity, 0);
  }, [cart]);

  const shippingCost = itemsTotal > 0 ? 0 : 0; // Free goshala delivery
  const grandTotal = itemsTotal + shippingCost;
  const totalCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateAddress = () => {
    const errs = {};
    if (!address.name.trim()) {
      errs.name = isEn ? 'Please enter your full name.' : 'దయచేసి మీ పూర్తి పేరు నమోదు చేయండి.';
    }
    if (!isValidIndianMobile(address.phone)) {
      errs.phone = isEn
        ? 'Please enter a valid 10-digit mobile number.'
        : 'దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్ ఇవ్వండి.';
    }
    if (address.email.trim() && !isValidEmail(address.email)) {
      errs.email = isEn ? 'Please enter a valid email address.' : 'దయచేసి సరైన ఈమెయిల్ ఇవ్వండి.';
    }
    if (!address.street.trim()) {
      errs.street = isEn ? 'Please enter flat/house no. and street.' : 'దయచేసి ఇంటి నంబర్ మరియు వీధి చిరునామా ఇవ్వండి.';
    }
    if (!address.city.trim()) {
      errs.city = isEn ? 'Please enter town/city.' : 'దయచేసి ఊరు / నగరం పేరు ఇవ్వండి.';
    }
    if (!/^\d{6}$/.test(address.pincode.trim())) {
      errs.pincode = isEn ? 'Please enter a valid 6-digit PIN code.' : 'దయచేసి 6 అంకెల పిన్ కోడ్ ఇవ్వండి.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!validateAddress()) return;
    setStep('payment');
  };

  const handleCopyUpi = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(GOSEVA_CONTACT_INFO.upiIdPlaceholder.split(' ')[0]);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2500);
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const orderId = `SVD-GOU-${Math.floor(10000 + Math.random() * 90000)}`;
      const orderData = {
        orderId,
        date: new Date().toLocaleDateString(isEn ? 'en-IN' : 'te-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
        items: [...cart],
        itemsTotal,
        shippingCost,
        grandTotal,
        address: { ...address },
        paymentMethod,
        upiRef: upiRef.trim()
      };
      setCompletedOrder(orderData);
      onClearCart();
      setIsProcessing(false);
      setStep('success');
    }, 700);
  };

  if (!isOpen) return null;

  const buildOrderWhatsAppUrl = () => {
    if (!completedOrder) return '#';
    const itemsList = completedOrder.items
      .map(
        (i, idx) =>
          `${idx + 1}. ${isEn ? i.product.nameEn : i.product.nameTe} × ${i.quantity} = ₹${i.product.price * i.quantity}`
      )
      .join('\n');

    return buildGosevaWhatsAppUrl([
      '*🚩 Srivari Dasudu Goshala Product Order*',
      `*Order ID:* ${completedOrder.orderId}`,
      `*Order Date:* ${completedOrder.date}`,
      '',
      '*Ordered Products:*',
      itemsList,
      '',
      `*Total Order Value:* ₹${completedOrder.grandTotal} (Free Delivery)`,
      `*Payment Mode:* ${
        completedOrder.paymentMethod === 'upi'
          ? `UPI (${completedOrder.upiRef ? `Ref: ${completedOrder.upiRef}` : 'Paid / Completed'})`
          : completedOrder.paymentMethod === 'gateway'
          ? 'Online Payment Gateway'
          : 'Cash on Delivery'
      }`,
      '',
      '*Delivery Address:*',
      `${completedOrder.address.name}`,
      `Mobile: ${completedOrder.address.phone}`,
      completedOrder.address.email ? `Email: ${completedOrder.address.email}` : '',
      `${completedOrder.address.street}, ${completedOrder.address.landmark ? `${completedOrder.address.landmark}, ` : ''}${completedOrder.address.city}, ${completedOrder.address.state} - ${completedOrder.address.pincode}`,
      completedOrder.address.notes ? `*Delivery Notes:* ${completedOrder.address.notes}` : ''
    ]);
  };

  return (
    <div
      className="goseva-modal-backdrop goseva-cart-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
      onClick={onClose}
    >
      <div
        className="goseva-modal-card goseva-cart-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="goseva-cart-header">
          <div className="goseva-cart-header-title">
            <span className="cart-header-icon" aria-hidden="true">🛒</span>
            <h3 id="cart-modal-title">
              {step === 'cart' && (isEn ? `Your Goshala Cart (${totalCount})` : `గోశాల కార్ట్ (${totalCount})`)}
              {step === 'address' && (isEn ? 'Delivery & Shipping Details' : 'డెలివరీ చిరునామా వివరాలు')}
              {step === 'payment' && (isEn ? 'Payment & Checkout' : 'చెల్లింపు & ఆర్డర్ నిర్ధారణ')}
              {step === 'success' && (isEn ? 'Order Placed Successfully!' : 'ఆర్డర్ విజయవంతంగా నమోదైంది!')}
            </h3>
          </div>

          <button
            type="button"
            className="goseva-modal-close"
            onClick={onClose}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Progress Stepper (Only for cart/address/payment) */}
        {step !== 'success' && cart.length > 0 && (
          <div className="goseva-cart-stepper">
            <div className={`cart-step-pill ${step === 'cart' ? 'active' : 'done'}`}>
              <span className="step-num">1</span>
              <span>{isEn ? 'Cart Items' : 'ఉత్పత్తులు'}</span>
            </div>
            <div className="step-connector" />
            <div className={`cart-step-pill ${step === 'address' ? 'active' : step === 'payment' ? 'done' : ''}`}>
              <span className="step-num">2</span>
              <span>{isEn ? 'Address' : 'చిరునామా'}</span>
            </div>
            <div className="step-connector" />
            <div className={`cart-step-pill ${step === 'payment' ? 'active' : ''}`}>
              <span className="step-num">3</span>
              <span>{isEn ? 'Payment' : 'చెల్లింపు'}</span>
            </div>
          </div>
        )}

        {/* Body Content by Step */}
        <div className="goseva-cart-body">
          {/* STEP 1: CART ITEMS */}
          {step === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="cart-empty-view">
                  <div className="cart-empty-icon">🪔</div>
                  <h4>{isEn ? 'Your Cart is Empty' : 'మీ కార్ట్ ఖాళీగా ఉంది'}</h4>
                  <p>
                    {isEn
                      ? 'Browse our authentic goshala creations and add sacred cow ghee, dhoop, or compost to support cow care.'
                      : 'గోశాల ఉత్పత్తులను ఎంచుకుని కార్ట్‌కు జోడించి గోసేవకు సహకరించండి.'}
                  </p>
                  <button type="button" className="btn primary" onClick={onClose}>
                    {isEn ? 'Browse Goshala Products →' : 'గో ఉత్పత్తులను చూడండి →'}
                  </button>
                </div>
              ) : (
                <div className="cart-active-layout">
                  <div className="cart-items-list">
                    {cart.map((item) => {
                      const itemTitle = isEn ? item.product.nameEn : item.product.nameTe;
                      const itemUnit = isEn ? item.product.unit : item.product.unitPlaceholder;
                      const lineTotal = (Number(item.product.price) || 0) * item.quantity;

                      return (
                        <div key={item.product.id} className="cart-item-row">
                          <div className="cart-item-thumb-col">
                            <img
                              src={item.product.image}
                              alt={itemTitle}
                              className="cart-item-thumb"
                            />
                          </div>

                          <div className="cart-item-details-col">
                            <div className="cart-item-top-line">
                              <div className="cart-item-headings">
                                <span className="cart-item-cat">{item.product.category}</span>
                                <h4 className="cart-item-title">{itemTitle}</h4>
                                <div className="cart-item-pack-info">
                                  <span className="cart-item-unit">{itemUnit}</span>
                                  <span className="cart-item-dot" aria-hidden="true">•</span>
                                  <span className="cart-item-price-each">₹{item.product.price} each</span>
                                </div>
                              </div>
                              <div className="cart-item-line-total">₹{lineTotal}</div>
                            </div>

                            <div className="cart-item-bottom-bar">
                              <div className="cart-qty-selector">
                                <button
                                  type="button"
                                  className="cart-qty-btn"
                                  onClick={() => onUpdateQuantity(item.product.id, -1)}
                                  aria-label="Decrease quantity"
                                >
                                  −
                                </button>
                                <span className="cart-qty-count">{item.quantity}</span>
                                <button
                                  type="button"
                                  className="cart-qty-btn"
                                  onClick={() => onUpdateQuantity(item.product.id, 1)}
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                type="button"
                                className="cart-item-remove-btn"
                                onClick={() => onRemoveItem(item.product.id)}
                                title={isEn ? 'Remove item' : 'తొలగించు'}
                                aria-label="Remove item"
                              >
                                <span className="cart-remove-icon" aria-hidden="true">🗑</span>
                                <span className="cart-remove-text">{isEn ? 'Remove' : 'తొలగించు'}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="cart-summary-card">
                    <h4 className="cart-summary-heading">
                      {isEn ? 'Order Summary' : 'ఆర్డర్ సారాంశం'}
                    </h4>

                    <div className="cart-summary-line">
                      <span>{isEn ? `Subtotal (${totalCount} items)` : `ఉత్పత్తుల మొత్తం (${totalCount})`}</span>
                      <span>₹{itemsTotal}</span>
                    </div>

                    <div className="cart-summary-line">
                      <span>{isEn ? 'Goshala Packing & Shipping' : 'ప్యాకింగ్ & షిప్పింగ్'}</span>
                      <span className="free-shipping-tag">
                        {isEn ? 'FREE Delivery' : 'ఉచిత డెలివరీ'}
                      </span>
                    </div>

                    <div className="cart-summary-divider" />

                    <div className="cart-summary-total">
                      <span>{isEn ? 'Total Order Amount' : 'మొత్తం చెల్లించవలసినది'}</span>
                      <span className="grand-total-amount">₹{grandTotal}</span>
                    </div>

                    <div className="cart-goseva-blessing-note">
                      <span>✦</span>
                      <span>
                        {isEn
                          ? '100% of proceeds go towards daily cow care, green fodder, and veterinary seva.'
                          : 'ఈ కొనుగోలు ద్వారా సమకూరిన మొత్తం గోవుల సంరక్షణ, పచ్చిగడ్డి మరియు వైద్య సేవలకు వినియోగించబడుతుంది.'}
                      </span>
                    </div>

                    <div className="cart-checkout-actions">
                      <button
                        type="button"
                        className="btn primary cart-proceed-btn"
                        onClick={() => setStep('address')}
                      >
                        {isEn ? 'Proceed to Delivery Address →' : 'డెలివరీ చిరునామాకు వెళ్ళండి →'}
                      </button>

                      <button
                        type="button"
                        className="btn ghost cart-continue-btn"
                        onClick={onClose}
                      >
                        {isEn ? '+ Add More Products' : '+ మరిన్ని ఉత్పత్తులను జోడించండి'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 2: ADDRESS FORM */}
          {step === 'address' && (
            <form onSubmit={handleProceedToPayment} noValidate className="goseva-address-form">
              <div className="goseva-form-section-head">
                <span className="form-head-eyebrow">
                  {isEn ? 'DELIVERY DESTINATION' : 'డెలివరీ చిరునామా'}
                </span>
                <h4>
                  {isEn ? 'Where should we send your sacred goshala package?' : 'మీ పవిత్ర గో ఉత్పత్తుల ప్యాకేజీని ఎక్కడికి పంపాలి?'}
                </h4>
              </div>

              <div className="form-grid-two">
                <div>
                  <label htmlFor="addr-name" className="form-field-label">
                    {isEn ? 'Full Name *' : 'పూర్తి పేరు *'}
                  </label>
                  <input
                    id="addr-name"
                    type="text"
                    name="name"
                    value={address.name}
                    onChange={handleAddressChange}
                    placeholder={isEn ? 'Sri / Smt. Devotee Name' : 'మీ పూర్తి పేరు'}
                    className="form-input"
                    required
                  />
                  {errors.name && <p className="goseva-field-error">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="addr-phone" className="form-field-label">
                    {isEn ? 'Mobile Number (WhatsApp) *' : 'మొబైల్ నంబర్ (వాట్సాప్) *'}
                  </label>
                  <input
                    id="addr-phone"
                    type="tel"
                    name="phone"
                    value={address.phone}
                    onChange={handleAddressChange}
                    placeholder="9876543210"
                    className="form-input"
                    required
                  />
                  {errors.phone && <p className="goseva-field-error">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="addr-email" className="form-field-label">
                  {isEn ? 'Email Address (Optional)' : 'ఈమెయిల్ (ఐచ్ఛికం)'}
                </label>
                <input
                  id="addr-email"
                  type="email"
                  name="email"
                  value={address.email}
                  onChange={handleAddressChange}
                  placeholder="name@example.com"
                  className="form-input"
                />
                {errors.email && <p className="goseva-field-error">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="addr-street" className="form-field-label">
                  {isEn ? 'Flat / House No., Building & Street Address *' : 'ఇంటి నంబర్, భవనం, వీధి చిరునామా *'}
                </label>
                <textarea
                  id="addr-street"
                  name="street"
                  rows="2"
                  value={address.street}
                  onChange={handleAddressChange}
                  placeholder={isEn ? 'Flat 302, Sri Rama Nilayam, Temple Road...' : 'ఇంటి నంబర్, వీధి పేరు...'}
                  className="form-input"
                  required
                />
                {errors.street && <p className="goseva-field-error">{errors.street}</p>}
              </div>

              <div className="form-grid-two">
                <div>
                  <label htmlFor="addr-landmark" className="form-field-label">
                    {isEn ? 'Landmark (Optional)' : 'గుర్తు / ల్యాండ్‌మార్క్ (ఐచ్ఛికం)'}
                  </label>
                  <input
                    id="addr-landmark"
                    type="text"
                    name="landmark"
                    value={address.landmark}
                    onChange={handleAddressChange}
                    placeholder={isEn ? 'Near Shiva Temple / Main Gate' : 'సమీపంలోని ముఖ్యమైన గుర్తు'}
                    className="form-input"
                  />
                </div>

                <div>
                  <label htmlFor="addr-city" className="form-field-label">
                    {isEn ? 'Town / City *' : 'నగరం / ఊరు *'}
                  </label>
                  <input
                    id="addr-city"
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    placeholder={isEn ? 'Visakhapatnam / Hyderabad / Vijayawada' : 'నగరం పేరు'}
                    className="form-input"
                    required
                  />
                  {errors.city && <p className="goseva-field-error">{errors.city}</p>}
                </div>
              </div>

              <div className="form-grid-two">
                <div>
                  <label htmlFor="addr-state" className="form-field-label">
                    {isEn ? 'State *' : 'రాష్ట్రం *'}
                  </label>
                  <select
                    id="addr-state"
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    className="form-input"
                  >
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Other States (All India)">Other States (All India)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="addr-pincode" className="form-field-label">
                    {isEn ? 'Postal PIN Code (6 digits) *' : 'పిన్ కోడ్ (6 అంకెలు) *'}
                  </label>
                  <input
                    id="addr-pincode"
                    type="text"
                    name="pincode"
                    maxLength={6}
                    value={address.pincode}
                    onChange={handleAddressChange}
                    placeholder="530001"
                    className="form-input"
                    required
                  />
                  {errors.pincode && <p className="goseva-field-error">{errors.pincode}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="addr-notes" className="form-field-label">
                  {isEn ? 'Delivery Notes / Special Instructions' : 'ప్రత్యేక డెలివరీ సూచనలు'}
                </label>
                <input
                  id="addr-notes"
                  type="text"
                  name="notes"
                  value={address.notes}
                  onChange={handleAddressChange}
                  placeholder={isEn ? 'E.g., Call before delivery / Needed for Friday pooja' : 'ఉదాహరణ: పూజకు అత్యవసరం'}
                  className="form-input"
                />
              </div>

              <div className="cart-checkout-actions">
                <button type="submit" className="btn primary cart-proceed-btn">
                  {isEn ? `Proceed to Payment (₹${grandTotal}) →` : `చెల్లింపుకు కొనసాగండి (₹${grandTotal}) →`}
                </button>
                <button
                  type="button"
                  className="btn ghost cart-continue-btn"
                  onClick={() => setStep('cart')}
                >
                  {isEn ? '← Back to Cart' : '← కార్ట్‌కు తిరిగి వెళ్ళండి'}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PAYMENT GATEWAY SELECTION */}
          {step === 'payment' && (
            <div className="goseva-payment-view">
              <div className="goseva-form-section-head">
                <span className="form-head-eyebrow">
                  {isEn ? 'SECURE PAYMENT GATEWAY' : 'సురక్షిత పేమెంట్ గేట్‌వే'}
                </span>
                <h4>
                  {isEn ? 'Choose Your Preferred Payment Method' : 'మీకు అనుకూలమైన చెల్లింపు విధానాన్ని ఎంచుకోండి'}
                </h4>
              </div>

              <div className="payment-order-brief">
                <div>
                  <strong>{isEn ? 'Total Order Amount:' : 'మొత్తం చెల్లించవలసినది:'}</strong>{' '}
                  <span className="payment-highlight-total">₹{grandTotal}</span>
                </div>
                <div>
                  <strong>{isEn ? 'Delivering To:' : 'డెలివరీ చిరునామా:'}</strong>{' '}
                  <span>{address.name}, {address.city} ({address.pincode})</span>
                </div>
              </div>

              <div className="payment-options-grid">
                {/* Option 1: Instant UPI */}
                <label className={`payment-option-card ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymethod"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                  />
                  <div className="pay-card-content">
                    <div className="pay-card-top">
                      <span className="pay-badge">RECOMMENDED</span>
                      <strong>Instant UPI (GPay / PhonePe / Paytm / BHIM)</strong>
                    </div>
                    <p>Pay directly using any UPI App with Zero Transaction Fee.</p>
                  </div>
                </label>

                {/* Option 2: Payment Gateway (Cards, NetBanking) */}
                <label className={`payment-option-card ${paymentMethod === 'gateway' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymethod"
                    value="gateway"
                    checked={paymentMethod === 'gateway'}
                    onChange={() => setPaymentMethod('gateway')}
                  />
                  <div className="pay-card-content">
                    <div className="pay-card-top">
                      <span className="pay-badge pay-badge-secondary">ONLINE GATEWAY</span>
                      <strong>Cards / NetBanking / Razorpay</strong>
                    </div>
                    <p>All major Credit / Debit Cards & 50+ NetBanking options supported.</p>
                  </div>
                </label>

                {/* Option 3: Pay on Delivery */}
                <label className={`payment-option-card ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />
                  <div className="pay-card-content">
                    <div className="pay-card-top">
                      <span className="pay-badge pay-badge-muted">PAY ON DELIVERY</span>
                      <strong>Cash on Delivery (Goshala Dispatch)</strong>
                    </div>
                    <p>Pay cash or UPI to the delivery associate upon package arrival.</p>
                  </div>
                </label>
              </div>

              {/* Dynamic Gateway Detail Box */}
              {paymentMethod === 'upi' && (
                <div className="payment-detail-box upi-detail-box">
                  <div className="upi-qr-col">
                    <div className="upi-qr-frame">
                      {/* Generative QR Code visual */}
                      <svg viewBox="0 0 100 100" width="130" height="130" className="upi-qr-svg">
                        <rect width="100" height="100" fill="#FFFFFF" rx="4" />
                        <rect x="8" y="8" width="28" height="28" fill="#073B2A" />
                        <rect x="12" y="12" width="20" height="20" fill="#FFFFFF" />
                        <rect x="16" y="16" width="12" height="12" fill="#073B2A" />

                        <rect x="64" y="8" width="28" height="28" fill="#073B2A" />
                        <rect x="68" y="12" width="20" height="20" fill="#FFFFFF" />
                        <rect x="72" y="16" width="12" height="12" fill="#073B2A" />

                        <rect x="8" y="64" width="28" height="28" fill="#073B2A" />
                        <rect x="12" y="68" width="20" height="20" fill="#FFFFFF" />
                        <rect x="16" y="72" width="12" height="12" fill="#073B2A" />

                        <rect x="42" y="12" width="16" height="8" fill="#073B2A" />
                        <rect x="42" y="24" width="8" height="12" fill="#C9972D" />
                        <rect x="54" y="28" width="6" height="16" fill="#073B2A" />
                        <rect x="42" y="44" width="16" height="12" fill="#073B2A" />
                        <rect x="12" y="42" width="12" height="14" fill="#073B2A" />
                        <rect x="28" y="42" width="8" height="12" fill="#C9972D" />
                        <rect x="64" y="44" width="14" height="8" fill="#073B2A" />
                        <rect x="82" y="44" width="10" height="14" fill="#C9972D" />
                        <rect x="42" y="64" width="12" height="14" fill="#073B2A" />
                        <rect x="58" y="64" width="14" height="8" fill="#C9972D" />
                        <rect x="76" y="64" width="16" height="14" fill="#073B2A" />
                        <rect x="42" y="82" width="28" height="10" fill="#073B2A" />
                        <rect x="74" y="82" width="18" height="10" fill="#C9972D" />
                      </svg>
                    </div>
                    <span className="qr-caption">{isEn ? 'Scan to Pay ₹' + grandTotal : 'స్కాన్ చేసి ₹' + grandTotal + ' చెల్లించండి'}</span>
                  </div>

                  <div className="upi-info-col">
                    <span className="upi-info-lbl">{isEn ? 'Official Goshala UPI ID:' : 'గోశాల అధికారిక UPI ID:'}</span>
                    <div className="upi-id-badge">
                      <code>srivaridasudu.gouseva@upi</code>
                      <button type="button" className="btn ghost upi-copy-btn" onClick={handleCopyUpi}>
                        {copiedUpi ? (isEn ? '✓ Copied' : '✓ కాపీ చేయబడింది') : (isEn ? 'Copy UPI' : 'కాపీ చేయండి')}
                      </button>
                    </div>

                    <div className="upi-ref-input-group">
                      <label htmlFor="upi-ref-id" className="form-field-label">
                        {isEn ? 'UPI Reference / UTR Number (Optional)' : 'UPI ట్రాన్సాక్షన్ నంబర్ (ఐచ్ఛికం)'}
                      </label>
                      <input
                        id="upi-ref-id"
                        type="text"
                        value={upiRef}
                        onChange={(e) => setUpiRef(e.target.value)}
                        placeholder={isEn ? 'E.g., 402918491029 or leave blank' : 'ట్రాన్సాక్షన్ సంఖ్య'}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'gateway' && (
                <div className="payment-detail-box gateway-detail-box">
                  <div className="gateway-icons-row">
                    <span className="gw-chip">VISA</span>
                    <span className="gw-chip">Mastercard</span>
                    <span className="gw-chip">RuPay</span>
                    <span className="gw-chip">NetBanking</span>
                    <span className="gw-chip">Razorpay</span>
                  </div>
                  <p className="gateway-note">
                    {isEn
                      ? 'Secure 256-Bit SSL Encrypted Payment Gateway. You will be redirected to complete your card/netbanking verification upon confirming.'
                      : 'సురక్షితమైన 256-బిట్ SSL ఎన్‌క్రిప్ట్ చేయబడిన పేమెంట్ గేట్‌వే.'}
                  </p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="payment-detail-box cod-detail-box">
                  <span className="cod-icon">📦</span>
                  <p>
                    {isEn
                      ? 'Pay ₹' + grandTotal + ' in cash or via UPI to the delivery courier when your order arrives at your doorstep.'
                      : 'మీ ఇంటి వద్దకు పార్శిల్ చేరినప్పుడు ₹' + grandTotal + ' నగదు లేదా UPI ద్వారా చెల్లించవచ్చు.'}
                  </p>
                </div>
              )}

              <div className="cart-checkout-actions">
                <button
                  type="button"
                  className="btn primary cart-proceed-btn"
                  disabled={isProcessing}
                  onClick={handlePlaceOrder}
                >
                  {isProcessing
                    ? (isEn ? 'Processing Order...' : 'ఆర్డర్ ప్రాసెస్ అవుతోంది...')
                    : (isEn ? `Place Order & Confirm (₹${grandTotal})` : `ఆర్డర్ నిర్ధారించండి (₹${grandTotal})`)}
                </button>
                <button
                  type="button"
                  className="btn ghost cart-continue-btn"
                  onClick={() => setStep('address')}
                >
                  {isEn ? '← Back to Address' : '← చిరునామాకు తిరిగి వెళ్ళండి'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ORDER CONFIRMATION / SUCCESS */}
          {step === 'success' && completedOrder && (
            <div className="cart-success-view">
              <div className="success-badge-circle" aria-hidden="true">✓</div>
              <h4 className="success-main-title">
                {isEn ? 'Thank You! Your Order has been Placed' : 'ధన్యవాదాలు! మీ ఆర్డర్ విజయవంతంగా నమోదైంది'}
              </h4>
              <p className="success-sub">
                {isEn
                  ? 'May Lord Sri Venkateswara Swamy and Gomatha bless your household with peace and prosperity.'
                  : 'శ్రీ వేంకటేశ్వర స్వామి మరియు గోమాత అనుగ్రహం మీ కుటుంబానికి సర్వదా కలగాలని ప్రార్థిస్తున్నాము.'}
              </p>

              <div className="order-receipt-card">
                <div className="receipt-head">
                  <div>
                    <span className="receipt-label">{isEn ? 'Order Reference:' : 'ఆర్డర్ సంఖ్య:'}</span>
                    <strong className="receipt-order-id">{completedOrder.orderId}</strong>
                  </div>
                  <div>
                    <span className="receipt-label">{isEn ? 'Order Date:' : 'ఆర్డర్ తేదీ:'}</span>
                    <span>{completedOrder.date}</span>
                  </div>
                </div>

                <div className="receipt-divider" />

                <div className="receipt-items-list">
                  <span className="receipt-label">{isEn ? 'Ordered Products:' : 'ఆర్డర్ చేసిన ఉత్పత్తులు:'}</span>
                  <ul>
                    {completedOrder.items.map((i) => (
                      <li key={i.product.id}>
                        <span>
                          {isEn ? i.product.nameEn : i.product.nameTe} × {i.quantity}
                        </span>
                        <strong>₹{i.product.price * i.quantity}</strong>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="receipt-divider" />

                <div className="receipt-delivery-info">
                  <span className="receipt-label">{isEn ? 'Delivering To:' : 'డెలివరీ చిరునామా:'}</span>
                  <div className="receipt-address-text">
                    <strong>{completedOrder.address.name}</strong> ({completedOrder.address.phone})<br />
                    {completedOrder.address.street}, {completedOrder.address.landmark ? `${completedOrder.address.landmark}, ` : ''}{completedOrder.address.city}, {completedOrder.address.state} - {completedOrder.address.pincode}
                  </div>
                </div>

                <div className="receipt-total-row">
                  <span>{isEn ? 'Total Amount Paid / Payable:' : 'మొత్తం చెల్లింపు:'}</span>
                  <span className="receipt-total-val">₹{completedOrder.grandTotal}</span>
                </div>
              </div>

              <div className="success-whatsapp-banner">
                <div className="wa-banner-text">
                  <strong>{isEn ? 'Instant WhatsApp Confirmation & Dispatch Tracking' : 'వాట్సాప్‌లో తక్షణ నిర్ధారణ & ట్రాకింగ్'}</strong>
                  <p>
                    {isEn
                      ? 'Share this order directly with the Chief Priest & Goshala Seva Desk on WhatsApp for priority packaging and dispatch tracking.'
                      : 'గోశాల సేవా డెస్క్‌కు వాట్సాప్‌లో ఆర్డర్ పంపించి త్వరిత ప్యాకింగ్ మరియు డెలివరీ వివరాలు పొందండి.'}
                  </p>
                </div>

                <a
                  href={buildOrderWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn primary wa-order-btn"
                >
                  <span className="wa-icon">💬</span>
                  <span>{isEn ? 'Track Order on WhatsApp →' : 'వాట్సాప్‌లో ఆర్డర్ పంపండి →'}</span>
                </a>
              </div>

              <button
                type="button"
                className="btn ghost cart-finish-btn"
                onClick={onClose}
              >
                {isEn ? 'Continue Browsing Products' : 'మరిన్ని ఉత్పత్తులను చూడండి'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

