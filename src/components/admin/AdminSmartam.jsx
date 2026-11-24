import React, { useState, useEffect } from 'react';
import { SMARTAM_FUNCTIONS } from '../../data/smartamData';
import { getSmartamFunctions, saveSmartamFunction, deleteSmartamFunction } from '../../utils/adminDataService';

export default function AdminSmartam() {
  const getInitialItems = () => {
    try {
      const local = localStorage.getItem('srivari_smartam');
      return local ? JSON.parse(local) : SMARTAM_FUNCTIONS;
    } catch (e) {
      return SMARTAM_FUNCTIONS;
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
      const data = await getSmartamFunctions();
      if (data && data.length > 0) {
        setItems(data);
        localStorage.setItem('srivari_smartam', JSON.stringify(data));
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
    localStorage.setItem('srivari_smartam', JSON.stringify(updated));

    try {
      await saveSmartamFunction(editingItem.id, editingItem);
    } catch (err) {
      console.warn('Firebase sync failed, stored locally');
    }

    setStatusMsg('Saved successfully!');
    setEditingItem(null);
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this function?')) return;
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    localStorage.setItem('srivari_smartam', JSON.stringify(updated));
    try {
      await deleteSmartamFunction(id);
    } catch (e) {}
  };

  const handleAddNew = () => {
    const newId = `smartam-${Date.now()}`;
    setEditingItem({
      no: items.length + 1,
      id: newId,
      name: '',
      teluguName: '',
      subtitle: '',
      subtitleTe: '',
      desc: '',
      descTe: '',
      deity: '',
      deityTe: '',
      duration: '',
      durationTe: '',
      location: '',
      locationTe: '',
      image: '',
      significance: '',
      significanceTe: ''
    });
  };

  if (loading) return <div>Loading Smartam Functions...</div>;

  return (
    <div className="admin-section-container">
      <div className="admin-actions-bar">
        <button className="admin-btn admin-btn-primary" onClick={handleAddNew}>
          + Add New Smartam Function
        </button>
        {statusMsg && <span className="admin-status-badge">{statusMsg}</span>}
      </div>

      {editingItem && (
        <form onSubmit={handleSave} className="admin-form-card">
          <h3>{items.some((i) => i.id === editingItem.id) ? 'Edit Function' : 'New Function'}</h3>

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
              <label>Subtitle (English):</label>
              <input
                type="text"
                value={editingItem.subtitle || ''}
                onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                className="admin-input"
              />
            </div>
            <div className="admin-form-group">
              <label>Subtitle (Telugu):</label>
              <input
                type="text"
                value={editingItem.subtitleTe || ''}
                onChange={(e) => setEditingItem({ ...editingItem, subtitleTe: e.target.value })}
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
              <label>Location (English):</label>
              <input
                type="text"
                value={editingItem.location || ''}
                onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
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
              <th>Subtitle</th>
              <th>Duration</th>
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
                <td>{item.subtitle}</td>
                <td>{item.duration || '-'}</td>
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

