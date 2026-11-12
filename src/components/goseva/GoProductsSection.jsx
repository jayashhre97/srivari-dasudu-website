import React, { useState } from 'react';
import LotusDivider from '../LotusDivider';
import { GO_PRODUCTS } from '../../data/gosevaData';
import GoProductModal from './GoProductModal';

export default function GoProductsSection({ isEn }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

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
            {isEn ? 'Our Go Products' : 'మా గో ఉత్పత్తులు'}
          </h2>
          <LotusDivider />
          <p className="goseva-sec-sub">
            {isEn
              ? 'Explore traditional cow-based products and support our Go Seva activities through every purchase.'
              : 'సంప్రదాయ గో-ఆధారిత ఉత్పత్తులను వీక్షించండి మరియు ప్రతి కొనుగోలు ద్వారా మా గోసేవ కార్యక్రమాలకు సహకరించండి.'}
          </p>
        </div>

        <div className="goseva-products-grid">
          {GO_PRODUCTS.map((product) => (
            <article key={product.id} className="temple-card goseva-product-card">
              <div className="goseva-product-media">
                <img
                  src={product.image}
                  alt={isEn ? product.nameEn : product.nameTe}
                  loading="lazy"
                />
                <span className="goseva-product-tag">{product.category}</span>
              </div>

              <div className="goseva-product-body">
                <h3 className="goseva-product-title">
                  {isEn ? product.nameEn : product.nameTe}
                </h3>
                <p className="goseva-product-desc">
                  {isEn ? product.shortDescEn : product.shortDescTe}
                </p>

                <div className="goseva-product-footer">
                  <div className="goseva-product-price">
                    <strong>{product.pricePlaceholder}</strong>
                    <span>{product.unitPlaceholder}</span>
                  </div>
                  <button
                    type="button"
                    className="btn primary goseva-buy-btn"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {isEn ? 'Buy Now' : 'కొనుగోలు చేయండి'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <GoProductModal
        product={selectedProduct}
        isEn={isEn}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
