import React, { useState, useEffect } from 'react';
import { getRecentActivities, saveRecentActivity, deleteRecentActivity } from '../../utils/adminDataService';

const DEFAULT_ACTIVITIES = [
  {
    id: 'act-gouseva',
    type: 'gouseva',
    categoryEn: 'Gouseva',
    categoryTe: 'గోసేవ',
    image: '/images/goseva/activity-feeding.jpg',
    targetPage: 'goseva'
  },
  {
    id: 'act-kamyamu',
    type: 'kamyamu',
    categoryEn: 'Kamyamu',
    categoryTe: 'కామ్యము',
    image: '/images/cards/event-05-sudarshana.jpg',
    targetPage: 'kamyamu'
  },
  {
    id: 'act-smartam',
    type: 'smartam',
    categoryEn: 'Smartam',
    categoryTe: 'స్మార్తం',
    image: '/images/smartam/house-opening.jpg',
    targetPage: 'smartam'
  },
  {
    id: 'act-remedies',
    type: 'remedies',
    categoryEn: 'Remedies',
    categoryTe: 'పరిహారాలు',
    image: '/images/cards/remedy-1-health.jpg',
    targetPage: 'remedies'
  }
];

export default function AdminRecentActivities() {
  const getInitialItems = () => {
    try {
      const local = localStorage.getItem('srivari_recent_activities');
      return local ? JSON.parse(local) : DEFAULT_ACTIVITIES;
    } catch (e) {
      return DEFAULT_ACTIVITIES;
    }
  };

  const [items, setItems] = useState(getInitialItems);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [statusMsg, setStatusMsg] = useState('');

  const loadData = async () => {
    try {
      const data = await getRecentActivities();
      if (data && data.length > 0) {
        setItems(data);
        localStorage.setItem('srivari_recent_activities', JSON.stringify(data));
      }
    } catch (e) {}
  };
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setStatusMsg('Saving...');
    const updated = items.map((it) => (it.id === editingItem.id ? editingItem : it));
    if (!items.find((it) => it.id === editingItem.id)) {
      updated.push(editingItem);
    }
    setItems(updated);
    localStorage.setItem('srivari_recent_activities', JSON.stringify(updated));

    try {
      await saveRecentActivity(editingItem.id, editingItem);
    } catch (err) {
      console.warn('Firebase sync failed, saved locally');
    }

    setStatusMsg('Saved successfully!');
    setEditingItem(null);
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this activity?')) return;
    const updated = items.filter((it) => it.id !== id);
    setItems(updated);
    localStorage.setItem('srivari_recent_activities', JSON.stringify(updated));
    try {
      await deleteRecentActivity(id);
    } catch (e) {}
  };

  const handleAddNew = () => {
    const newId = `act-${Date.now()}`;
    setEditingItem({
      id: newId,
      type: 'custom',
      categoryEn: '',
      categoryTe: '',
      image: '',
      targetPage: 'home'
    });
  };

  if (loading) return <div>Loading Recent Activities...</div>;

  return (
    <div className="admin-section-container">
      <div className="admin-actions-bar">
        <button className="admin-btn admin-btn-primary" onClick={handleAddNew}>
          + Add New Activity
        </button>
        {statusMsg && <span className="admin-status-badge">{statusMsg}</span>}
      </div>

      {editingItem && (
        <form onSubmit={handleSave} className="admin-form-card">
          <h3>{items.find((i) => i.id === editingItem.id) ? 'Edit Activity' : 'New Activity'}</h3>

          <div className="admin-form-group">
            <label>Category Name (English):</label>
            <input
              type="text"
              value={editingItem.categoryEn || ''}
              onChange={(e) => setEditingItem({ ...editingItem, categoryEn: e.target.value })}
              required
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label>Category Name (Telugu):</label>
            <input
              type="text"
              value={editingItem.categoryTe || ''}
              onChange={(e) => setEditingItem({ ...editingItem, categoryTe: e.target.value })}
              required
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label>Image URL / Path:</label>
            <input
              type="text"
              value={editingItem.image || ''}
              onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
              required
              placeholder="/images/cards/..."
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label>Target Page Link (e.g. goseva, kamyamu, smartam, remedies):</label>
            <input
              type="text"
              value={editingItem.targetPage || ''}
              onChange={(e) => setEditingItem({ ...editingItem, targetPage: e.target.value })}
              required
              className="admin-input"
            />
          </div>

          <div className="admin-form-btns">
            <button type="submit" className="admin-btn admin-btn-success">
              Save
            </button>
            <button
              type="button"
              className="admin-btn admin-btn-secondary"
              onClick={() => setEditingItem(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>English Name</th>
              <th>Telugu Name</th>
              <th>Target Page</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((act) => (
              <tr key={act.id}>
                <td>
                  <img
                    src={act.image}
                    alt={act.categoryEn}
                    style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </td>
                <td><strong>{act.categoryEn}</strong></td>
                <td>{act.categoryTe}</td>
                <td><code>{act.targetPage}</code></td>
                <td>
                  <button
                    className="admin-btn admin-btn-sm"
                    onClick={() => setEditingItem(act)}
                  >
                    Edit
                  </button>
                  <button
                    className="admin-btn admin-btn-sm admin-btn-danger"
                    onClick={() => handleDelete(act.id)}
                    style={{ marginLeft: '8px' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

