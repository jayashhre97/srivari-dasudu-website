import React, { useState, useEffect } from 'react';
import { KAMYAMU_HOMAMS } from '../../data/kamyamuData';
import { getKamyamuHomams, saveKamyamuHomam, deleteKamyamuHomam } from '../../utils/adminDataService';

export default function AdminKamyamu() {
  const getInitialItems = () => {
    try {
      const local = localStorage.getItem('srivari_kamyamu');
      return local ? JSON.parse(local) : KAMYAMU_HOMAMS;
    } catch (e) {
      return KAMYAMU_HOMAMS;
    }
  };

  const [items, setItems] = useState(getInitialItems);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getKamyamuHomams();
      if (data && data.length > 0) {
        setItems(data);
        localStorage.setItem('srivari_kamyamu', JSON.stringify(data));
      }
    } catch (e) {}
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setStatusMsg('Saving...');
    let updated;
    const exists = items.some((i) => i.id === editingItem.id);
    if (exists) {
      updated = items.map((i) => (i.id === editingItem.id ? editingItem : i));
    } else {
      updated = [...items, editingItem];
    }
    setItems(updated);
    localStorage.setItem('srivari_kamyamu', JSON.stringify(updated));

    try {
      await saveKamyamuHomam(editingItem.id, editingItem);
    } catch (err) {
      console.warn('Firebase error, stored locally');
    }

    setStatusMsg('Saved successfully!');
    setEditingItem(null);
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this Homam?')) return;
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    localStorage.setItem('srivari_kamyamu', JSON.stringify(updated));
    try {
      await deleteKamyamuHomam(id);
    } catch (e) {}
  };

  const handleAddNew = () => {
    const newId = `homam-${Date.now()}`;
    setEditingItem({
      no: items.length + 1,
      id: newId,
      name: '',
      teluguName: '',
      category: 'protection',
      desc: '',
      descTe: '',
      duration: '',
      durationTe: '',
      price: '',
      image: '',
      deity: '',
      deityTe: '',
      fruits: '',
      fruitsTe: ''
    });
  };

  if (loading) return <div>Loading Kamyamu Homams...</div>;

  return (
    <div className="admin-section-container">
      <div className="admin-actions-bar">
        <button className="admin-btn admin-btn-primary" onClick={handleAddNew}>
          + Add New Homam
        </button>
        {statusMsg && <span className="admin-status-badge">{statusMsg}</span>}
      </div>

      {editingItem && (
        <form onSubmit={handleSave} className="admin-form-card">
          <h3>{items.some((i) => i.id === editingItem.id) ? 'Edit Homam' : 'New Homam'}</h3>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Name (English):</label>
              <input
                type="text"
                value={editingItem.name || ''}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                required
                className="admin-input"
              />
            </div>
            <div className="admin-form-group">
              <label>Telugu Name:</label>
              <input
                type="text"
                value={editingItem.teluguName || ''}
                onChange={(e) => setEditingItem({ ...editingItem, teluguName: e.target.value })}
                required
                className="admin-input"
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Category:</label>
              <select
                value={editingItem.category || 'protection'}
                onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                className="admin-input"
              >
                <option value="protection">Protection</option>
                <option value="prosperity">Prosperity</option>
                <option value="health">Health</option>
                <option value="vaishnava">Vaishnava</option>
                <option value="shaiva">Shaiva</option>
                <option value="graha-shanti">Graha Shanti</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label>Price / Dakshina (e.g. 15,000 or On Request):</label>
              <input
                type="text"
                value={editingItem.price || ''}
                onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                className="admin-input"
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Duration (English):</label>
              <input
                type="text"
                value={editingItem.duration || ''}
                onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                className="admin-input"
              />
            </div>
            <div className="admin-form-group">
              <label>Duration (Telugu):</label>
              <input
                type="text"
                value={editingItem.durationTe || ''}
                onChange={(e) => setEditingItem({ ...editingItem, durationTe: e.target.value })}
                className="admin-input"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label>Image URL:</label>
            <input
              type="text"
              value={editingItem.image || ''}
              onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
              className="admin-input"
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Deity (English):</label>
              <input
                type="text"
                value={editingItem.deity || ''}
                onChange={(e) => setEditingItem({ ...editingItem, deity: e.target.value })}
                className="admin-input"
              />
            </div>
            <div className="admin-form-group">
              <label>Deity (Telugu):</label>
              <input
                type="text"
                value={editingItem.deityTe || ''}
                onChange={(e) => setEditingItem({ ...editingItem, deityTe: e.target.value })}
                className="admin-input"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label>Description (English):</label>
            <textarea
              rows="3"
              value={editingItem.desc || ''}
              onChange={(e) => setEditingItem({ ...editingItem, desc: e.target.value })}
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label>Description (Telugu):</label>
            <textarea
              rows="3"
              value={editingItem.descTe || ''}
              onChange={(e) => setEditingItem({ ...editingItem, descTe: e.target.value })}
              className="admin-input"
            />
          </div>

          <div className="admin-form-btns">
            <button type="submit" className="admin-btn admin-btn-success">Save</button>
            <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setEditingItem(null)}>Cancel</button>
          </div>
        </form>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '50px', height: '35px', objectFit: 'cover', borderRadius: '4px' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </td>
                <td>
                  <strong>{item.name}</strong>
                  <div style={{ fontSize: '0.85em', color: '#666' }}>{item.teluguName}</div>
                </td>
                <td><span className="admin-tag">{item.category}</span></td>
                <td>{item.duration || '-'}</td>
                <td>{item.price ? `₹${item.price}` : 'On Request'}</td>
                <td>
                  <button className="admin-btn admin-btn-sm" onClick={() => setEditingItem(item)}>Edit</button>
                  <button className="admin-btn admin-btn-sm admin-btn-danger" style={{ marginLeft: '6px' }} onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

