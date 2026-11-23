import React, { useState, useEffect } from 'react';
import { SMARTA_SEVA_HAVANALU } from '../../data/smartaSevaData';
import { getSmartaSevaHavanalu, saveSmartaSevaHavanam, deleteSmartaSevaHavanam } from '../../utils/adminDataService';

export default function AdminSmartaSeva() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getSmartaSevaHavanalu();
      if (data && data.length > 0) {
        setItems(data);
      } else {
        const local = localStorage.getItem('srivari_smarta_seva');
        setItems(local ? JSON.parse(local) : SMARTA_SEVA_HAVANALU);
      }
    } catch (e) {
      const local = localStorage.getItem('srivari_smarta_seva');
      setItems(local ? JSON.parse(local) : SMARTA_SEVA_HAVANALU);
    }
    setLoading(false);
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
    localStorage.setItem('srivari_smarta_seva', JSON.stringify(updated));

    try {
      await saveSmartaSevaHavanam(editingItem.id, editingItem);
    } catch (err) {
      console.warn('Firebase sync failed, stored locally');
    }

    setStatusMsg('Saved successfully!');
    setEditingItem(null);
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this Havanam?')) return;
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    localStorage.setItem('srivari_smarta_seva', JSON.stringify(updated));
    try {
      await deleteSmartaSevaHavanam(id);
    } catch (e) {}
  };

  const handleAddNew = () => {
    const newId = `havanam-${Date.now()}`;
    setEditingItem({
      no: items.length + 1,
      id: newId,
      nameEn: '',
      nameTe: '',
      scheduleEn: '',
      scheduleTe: '',
      cost: '₹1,116',
      limitedSeatsEn: 'Limited Seats Only',
      limitedSeatsTe: 'పరిమిత సీట్లు మాత్రమే',
      deityEn: '',
      deityTe: '',
      image: '',
      descEn: '',
      descTe: '',
      highlightsEn: [],
      highlightsTe: []
    });
  };

  if (loading) return <div>Loading Smarta Seva...</div>;

  return (
    <div className="admin-section-container">
      <div className="admin-actions-bar">
        <button className="admin-btn admin-btn-primary" onClick={handleAddNew}>
          + Add New Havanam
        </button>
        {statusMsg && <span className="admin-status-badge">{statusMsg}</span>}
      </div>

      {editingItem && (
        <form onSubmit={handleSave} className="admin-form-card">
          <h3>{items.some((i) => i.id === editingItem.id) ? 'Edit Havanam' : 'New Havanam'}</h3>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Name (English):</label>
              <input
                type="text"
                value={editingItem.nameEn || ''}
                onChange={(e) => setEditingItem({ ...editingItem, nameEn: e.target.value })}
                required
                className="admin-input"
              />
            </div>
            <div className="admin-form-group">
              <label>Name (Telugu):</label>
              <input
                type="text"
                value={editingItem.nameTe || ''}
                onChange={(e) => setEditingItem({ ...editingItem, nameTe: e.target.value })}
                required
                className="admin-input"
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Schedule (English):</label>
              <input
                type="text"
                value={editingItem.scheduleEn || ''}
                onChange={(e) => setEditingItem({ ...editingItem, scheduleEn: e.target.value })}
                placeholder="Every Month • Chitta Nakshatra"
                className="admin-input"
              />
            </div>
            <div className="admin-form-group">
              <label>Cost / Dakshina:</label>
              <input
                type="text"
                value={editingItem.cost || ''}
                onChange={(e) => setEditingItem({ ...editingItem, cost: e.target.value })}
                placeholder="₹1,116"
                className="admin-input"
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Deity (English):</label>
              <input
                type="text"
                value={editingItem.deityEn || ''}
                onChange={(e) => setEditingItem({ ...editingItem, deityEn: e.target.value })}
                className="admin-input"
              />
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
          </div>

          <div className="admin-form-group">
            <label>Description (English):</label>
            <textarea
              rows="3"
              value={editingItem.descEn || ''}
              onChange={(e) => setEditingItem({ ...editingItem, descEn: e.target.value })}
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
              <th>Schedule</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.image}
                    alt={item.nameEn}
                    style={{ width: '50px', height: '35px', objectFit: 'cover', borderRadius: '4px' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </td>
                <td>
                  <strong>{item.nameEn}</strong>
                  <div style={{ fontSize: '0.85em', color: '#666' }}>{item.nameTe}</div>
                </td>
                <td>{item.scheduleEn}</td>
                <td>{item.cost}</td>
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

