import React, { useState, useEffect } from 'react';
import { VEDIC_DATA, VEDIC_CURRICULUM_STEPS, GURUKUL_PILLARS, DAILY_ROUTINE } from '../../data/vedicData';
import { getVedicData, saveVedicItem } from '../../utils/adminDataService';

export default function AdminVedicSchool() {
  const getInitialVedas = () => {
    try {
      const local = localStorage.getItem('srivari_vedic_data');
      return local ? JSON.parse(local) : VEDIC_DATA;
    } catch (e) {
      return VEDIC_DATA;
    }
  };

  const [vedas, setVedas] = useState(getInitialVedas);
  const [loading, setLoading] = useState(false);
  const [editingVeda, setEditingVeda] = useState(null);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getVedicData();
      if (data && data.length > 0) {
        setVedas(data);
        localStorage.setItem('srivari_vedic_data', JSON.stringify(data));
      }
    } catch (e) {}
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setStatusMsg('Saving Veda details...');
    const updated = vedas.map((v) => (v.id === editingVeda.id ? editingVeda : v));
    setVedas(updated);
    localStorage.setItem('srivari_vedic_data', JSON.stringify(updated));

    try {
      await saveVedicItem(editingVeda.id, editingVeda);
    } catch (err) {}

    setStatusMsg('Saved successfully!');
    setEditingVeda(null);
    setTimeout(() => setStatusMsg(''), 3000);
  };

  if (loading) return <div>Loading Vedic School Data...</div>;

  return (
    <div className="admin-section-container">
      {statusMsg && <div className="admin-status-badge">{statusMsg}</div>}

      <div style={{ marginBottom: '16px' }}>
        <h2>Vedic Scriptures Curriculum</h2>
        <p style={{ color: '#666' }}>Update details, deities, age requirements, and descriptions for Rigveda, Yajurveda, Samaveda, and Atharvaveda.</p>
      </div>

      {editingVeda && (
        <form onSubmit={handleSave} className="admin-form-card">
          <h3>Edit {editingVeda.name} ({editingVeda.teluguName})</h3>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Name (English):</label>
              <input
                type="text"
                value={editingVeda.name || ''}
                onChange={(e) => setEditingVeda({ ...editingVeda, name: e.target.value })}
                required
                className="admin-input"
              />
            </div>
            <div className="admin-form-group">
              <label>Telugu Name:</label>
              <input
                type="text"
                value={editingVeda.teluguName || ''}
                onChange={(e) => setEditingVeda({ ...editingVeda, teluguName: e.target.value })}
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
                value={editingVeda.subtitle || ''}
                onChange={(e) => setEditingVeda({ ...editingVeda, subtitle: e.target.value })}
                className="admin-input"
              />
            </div>
            <div className="admin-form-group">
              <label>Subtitle (Telugu):</label>
              <input
                type="text"
                value={editingVeda.subtitleTe || ''}
                onChange={(e) => setEditingVeda({ ...editingVeda, subtitleTe: e.target.value })}
                className="admin-input"
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Age Group (e.g. 7 – 14 Years):</label>
              <input
                type="text"
                value={editingVeda.ageGroup || ''}
                onChange={(e) => setEditingVeda({ ...editingVeda, ageGroup: e.target.value })}
                className="admin-input"
              />
            </div>
            <div className="admin-form-group">
              <label>Duration (e.g. 6 – 8 Years):</label>
              <input
                type="text"
                value={editingVeda.duration || ''}
                onChange={(e) => setEditingVeda({ ...editingVeda, duration: e.target.value })}
                className="admin-input"
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Deity (English):</label>
              <input
                type="text"
                value={editingVeda.deity || ''}
                onChange={(e) => setEditingVeda({ ...editingVeda, deity: e.target.value })}
                className="admin-input"
              />
            </div>
            <div className="admin-form-group">
              <label>Image URL:</label>
              <input
                type="text"
                value={editingVeda.image || ''}
                onChange={(e) => setEditingVeda({ ...editingVeda, image: e.target.value })}
                className="admin-input"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label>Description (English):</label>
            <textarea
              rows="3"
              value={editingVeda.desc || ''}
              onChange={(e) => setEditingVeda({ ...editingVeda, desc: e.target.value })}
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label>Description (Telugu):</label>
            <textarea
              rows="3"
              value={editingVeda.descTe || ''}
              onChange={(e) => setEditingVeda({ ...editingVeda, descTe: e.target.value })}
              className="admin-input"
            />
          </div>

          <div className="admin-form-btns">
            <button type="submit" className="admin-btn admin-btn-success">Save</button>
            <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setEditingVeda(null)}>Cancel</button>
          </div>
        </form>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Veda Name</th>
              <th>Age Group</th>
              <th>Duration</th>
              <th>Deity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vedas.map((v) => (
              <tr key={v.id}>
                <td>
                  <img
                    src={v.image}
                    alt={v.name}
                    style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '4px' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </td>
                <td>
                  <strong>{v.name}</strong>
                  <div style={{ fontSize: '0.85em', color: '#666' }}>{v.teluguName}</div>
                </td>
                <td>{v.ageGroup}</td>
                <td>{v.duration}</td>
                <td>{v.deity}</td>
                <td>
                  <button className="admin-btn admin-btn-sm" onClick={() => setEditingVeda(v)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

