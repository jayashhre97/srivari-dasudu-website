import React, { useState, useEffect } from 'react';
import { GO_PRODUCTS, GOSEVA_ACTIVITIES, GOSEVA_CONTACT_INFO, MONTHLY_GO_POOJA } from '../../data/gosevaData';
import { getGosevaProducts, saveGosevaProduct, deleteGosevaProduct, getGosevaActivities, saveGosevaActivity, deleteGosevaActivity } from '../../utils/adminDataService';

export default function AdminGoseva() {
  const [subTab, setSubTab] = useState('products');

  const getInitialProducts = () => {
    try {
      const local = localStorage.getItem('srivari_goseva_products');
      return local ? JSON.parse(local) : GO_PRODUCTS;
    } catch (e) {
      return GO_PRODUCTS;
    }
  };

  const getInitialActivities = () => {
    try {
      const local = localStorage.getItem('srivari_goseva_activities');
      return local ? JSON.parse(local) : GOSEVA_ACTIVITIES;
    } catch (e) {
      return GOSEVA_ACTIVITIES;
    }
  };

  const [products, setProducts] = useState(getInitialProducts);
  const [activities, setActivities] = useState(getInitialActivities);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingActivity, setEditingActivity] = useState(null);
  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const prodData = await getGosevaProducts();
      if (prodData && prodData.length > 0) {
        setProducts(prodData);
        localStorage.setItem('srivari_goseva_products', JSON.stringify(prodData));
      }

      const actData = await getGosevaActivities();
      if (actData && actData.length > 0) {
        setActivities(actData);
        localStorage.setItem('srivari_goseva_activities', JSON.stringify(actData));
      }
    } catch (e) {}
  };

  // Product save
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setStatusMsg('Saving product...');
    let updated;
    if (products.some((p) => p.id === editingProduct.id)) {
      updated = products.map((p) => (p.id === editingProduct.id ? editingProduct : p));
    } else {
      updated = [...products, editingProduct];
    }
    setProducts(updated);
    localStorage.setItem('srivari_goseva_products', JSON.stringify(updated));

    try {
      await saveGosevaProduct(editingProduct.id, editingProduct);
    } catch (err) {}

    setStatusMsg('Product saved!');
    setEditingProduct(null);
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem('srivari_goseva_products', JSON.stringify(updated));
    try {
      await deleteGosevaProduct(id);
    } catch (e) {}
  };

  // Activity save
  const handleSaveActivity = async (e) => {
    e.preventDefault();
    setStatusMsg('Saving activity...');
    let updated;
    if (activities.some((a) => a.id === editingActivity.id)) {
      updated = activities.map((a) => (a.id === editingActivity.id ? editingActivity : a));
    } else {
      updated = [...activities, editingActivity];
    }
    setActivities(updated);
    localStorage.setItem('srivari_goseva_activities', JSON.stringify(updated));

    try {
      await saveGosevaActivity(editingActivity.id, editingActivity);
    } catch (err) {}

    setStatusMsg('Activity saved!');
    setEditingActivity(null);
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleDeleteActivity = async (id) => {
    if (!window.confirm('Delete this activity?')) return;
    const updated = activities.filter((a) => a.id !== id);
    setActivities(updated);
    localStorage.setItem('srivari_goseva_activities', JSON.stringify(updated));
    try {
      await deleteGosevaActivity(id);
    } catch (e) {}
  };

  if (loading) return <div>Loading Gouseva Admin...</div>;

  return (
    <div className="admin-section-container">
      {statusMsg && <div className="admin-status-badge">{statusMsg}</div>}

      <div className="admin-tabs-bar" style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button
          className={`admin-btn ${subTab === 'products' ? 'admin-btn-primary' : 'admin-btn-outline'}`}
          onClick={() => { setSubTab('products'); setEditingProduct(null); setEditingActivity(null); }}
        >
          Go Products ({products.length})
        </button>
        <button
          className={`admin-btn ${subTab === 'activities' ? 'admin-btn-primary' : 'admin-btn-outline'}`}
          onClick={() => { setSubTab('activities'); setEditingProduct(null); setEditingActivity(null); }}
        >
          Gouseva Activities ({activities.length})
        </button>
      </div>

      {/* PRODUCTS TAB */}
      {subTab === 'products' && (
        <div>
          <div className="admin-actions-bar">
            <button
              className="admin-btn admin-btn-primary"
              onClick={() =>
                setEditingProduct({
                  id: `prod-${Date.now()}`,
                  nameEn: '',
                  nameTe: '',
                  shortDescEn: '',
                  shortDescTe: '',
                  price: 0,
                  priceDisplay: '₹0',
                  unit: '500 ml',
                  category: 'Sacred Dairy',
                  image: '',
                  featured: false
                })
              }
            >
              + Add New Product
            </button>
          </div>

          {editingProduct && (
            <form onSubmit={handleSaveProduct} className="admin-form-card">
              <h3>{products.some((p) => p.id === editingProduct.id) ? 'Edit Product' : 'New Product'}</h3>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Name (English):</label>
                  <input
                    type="text"
                    value={editingProduct.nameEn || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, nameEn: e.target.value })}
                    required
                    className="admin-input"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Name (Telugu):</label>
                  <input
                    type="text"
                    value={editingProduct.nameTe || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, nameTe: e.target.value })}
                    required
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Price (Number):</label>
                  <input
                    type="number"
                    value={editingProduct.price || 0}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setEditingProduct({ ...editingProduct, price: val, priceDisplay: `₹${val}` });
                    }}
                    className="admin-input"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Unit (e.g. 500 ml Jar / Pack of 24):</label>
                  <input
                    type="text"
                    value={editingProduct.unit || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, unit: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Image URL:</label>
                <input
                  type="text"
                  value={editingProduct.image || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="admin-input"
                />
              </div>

              <div className="admin-form-group">
                <label>Short Description (English):</label>
                <input
                  type="text"
                  value={editingProduct.shortDescEn || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, shortDescEn: e.target.value })}
                  className="admin-input"
                />
              </div>

              <div className="admin-form-group">
                <label>Short Description (Telugu):</label>
                <input
                  type="text"
                  value={editingProduct.shortDescTe || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, shortDescTe: e.target.value })}
                  className="admin-input"
                />
              </div>

              <div className="admin-form-btns">
                <button type="submit" className="admin-btn admin-btn-success">Save Product</button>
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setEditingProduct(null)}>Cancel</button>
              </div>
            </form>
          )}

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Unit</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <img
                        src={p.image}
                        alt={p.nameEn}
                        style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '4px' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </td>
                    <td>
                      <strong>{p.nameEn}</strong>
                      <div style={{ fontSize: '0.85em', color: '#666' }}>{p.nameTe}</div>
                    </td>
                    <td><strong>{p.priceDisplay || `₹${p.price}`}</strong></td>
                    <td>{p.unit}</td>
                    <td>
                      <button className="admin-btn admin-btn-sm" onClick={() => setEditingProduct(p)}>Edit</button>
                      <button className="admin-btn admin-btn-sm admin-btn-danger" style={{ marginLeft: '6px' }} onClick={() => handleDeleteProduct(p.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ACTIVITIES TAB */}
      {subTab === 'activities' && (
        <div>
          <div className="admin-actions-bar">
            <button
              className="admin-btn admin-btn-primary"
              onClick={() =>
                setEditingActivity({
                  id: `act-${Date.now()}`,
                  titleEn: '',
                  titleTe: '',
                  descEn: '',
                  descTe: '',
                  image: ''
                })
              }
            >
              + Add New Activity
            </button>
          </div>

          {editingActivity && (
            <form onSubmit={handleSaveActivity} className="admin-form-card">
              <h3>{activities.some((a) => a.id === editingActivity.id) ? 'Edit Activity' : 'New Activity'}</h3>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Title (English):</label>
                  <input
                    type="text"
                    value={editingActivity.titleEn || ''}
                    onChange={(e) => setEditingActivity({ ...editingActivity, titleEn: e.target.value })}
                    required
                    className="admin-input"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Title (Telugu):</label>
                  <input
                    type="text"
                    value={editingActivity.titleTe || ''}
                    onChange={(e) => setEditingActivity({ ...editingActivity, titleTe: e.target.value })}
                    required
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Image URL:</label>
                <input
                  type="text"
                  value={editingActivity.image || ''}
                  onChange={(e) => setEditingActivity({ ...editingActivity, image: e.target.value })}
                  className="admin-input"
                />
              </div>

              <div className="admin-form-group">
                <label>Description (English):</label>
                <textarea
                  rows="2"
                  value={editingActivity.descEn || ''}
                  onChange={(e) => setEditingActivity({ ...editingActivity, descEn: e.target.value })}
                  className="admin-input"
                />
              </div>

              <div className="admin-form-group">
                <label>Description (Telugu):</label>
                <textarea
                  rows="2"
                  value={editingActivity.descTe || ''}
                  onChange={(e) => setEditingActivity({ ...editingActivity, descTe: e.target.value })}
                  className="admin-input"
                />
              </div>

              <div className="admin-form-btns">
                <button type="submit" className="admin-btn admin-btn-success">Save Activity</button>
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setEditingActivity(null)}>Cancel</button>
              </div>
            </form>
          )}

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Activity Title</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <img
                        src={a.image}
                        alt={a.titleEn}
                        style={{ width: '50px', height: '35px', objectFit: 'cover', borderRadius: '4px' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </td>
                    <td>
                      <strong>{a.titleEn}</strong>
                      <div style={{ fontSize: '0.85em', color: '#666' }}>{a.titleTe}</div>
                    </td>
                    <td style={{ maxWidth: '350px' }}>{a.descEn}</td>
                    <td>
                      <button className="admin-btn admin-btn-sm" onClick={() => setEditingActivity(a)}>Edit</button>
                      <button className="admin-btn admin-btn-sm admin-btn-danger" style={{ marginLeft: '6px' }} onClick={() => handleDeleteActivity(a.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

